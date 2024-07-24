import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Project = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [gitRepolink, setGitRepolink] = useState("");
  const [projectLiveLink, setProjectLiveLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getSingleProject = async () => {
      await axios
        .get(`http://localhost:1700/api/v1/projects/single-project/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setBanner(
            res.data &&
              res.data.data &&
              res.data.data.banner &&
              res.data.data.banner.url
          );
          setGitRepolink(res.data.data.gitRepolink);
          setProjectLiveLink(res.data.data.projectLiveLink);
          setTechnologies(res.data.data.technologies);
          setStack(res.data.data.stack);
          setDeployed(res.data.data.deployed);
        })
        .catch((error) => {
          toast.error(error.response.data.data.message);
        });
    };
    getSingleProject();
  }, [id]);

  // Remove the brackets and quotes from the string, then split it
  const formatStringToArray = (str) => {
    return str
      .replace(/[\]']+/g, "")
      .split(",")
      .map((item) => item.trim());
  };

  const descriptionInListFormat = description
    ? formatStringToArray(description)
    : [];
  const technologiesInListFormat = technologies
    ? formatStringToArray(technologies)
    : [];

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-4">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <img
                    src={banner && banner}
                    alt={title}
                    className="w-full h-auto"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Description</p>
                  <ul className="list-disc list-inside">
                    {descriptionInListFormat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Technologies</p>
                  <ul className="list-disc list-inside">
                    {technologiesInListFormat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Stack</p>
                  <p>{stack} Stack</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Deployed</p>
                  <p>{deployed.toUpperCase()} </p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Github Repo Link</p>
                  <Link
                    to={gitRepolink}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {gitRepolink}
                  </Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Project Live Link</p>
                  <Link
                    to={projectLiveLink ? projectLiveLink : "/"}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {projectLiveLink ? projectLiveLink : "Still Not Deployed!"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
