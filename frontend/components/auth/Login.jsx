"use client";

import { setLoading, setUser } from "@/redux/slices/authSlice";
import { USER_API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../shared/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      // API call
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        router.push("/");
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
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-3 sm:mx-5 xl:mx-0 flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 px-8 py-10">
          <div className="flex flex-col items-center mb-8">
            <div className="text-2xl font-bold">
              Job<span className="text-customRedColor">Portal</span>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
            Sign in to your account
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                value={input.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={input.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-indigo-600">
                Forgot password?
              </a>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    checked={input.role === "applicant"}
                    onChange={handleChange}
                    className="text-indigo-600 border-gray-300 rounded"
                  />
                  <span>Applicant</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={handleChange}
                    className="text-indigo-600 border-gray-300 rounded"
                  />
                  <span>Recruiter</span>
                </label>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="w-full px-3 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800"
              >
                Sign in
              </button>
            )}
            <div className="text-center">
              <span className="text-sm text-gray-700">
                {`Don't have an account?`}{" "}
              </span>
              <Link href="/signup" className="text-sm text-indigo-600">
                Sign up
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:flex md:w-1/2">
          <img
            src="/authimg.png"
            alt="Desk setup"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
