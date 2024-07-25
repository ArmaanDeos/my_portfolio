import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-d7ai.onrender.com/api/v1/timeline`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTimeline(res.data);
      } catch (error) {
        console.error("Error fetching the timeline", error);
      }
    };

    getMyTimeline();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:[2.75rem] md:text-[3rem] ;g:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold "
          style={{ background: "hsl(222.2 84% 4.9%" }}
        >
          Timeline
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {timeline &&
          timeline.data &&
          timeline.data.map((item) => {
            return (
              <li className="mb-10 ms-6" key={item._id}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {formatDate(item.timeline.from)} -{" "}
                  {formatDate(item.timeline.to)}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;
