import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
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
    <>
      <div className="w-full flex flex-col overflow-x-hidden">
        <div className="relative">
          <h1
            className="flex gap-4 items-center text-[2rem] sm:[2.75rem] md:text-[3rem] ;g:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold "
            style={{ background: "hsl(222.2 84% 4.9%" }}
          >
            About
            <span className="text-tubeLight-effect font-bold">Me</span>
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div>
          <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
            <div className="flex justify-center items-center">
              <img
                src={user && user.avatar && user.avatar.url}
                alt={user && user.fullName}
                className="bg-white p-2 sm:4  h-[240px] sm:h-[340px] md:h-[350px] lg:h-[400px]"
              />
            </div>
            <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
              <p>
                Hello, I&apos;m Armaan Ahmad, a MERN Full Stack Developer with a
                Bachelor&apos;s in Computer Applications from Integral
                University and currently pursuing my Master&apos;s at FS
                University. With 1 year of frontend experience, I specialize in
                creating scalable web applications and translating complex
                business needs into effective solutions
              </p>
              <p>
                My strengths include expertise in React.js,Node.js,Express.Js
                and MongoDB coupled with a commitment to high-quality work and
                resilience in overcoming challenges. I’m working on balancing my
                perfectionism to enhance efficiency and meet deadlines
                effectively.
              </p>
            </div>
          </div>
          <p className="tracking-[1px] text-xl">
            I&apos;m committed to delivering high-quality work on time and
            tackling challenges with determination. I stay resilient and
            focused, ensuring I overcome obstacles and meet goals effectively.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
