"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

// Define the validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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

  const submitHandler = async (data) => {
    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);

        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    document.title = "MERN Job Portal - Login";
  }, []);

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col gap-6 p-6 md:p-10 lg:px-20 bg-white dark:bg-gray-900">
        {/* Logo */}
        <div className="flex justify-center gap-2 mb-6 md:justify-start">
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
        <div className="flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-6 w-full max-w-md"
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold text-primary dark:text-gray-100">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Enter your email below to login to your account
              </p>
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
                  className="pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                  className="pl-10 pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <Lock
                  className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                  size={18}
                />
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
                    className="ml-2 cursor-pointer text-gray-900 dark:text-gray-100"
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
                    className="ml-2 cursor-pointer text-gray-900 dark:text-gray-100"
                  >
                    Recruiter
                  </label>
                </div>
              </div>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="outline"
              type="submit"
              className="w-full py-3 bg-purple-600 dark:bg-purple-700 text-white hover:text-white hover:bg-purple-700 dark:hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-900 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="underline text-primary hover:text-purple-600 dark:hover:text-purple-400"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.svg"
          alt="Login Image"
          width={200}
          height={200}
          priority
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale scale-x-[-1]"
        />
      </div>
    </section>
  );
};

export default Login;
