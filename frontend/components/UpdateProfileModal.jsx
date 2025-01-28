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
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     number: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.join(", ") || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setInput({ ...input, file: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.number);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     if (input.file) formData.append("file", input.file);

//     try {
//       const response = await axios.post(
//         `${USER_API_ENDPOINT}/profile/update`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         dispatch(setUser(response.data.user));
//         toast.success(response.data.message);
//         setModalOpen(false);
//       } else {
//         toast.error(response.data.error);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//       <DialogContent onInteractOutside={() => setModalOpen(false)}>
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             {/* Fullname */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="fullname">Full Name</Label>
//               <Input
//                 id="fullname"
//                 name="fullname"
//                 value={input.fullname}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             {/* Email */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={input.email}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             {/* Phone */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="number">Phone Number</Label>
//               <Input
//                 id="number"
//                 name="number"
//                 value={input.number}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             {/* Bio */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio">Bio</Label>
//               <Input
//                 id="bio"
//                 name="bio"
//                 value={input.bio}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             {/* Skills */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skills">Skills</Label>
//               <Input
//                 id="skills"
//                 name="skills"
//                 value={input.skills}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 placeholder="Comma-separated skills"
//               />
//             </div>
//             {/* Resume */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file">Resume</Label>
//               <Input
//                 id="file"
//                 name="file"
//                 type="file"
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => setModalOpen(false)}
//               disabled={loading}
//             >
//               Close
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </form>
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
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    number: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profileImage: null,
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    user?.profile?.profileImage || ""
  );
  const [resumePreview, setResumePreview] = useState(
    user?.profile?.resumeOriginalName || ""
  );

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "profileImage") {
      setInput({ ...input, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    } else if (type === "resume") {
      setInput({ ...input, resume: file });
      setResumePreview(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.number);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.profileImage) formData.append("profileImage", input.profileImage);
    if (input.resume) formData.append("resume", input.resume);

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          timeout: 60000, // Increase timeout to 60 seconds
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setModalOpen(false);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent onInteractOutside={() => setModalOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Fullname */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                name="number"
                value={input.number}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Comma-separated skills"
              />
            </div>
            {/* Profile Image */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profileImage")}
                className="col-span-3"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>
            {/* Resume */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume">Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "resume")}
                className="col-span-3"
              />
              {resumePreview && (
                <span className="mt-2 text-gray-700">{resumePreview}</span>
              )}
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
