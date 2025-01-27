// "use client";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "@/lib/constant";
// import { setUser } from "@/redux/slices/authSlice";

// const UpdateProfileModal = ({ modalOpen, setModalOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const [input, setInput] = useState({
//     fullname: user?.fullname,
//     email: user?.email,
//     number: user?.phoneNumber,
//     bio: user?.profile?.bio,
//     skills: user?.profile?.skills?.map((skill) => skill),
//     file: user?.profile?.resume,
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.file?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.number);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     if (input.file) formData.append("file", input.file);

//     try {
//       const res = await axios.put(
//         `${USER_API_ENDPOINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }

//     setModalOpen(false);
//     console.log(input);
//   };

//   return (
//     <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//       <DialogContent
//         className="sm:max-w-[425px]"
//         onInteractOutside={() => setModalOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           {/* Add form fields here */}
//           <p className="text-gray-600">Update your profile information.</p>

//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right font-semibold">
//                 Name
//               </Label>
//               <Input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={input.fullname}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right font-semibold">
//                 Email
//               </Label>
//               <Input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="number" className="text-right font-semibold">
//                 Number
//               </Label>
//               <Input
//                 id="number"
//                 name="number"
//                 value={input.number}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right font-semibold">
//                 Bio
//               </Label>
//               <Input
//                 id="bio"
//                 name="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills" className="text-right font-semibold">
//                 Skills
//               </Label>
//               <Input
//                 id="skills"
//                 name="skills"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right font-semibold">
//                 File
//               </Label>
//               <Input
//                 type="file"
//                 id="file"
//                 name="file"
//                 onChange={fileChangeHandler}
//                 accept="application/pdf"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//         </form>
//         <DialogFooter>
//           <Button variant="secondary" onClick={() => setModalOpen(false)}>
//             Close
//           </Button>
//           <Button>Save Changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileModal;

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setUser } from "@/redux/slices/authSlice";

const UpdateProfileModal = ({ modalOpen, setModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    number: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]; // Fixed `file` to `files`
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.number);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setModalOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <p className="text-gray-600">Update your profile information.</p>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right font-semibold">
                Name
              </Label>
              <Input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right font-semibold">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right font-semibold">
                Number
              </Label>
              <Input
                id="number"
                name="number"
                value={input.number}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right font-semibold">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right font-semibold">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="Comma-separated skills"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right font-semibold">
                Resume
              </Label>
              <Input
                type="file"
                id="file"
                name="file"
                onChange={fileChangeHandler}
                accept="application/pdf"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              disabled={loading}
            >
              Close
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
