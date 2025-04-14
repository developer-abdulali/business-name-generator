import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import AuthInput from "../../components/input/AuthInput";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Signup submit handler
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!username) {
      setError("Please enter password.");
      return;
    }
    if (!password) {
      setError("Please enter password.");
      return;
    }

    // Signup api
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details blow.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput
              type="text"
              label="Full Name"
              placeholder="John"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />

            {/* Email */}
            <AuthInput
              type="text"
              label="Email Address"
              placeholder="john@example.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            {/* Username */}
            <AuthInput
              type="text"
              label="Username"
              placeholder="@"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />

            {/* Password */}
            <AuthInput
              type="password"
              label="Password"
              placeholder="Min 8 characters"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          {/* Error msg */}
          {error && (
            <p className="text-red-500 font-semibold text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary">
            Create Account
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
