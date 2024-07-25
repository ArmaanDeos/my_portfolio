import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // Ensure you have this Button component styled accordingly

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState(null);
  const initialDisplayCount = 3; // Number of projects initially displayed

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-d7ai.onrender.com/api/v1/projects`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching the projects", error);
      }
    };

    getMyProjects();
  }, []);

  const totalProjects = projects ? projects.data.length : 0;
  const shouldShowButton = totalProjects > initialDisplayCount;

  return (
    <>
      <div className="">
        <div className="relative mb-12">
          <h1
            className="hidden md:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            My
            <span className="text-tubeLight-effect font-bold">Portfolio</span>
          </h1>
          <h1
            className="flex md:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            My
            <span className="text-tubeLight-effect font-bold">Work</span>
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects &&
            (viewAll
              ? projects.data
              : projects.data.slice(0, initialDisplayCount)
            ).map((item) => (
              <Link
                key={item._id}
                to={`/project/${item._id}`}
                className="relative group"
              >
                <img
                  src={item.banner && item.banner.url}
                  alt={item.title}
                  className="w-full h-60 object-cover rounded-lg border border-gray-300 shadow-lg transition-transform transform group-hover:scale-105"
                />
                <h3 className="mt-2 text-center text-xl font-semibold ">
                  {item.title}
                </h3>
                <div className="absolute w-full  inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              </Link>
            ))}
        </div>
        {shouldShowButton && (
          <div className="w-full text-center my-9">
            <Button
              onClick={() => setViewAll(!viewAll)}
              className="px-6 py-3 text-white bg-blue-500 border border-blue-500 rounded-lg shadow-md transition-all hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {viewAll ? "View Less" : "View All"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
