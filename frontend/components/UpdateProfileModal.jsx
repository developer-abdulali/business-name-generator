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
import Image from "next/image";
import { Trash } from "lucide-react";

const UpdateProfileModal = ({ modalOpen, setModalOpen, isDarkMode }) => {
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
    removeProfileImage: false, // Flag to indicate image removal
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
      setInput({ ...input, profileImage: file, removeProfileImage: false });
      setImagePreview(URL.createObjectURL(file));
    } else if (type === "resume") {
      setInput({ ...input, resume: file });
      setResumePreview(file.name);
    }
  };

  const handleDeleteImagePreview = () => {
    setImagePreview("");
    setInput({ ...input, profileImage: null, removeProfileImage: true });
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
    formData.append("removeProfileImage", input.removeProfileImage); // Send the flag

    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          timeout: 60000,
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
      <DialogContent
        onInteractOutside={() => setModalOpen(false)}
        className={isDarkMode ? "dark-mode" : "light-mode"}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-200">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fullname */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="fullname"
                className="text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="number"
                className="text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </Label>
              <Input
                id="number"
                name="number"
                value={input.number}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            {/* Bio */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            {/* Skills */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="skills"
                className="text-gray-700 dark:text-gray-300"
              >
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleInputChange}
                placeholder="Comma-separated skills"
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            {/* Profile Image */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="profileImage"
                className="text-gray-700 dark:text-gray-300"
              >
                Profile Image
              </Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "profileImage")}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              {imagePreview && (
                <div className="relative mt-2 w-24 h-24">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={handleDeleteImagePreview}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {/* Resume */}
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="resume"
                className="text-gray-700 dark:text-gray-300"
              >
                Resume
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, "resume")}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              {resumePreview && (
                <span className="mt-2 text-gray-700 dark:text-gray-300">
                  {resumePreview}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="bg-purple-600 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setModalOpen(false)}
                disabled={loading}
              >
                Close
              </Button>
              <Button
                variant="outline"
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
