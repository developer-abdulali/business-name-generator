"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { USER_API_ENDPOINT } from "@/lib/constant";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "applicant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        router.push("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.error("API Error:", error.response?.data?.error || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
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
            onSubmit={submitHandler}
            className="flex flex-col gap-6 w-full md:w-96"
          >
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Form Inputs */}
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="xyz@example.com"
                value={input.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative my-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-customRedColor focus:outline-none p-3 rounded-md border w-full"
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

            {/* Role Selection - Applicant or Recruiter */}
            <div className="grid gap-2">
              <RadioGroup
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value }))
                }
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="applicant" id="applicant" />
                  <Label htmlFor="applicant">Applicant</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full py-3" disabled={loading}>
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
        <img
          src="/authimg.png"
          alt="Login Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
