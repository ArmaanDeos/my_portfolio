import React from "react";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user.user);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="mb-5">Full Profile Preview</p>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  {user && user.resume && user.resume.url ? (
                    <>
                      <Link
                        to={user.resume.url}
                        download="resume.pdf"
                        className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl border mt-2 flex items-center justify-center text-blue-600 text-none bg-gray-100 hover:bg-gray-200 "
                        target="_blank"
                      >
                        <p className="border-2 border-black bg-black text-white rounded-sm px-4 py-2 hover:bg-white hover:text-black transition-all ">
                          See Resume
                        </p>
                      </Link>
                    </>
                  ) : (
                    <p>No resume available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Full Name :</Label>
              <Input
                type="text"
                defaultValue={user && user.fullName}
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label>Email :</Label>
              <Input type="email" defaultValue={user && user.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Mobile Number :</Label>
              <Input type="number" defaultValue={user && user.phone} disabled />
            </div>
            <div className="grid gap-2">
              <Label>About Me :</Label>
              <Textarea type="" defaultValue={user && user.aboutMe} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio Url :</Label>
              <Input
                type=""
                defaultValue={user && user.portfolioUrl}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>GitHub Url :</Label>
              <Input type="" defaultValue={user && user.githubUrl} disabled />
            </div>
            <div className="grid gap-2">
              <Label>LinkedId Url :</Label>
              <Input type="" defaultValue={user && user.linkedinUrl} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Twitter Url :</Label>
              <Input type="" defaultValue={user && user.twitterUrl} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Facebook Url :</Label>
              <Input type="" defaultValue={user && user.facebookUrl} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Instagram Url :</Label>
              <Input
                type=""
                defaultValue={user && user.instagramUrl}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
