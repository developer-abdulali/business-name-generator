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

const Profile = () => {
  useGetAppliedJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const haveResume = user?.profile?.resume || false;

  return (
    <div className="px-4 py-8 bg-gray-50">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between">
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

          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            <Pen className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 my-2">
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
              <span className="text-gray-600"> NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Resume</Label>
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

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white mt-8 rounded-lg shadow-md p-6 sm:p-8">
        <p className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</p>
        <AppliedJobsTable />
      </div>

      {/* Update profile modal */}
      <UpdateProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Profile;
