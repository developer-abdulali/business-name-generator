"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "applicant",
    file: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("profileImage", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        router.push("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      console.error("API error:", error.response?.data?.error || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 gap-6">
      {/* Left Section */}
      <div className="flex flex-col gap-6 p-6 md:p-10 justify-center">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start mb-6">
          <Link href="/">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Job<span className="text-customRedColor">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <form onSubmit={submitHandler} className="flex flex-col gap-6 w-full">
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <p className="text-2xl font-bold text-primary">
                Create an account
              </p>
              <p className="text-sm text-muted-foreground">
                Enter your details to create an account
              </p>
            </div>

            {/* Full Name Field */}
            <div className="grid space-y-2 w-full">
              <Label htmlFor="fullname">Full Name</Label>
              <div className="relative">
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="John Doe"
                  value={input.fullname}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
                <User
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="grid space-y-2 w-full">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="xyz@example.com"
                  value={input.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
                <Mail
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="grid space-y-2 w-full">
              <Label htmlFor="phoneNumber">Contact Number</Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="03xx-xxxxxxx"
                  value={input.phoneNumber}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
                <Phone
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
              </div>
            </div>

            {/* Password Field with Toggle Visibility */}
            <div className="grid space-y-2 w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={input.password}
                  onChange={handleChange}
                  className="input-field pr-10 pl-10"
                />
                <Lock
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="grid gap-2 w-full">
              <RadioGroup
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value }))
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applicant" id="applicant" />
                  <Label htmlFor="applicant">Applicant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Image Upload */}
            <div className="grid space-y-2 w-full">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="relative flex items-center space-x-2">
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="input-field"
                />
                {input.file && (
                  <Image
                    src={URL.createObjectURL(input.file)}
                    alt="Profile Preview"
                    width={30}
                    height={30}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              variant="outline"
              type="submit"
              className="w-full py-3 text-sm"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="relative hidden lg:block bg-muted">
        <Image
          src="/authimg.png"
          alt="Signup Image"
          width={200}
          height={200}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Signup;
