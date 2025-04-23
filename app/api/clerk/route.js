// import User from "../../models/User";
// import connectDB from "../../config/db";

// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import { Webhook } from "svix";

// export async function POST(req) {
//   const wh = new Webhook(process.env.SIGNING_SECRET);
//   const headerPayload = await headers();
//   const svixHeaders = {
//     "svix-id": headerPayload.get("svix-id"),
//     "svix-timestamp": headerPayload.get("svix-timestamp"),
//     "svix-signature": headerPayload.get("svix-signature"),
//   };

//   // Get the payload and verify
//   const payload = await req.json();
//   const body = JSON.stringify(payload);
//   const { data, type } = wh.verify(body, svixHeaders);

//   // Prepare user data to save in db
//   const userData = {
//     _id: data.id,
//     email: data.email_addresses[0].email_address,
//     name: data`${data.first_name} ${data.last_name}`,
//     image: data.image_url,
//   };

//   await connectDB();

//   switch (type) {
//     case "user.created":
//       await User.create(userData);
//       break;

//     case "user.updated":
//       await User.findByIdAndUpdate(data.id, userData);
//       break;

//     case "user.deleted":
//       await User.findByIdAndDelete(data.id);
//       break;

//     default:
//       break;
//   }

//   return NextResponse.json({ message: "Event received" });
// }

import User from "../../models/User";
import connectDB from "../../config/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req) {
  // Ensure the signing secret is available
  const signingSecret = process.env.SIGNING_SECRET;
  if (!signingSecret) {
    console.error("SIGNING_SECRET is not defined");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Initialize webhook
  const wh = new Webhook(signingSecret);

  try {
    // Get headers synchronously
    const headerPayload = headers();
    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    };

    // Validate headers
    if (
      !svixHeaders["svix-id"] ||
      !svixHeaders["svix-timestamp"] ||
      !svixHeaders["svix-signature"]
    ) {
      console.error("Missing Svix headers");
      return NextResponse.json(
        { error: "Invalid webhook headers" },
        { status: 400 }
      );
    }

    // Get and verify payload
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let data, type;
    try {
      ({ data, type } = wh.verify(body, svixHeaders));
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    // Validate payload data
    if (!data.id || !data.email_addresses?.[0]?.email_address) {
      console.error("Invalid payload data:", data);
      return NextResponse.json(
        { error: "Invalid payload data" },
        { status: 400 }
      );
    }

    // Prepare user data
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || null,
    };

    // Connect to database
    try {
      await connectDB();
    } catch (err) {
      console.error("Database connection failed:", err.message);
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    // Handle webhook event
    switch (type) {
      case "user.created":
        try {
          await User.create(userData);
          console.log(`User created: ${userData._id}`);
        } catch (err) {
          console.error("Failed to create user:", err.message);
          return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
          );
        }
        break;

      case "user.updated":
        try {
          const updatedUser = await User.findByIdAndUpdate(data.id, userData, {
            new: true,
          });
          if (!updatedUser) {
            console.warn(`User not found for update: ${data.id}`);
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }
          console.log(`User updated: ${data.id}`);
        } catch (err) {
          console.error("Failed to update user:", err.message);
          return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
          );
        }
        break;

      case "user.deleted":
        try {
          const deletedUser = await User.findByIdAndDelete(data.id);
          if (!deletedUser) {
            console.warn(`User not found for deletion: ${data.id}`);
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }
          console.log(`User deleted: ${data.id}`);
        } catch (err) {
          console.error("Failed to delete user:", err.message);
          return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
          );
        }
        break;

      default:
        console.warn(`Unhandled event type: ${type}`);
        return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Event processed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
