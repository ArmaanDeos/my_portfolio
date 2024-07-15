import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Spinner from "./spinner";
import { updateProfile } from "@/redux/actions/userAction";
import { toast } from "react-toastify";
import { clearErrors } from "@/redux/reducers/userSlice";

const UpdateProfile = () => {
  const { isLoading, isError, currentUser, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const user = currentUser?.user;

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [aboutMe, setAboutMe] = useState(user.aboutMe || "");
  const [portfolioUrl, setPortfolioUrl] = useState(user.portfolioUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(
    user.linkedinUrl === "undefined" ? "" : user.linkedinUrl
  );
  const [githubUrl, setGithubUrl] = useState(
    user.githubUrl === "undefined" ? "" : user.githubUrl
  );
  const [twitterUrl, setTwitterUrl] = useState(
    user.twitterUrl === "undefined" ? "" : user.twitterUrl
  );
  const [instagramUrl, setInstagramUrl] = useState(
    user.instagramUrl === "undefined" ? "" : user.instagramUrl
  );
  const [facebookUrl, setFacebookUrl] = useState(
    user.facebookUrl === "undefined" ? "" : user.facebookUrl
  );
  const [resume, setResume] = useState(user.resume?.url || "");
  const [avatar, setAvatar] = useState(user.avatar?.url || "");

  const avatarImgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resumeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const profileData = new FormData();
    profileData.append("fullName", fullName);
    profileData.append("email", email);
    profileData.append("phone", phone);
    profileData.append("aboutMe", aboutMe);
    profileData.append("portfolioUrl", portfolioUrl);
    profileData.append("linkedinUrl", linkedinUrl);
    profileData.append("githubUrl", githubUrl);
    profileData.append("twitterUrl", twitterUrl);
    profileData.append("instagramUrl", instagramUrl);
    profileData.append("facebookUrl", facebookUrl);
    profileData.append("resume", resume);
    profileData.append("avatar", avatar);

    updateProfile(dispatch, profileData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      clearErrors(dispatch);
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
    }
    if (message) {
      toast.success(message);
    }
  }, [isError, dispatch, isLoading, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="mb-5">Full Profile Preview </p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatar ? avatar : ""}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={avatarImgHandler}
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                {resume ? (
                  <>
                    <Link
                      to={user.resume?.url}
                      download="resume.pdf"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl border mt-2 flex items-center justify-center text-blue-600 text-none bg-gray-100 hover:bg-gray-200 "
                      target="_blank"
                    >
                      <p className="border-2 border-black bg-black text-white rounded-sm px-4 py-2 hover:bg-white hover:text-black transition-all">
                        See Resume
                      </p>
                    </Link>
                    <div className="relative">
                      <input
                        type="file"
                        className="avatar-update-btn"
                        onChange={resumeFileHandler}
                      />
                    </div>
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
              value={fullName}
              placeholder="Enter Your Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Email :</Label>
            <Input
              type="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Mobile Number :</Label>
            <Input
              type="number"
              value={phone}
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>About Me :</Label>
            <Textarea
              value={aboutMe}
              placeholder="Write something about yourself"
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Portfolio Url :</Label>
            <Input
              value={portfolioUrl}
              placeholder="Enter Your Portfolio Url"
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>GitHub Url :</Label>
            <Input
              value={githubUrl}
              placeholder="Enter Your GitHub Url"
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn Url :</Label>
            <Input
              value={linkedinUrl}
              placeholder="Enter Your LinkedIn Url"
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Twitter Url :</Label>
            <Input
              value={twitterUrl}
              placeholder="Enter Your Twitter Url"
              onChange={(e) => setTwitterUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Facebook Url :</Label>
            <Input
              value={facebookUrl}
              placeholder="Enter Your Facebook Url"
              onChange={(e) => setFacebookUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Instagram Url :</Label>
            <Input
              value={instagramUrl}
              placeholder="Enter Your Instagram Url"
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {!isLoading ? (
              <Button className="w-full" onClick={handleUpdateProfile}>
                Update Profile
              </Button>
            ) : (
              <Spinner content={"Updating Profile..."} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
