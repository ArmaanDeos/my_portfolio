import axios from "axios";
import {
  LinkedinIcon,
  Instagram,
  Github,
  Facebook,
  X,
  ExternalLink,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1700/api/v1/user/portfolio/me`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching the profile", error);
      }
    };

    getMyProfile();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey👋, I&apos;m {user && user.fullName}
      </h1>
      <h1 className="typewriter-container  text-[1.3rem] sm:text-[1.7rem] md:text-[2.rem] lg:text-[2.8rem] tracking-[10px]">
        <Typewriter
          words={[
            "Web Developer",
            "MERN Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
          ]}
          loop={50}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="w-fit px-5 py-2 lg-slate-50  rounded-[20px] flex gap-5 items-center mt-4 lg:mt-10 bg-gray-200">
        <Link to={`${user && user.linkedinUrl}`} target="_blank">
          <LinkedinIcon className="text-blue-500 w-7 h-7 " />
        </Link>
        <Link to={`${user && user.instagramUrl}`} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7 " />
        </Link>
        <Link to={`${user && user.facebookUrl}`} target="_blank">
          <Facebook className="text-blue-500 w-7 h-7 " />
        </Link>

        <Link to={`${user && user.twitterUrl}`} target="_blank">
          <X className="text-black w-7 h-7 " />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={`${user && user.githubUrl}`} target="_blank">
          <Button className="rounded-[300px]  bg-gray-200 text-black p-3 flex items-center gap-1 flex-row">
            <span>
              <Github />
            </span>
            <span className="text-bold">GITHUB</span>
          </Button>
        </Link>
        <Link to={`${user && user.resume && user.resume.url}`} target="_blank">
          <Button className="rounded-[300px]  bg-gray-200 text-black p-3 flex items-center gap-1 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span className="text-bold">RESUME</span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user && user.aboutMe}</p>
      <hr className="my-8 md:my-10" />
    </div>
  );
};

export default Hero;
