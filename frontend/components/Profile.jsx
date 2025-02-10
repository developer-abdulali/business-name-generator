"use client";
import { Contact, Eye, Mail, Pen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import AppliedJobsTable from "./AppliedJobsTable";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  useGetAppliedJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const haveResume = user?.profile?.resume || false;

  const router = useRouter();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);

    if (!user) {
      router.push("/");
    }
  }, [isDarkMode, user, router]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <section className={`px-4 py-8 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profileImage}
                alt="profile img"
              />
              <AvatarFallback>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {user?.fullname}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {user?.role}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setModalOpen(true)}
            className="w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
          >
            <Pen className="w-5 h-5" />
            Edit Profile
          </Button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500 dark:text-gray-400 w-5 h-5" />
            <span className="text-gray-700 dark:text-gray-300">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500 dark:text-gray-400 w-5 h-5" />
            <span className="text-gray-700 dark:text-gray-300">
              {user?.phoneNumber}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            Skills
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((item, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600 dark:text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800 dark:text-gray-200">
            Resume:
          </Label>
          {haveResume ? (
            <a
              href={user?.profile?.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-500 hover:underline dark:text-blue-400"
            >
              Download Resume
            </a>
          ) : (
            <span className="text-gray-600 dark:text-gray-400"> NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 mt-8 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">
            Applied Jobs
          </p>
          <Link href="/jobs">
            <Button
              variant="outline"
              className="w-auto bg-purple-600 hover:text-white dark:bg-purple-700 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
            >
              <Eye className="w-5 h-5" />
              View All Jobs
            </Button>
          </Link>
        </div>
        <AppliedJobsTable />
      </div>

      <UpdateProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </section>
  );
};

export default Profile;
