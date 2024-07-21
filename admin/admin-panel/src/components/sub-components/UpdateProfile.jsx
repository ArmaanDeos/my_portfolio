import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Spinner from "./spinner";
import { Button } from "../ui/button";
import {
  clearAllError,
  getLoggedUser,
  resetProfile,
  updateProfile,
} from "@/redux/actions/userAction";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user.user) || {};
  const { isLoading, isError, isUpdated, message } =
    useSelector((state) => state.user) || {};

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioUrl, setPortfolioUrl] = useState(
    user?.portfolioUrl === "undefined" ? "" : user?.portfolioUrl || ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    user?.linkedinUrl === "undefined" ? "" : user?.linkedinUrl || ""
  );
  const [githubUrl, setGithubUrl] = useState(
    user?.githubUrl === "undefined" ? "" : user?.githubUrl || ""
  );
  const [twitterUrl, setTwitterUrl] = useState(
    user?.twitterUrl === "undefined" ? "" : user?.twitterUrl || ""
  );
  const [facebookUrl, setFacebookUrl] = useState(
    user?.facebookUrl === "undefined" ? "" : user?.facebookUrl || ""
  );
  const [instagramUrl, setInstagramUrl] = useState(
    user?.instagramUrl === "undefined" ? "" : user?.instagramUrl || ""
  );
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = (e) => {
    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioUrl", portfolioUrl);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("twitterUrl", twitterUrl);
    formData.append("facebookUrl", facebookUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      clearAllError(dispatch);
    }

    if (isUpdated) {
      getLoggedUser(dispatch);
      resetProfile(dispatch);
      toast.success("Profile Updated Successfully");
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isLoading, isError, isUpdated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview || avatar}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={avatarHandler}
                  />
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  {resumePreview ? (
                    <Link
                      to={resumePreview}
                      download="resume.pdf"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl border mt-2 flex items-center justify-center text-blue-600 text-none bg-gray-100 hover:bg-gray-200 "
                      target="_blank"
                    >
                      <p className="border-2 border-black bg-black text-white rounded-sm px-4 py-2 hover:bg-white hover:text-black transition-all ">
                        See Resume
                      </p>
                    </Link>
                  ) : (
                    <p>No resume available</p>
                  )}
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={resumeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Full Name :</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Your Full Name"
              />
            </div>

            <div className="grid gap-2">
              <Label>Email :</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />
            </div>
            <div className="grid gap-2">
              <Label>Mobile Number :</Label>
              <Input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Mobile Number"
              />
            </div>
            <div className="grid gap-2">
              <Label>About Me :</Label>
              <Textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Enter Your About Me"
              />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio Url :</Label>
              <Input
                type="url"
                value={portfolioUrl}
                placeholder="Enter Your Url"
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>GitHub Url :</Label>
              <Input
                type="url"
                value={githubUrl}
                placeholder="Enter Your Url"
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn Url :</Label>
              <Input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="Enter Your Url"
              />
            </div>
            <div className="grid gap-2">
              <Label>Twitter Url :</Label>
              <Input
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="Enter Your Url"
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook Url :</Label>
              <Input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="Enter Your Url"
              />
            </div>
            <div className="grid gap-2">
              <Label>Instagram Url :</Label>
              <Input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="Enter Your Url"
              />
            </div>
            <div className="grid gap-2">
              {!isLoading ? (
                <Button className="w-full" onClick={handleUpdateProfile}>
                  Update
                </Button>
              ) : (
                <Spinner content={"Updating..."} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
