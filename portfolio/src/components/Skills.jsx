import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const [skills, setSkills] = useState(null);

  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-d7ai.onrender.com/api/v1/skills`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSkills(res.data);
      } catch (error) {
        console.error("Error fetching the skills", error);
      }
    };

    getMySkills();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-8 sm:gap-12">
        <div className="relative">
          <h1
            className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            Skills
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div
          ref={skillsRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {skills &&
            skills.data.map((item, index) => (
              <Card
                key={item._id}
                className={`h-fill p-7 flex flex-col justify-center items-center gap-3 border border-gray-300 shadow-lg transition-transform transform ${
                  skillsInView ? "scale-105 fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={item.svg && item.svg.url}
                  alt={item.title}
                  className="h-12 sm:h-24 w-auto object-contain"
                />
                <p className="text-muted-foreground text-center">
                  {item.title}
                </p>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
