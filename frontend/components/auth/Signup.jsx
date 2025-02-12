"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setLoading } from "@/redux/slices/authSlice";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

// Define the validation schema using yup
const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .length(11, "Phone number must be exactly 11 digits")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  role: yup.string().required("Role is required"),
  file: yup.mixed().notRequired(),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const role = watch("role");

  const changeFileHandler = (e) => {
    setValue("file", e.target.files?.[0]);
  };

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.file) formData.append("profileImage", data.file);

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

  useEffect(() => {
    document.title = "MERN Job Portal - Sign Up";
  }, []);

  return (
    <section className="grid min-h-screen lg:grid-cols-2 gap-6 p-6 md:p-10 bg-white dark:bg-gray-900">
      {/* Left Section */}
      <div className="flex flex-col gap-6 justify-center">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:mb-24 md:ml-10 md:justify-start">
          <Link href="/">
            <p className="text-3xl font-bold text-center md:text-left text-gray-900 dark:text-gray-100">
              Job
              <span className="text-purple-600 dark:text-purple-400">
                Portal
              </span>
            </p>
          </Link>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-6 w-full"
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold text-primary dark:text-gray-100">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Enter your details to create an account
              </p>
            </div>

            {/* Full Name Field */}
            <div className="grid space-y-2 w-full">
              <Label
                htmlFor="fullname"
                className="text-gray-900 dark:text-gray-100"
              >
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="John Doe"
                  {...register("fullname")}
                  error={errors.fullname}
                  className="input-field pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <User
                  className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                  size={18}
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="grid space-y-2 w-full">
              <Label
                htmlFor="email"
                className="text-gray-900 dark:text-gray-100"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="xyz@example.com"
                  {...register("email")}
                  error={errors.email}
                  className="input-field pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Mail
                  className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                  size={18}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="grid space-y-2 w-full">
              <Label
                htmlFor="phoneNumber"
                className="text-gray-900 dark:text-gray-100"
              >
                Contact Number
              </Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="0333-xxxxxxx"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber}
                  className="input-field pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Phone
                  className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                  size={18}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password Field with Toggle Visibility */}
            <div className="grid space-y-2 w-full">
              <Label
                htmlFor="password"
                className="text-gray-900 dark:text-gray-100"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  {...register("password")}
                  error={errors.password}
                  className="input-field pr-10 pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Lock
                  className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                  size={18}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="grid gap-2 w-full">
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="applicant"
                    value="applicant"
                    checked={role === "applicant"}
                    onChange={(e) => setValue("role", e.target.value)}
                    className="custom-radio appearance-none w-5 h-5 border-2 border-purple-600 dark:border-purple-400 rounded-full flex items-center justify-center cursor-pointer relative"
                  />
                  <label
                    htmlFor="applicant"
                    className="ml-2 text-gray-900 dark:text-gray-100"
                  >
                    Applicant
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="recruiter"
                    value="recruiter"
                    checked={role === "recruiter"}
                    onChange={(e) => setValue("role", e.target.value)}
                    className="custom-radio appearance-none w-5 h-5 border-2 border-purple-600 dark:border-purple-400 rounded-full flex items-center justify-center cursor-pointer relative"
                  />
                  <label
                    htmlFor="recruiter"
                    className="ml-2 text-gray-900 dark:text-gray-100"
                  >
                    Recruiter
                  </label>
                </div>
              </div>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Profile Image Upload */}
            <div className="grid space-y-2 w-full">
              <Label
                htmlFor="profileImage"
                className="text-gray-900 dark:text-gray-100"
              >
                Profile Image
              </Label>
              <div className="relative flex items-center space-x-2">
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="input-field bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                {watch("file") && (
                  <Image
                    src={URL.createObjectURL(watch("file"))}
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
              className="w-full py-3 text-sm bg-purple-600 dark:bg-purple-700 text-white hover:text-white hover:bg-purple-700 dark:hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-900 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline text-primary hover:text-purple-600 dark:hover:text-purple-400"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="relative hidden lg:block bg-muted">
        <Image
          src="/login.svg"
          alt="Signup Image"
          width={200}
          height={200}
          priority
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale scale-x-[-1]"
        />
      </div>
    </section>
  );
};

export default Signup;
