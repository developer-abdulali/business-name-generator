"use client";
import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import AppliedJobsTable from "./AppliedJobsTable";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Link from "next/link";

const Profile = () => {
  useGetAppliedJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log("Role", user?.role);
  const haveResume = user?.profile?.resume || false;

  return (
    <section className="px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profileImage ||
                  "https://cdn-icons-png.flaticon.com/128/15339/15339256.png"
                }
                alt="profile img"
              />
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-purple-600 text-white hover:text-black"
            onClick={() => setModalOpen(true)}
          >
            <Pen className="w-5 h-5" />
            Edit Profile
          </Button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-gray-800">Skills</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((item, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">NA</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Resume:</Label>
          {haveResume ? (
            <a
              href={user?.profile?.resume}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-500 hover:underline"
            >
              Download Resume
            </a>
          ) : (
            <span className="text-gray-600"> NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white mt-8 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</p>
          <Link href="/jobs">
            <Button
              variant="outline"
              className="bg-purple-600 text-white hover:bg-gray-100 hover:text-black"
            >
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
