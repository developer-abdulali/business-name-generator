"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
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

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col gap-6 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <p className="text-2xl font-bold">
              Job<span className="text-customRedColor">Portal</span>
            </p>
          </Link>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-6 w-full md:w-96"
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
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
                  {...register("email")}
                  error={errors.email}
                  className="pl-10"
                />
                <Mail
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                  {...register("password")}
                  error={errors.password}
                  className="pl-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <Lock
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Role Selection - Applicant or Recruiter */}
            <div className="grid gap-2">
              <RadioGroup
                value={role}
                onValueChange={(value) => setValue("role", value)}
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
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="outline"
              type="submit"
              className="w-full py-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Signup Link */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline text-primary">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/authimg.png"
          alt="Login Image"
          width={200}
          height={200}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
};

export default Login;
