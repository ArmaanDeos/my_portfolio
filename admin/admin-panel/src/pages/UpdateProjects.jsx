import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "@/utilities/requestMethods";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProjects,
} from "@/redux/actions/projectAction";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/sub-components/spinner";
import { Button } from "@/components/ui/button";

const UpdateProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerPrev, setBannerPrev] = useState("");
  const [gitRepolink, setGitRepolink] = useState("");
  const [projectLiveLink, setProjectLiveLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();

  const { isLoading, isError, message, projects } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();

  const handleBannerPreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBanner(file);
      setBannerPrev(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const getSingleProject = async () => {
      try {
        const res = await publicRequest.get(`/projects/single-project/${id}`, {
          withCredentials: true,
        });
        const projectData = res.data.data;
        setTitle(projectData.title);
        setDescription(projectData.description);
        setBanner(projectData.banner?.url);
        setBannerPrev(projectData.banner?.url);
        setGitRepolink(projectData.gitRepolink);
        setProjectLiveLink(projectData.projectLiveLink);
        setTechnologies(projectData.technologies);
        setStack(projectData.stack);
        setDeployed(projectData.deployed);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getSingleProject();

    if (isError) {
      toast.error(isError);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, dispatch, isError, message]);

  const handleUpdateProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("banner", banner);
    formData.append("gitRepolink", gitRepolink);
    formData.append("projectLiveLink", projectLiveLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);

    dispatch(updateProjects(id, formData));
    dispatch(getAllProjects());
    toast.success("Project updated successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-4">
      <form
        className="w-[100%] px-5 md:w-[1000px]"
        onSubmit={handleUpdateProject}
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Update Projects
              </h2>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <img src={bannerPrev} alt={title} className="w-full h-auto" />
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleBannerPreview}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="Project Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Technologies Used in Project
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="ReactJs,NodeJs,ExpressJs"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Stack Used in Project
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Stack"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Stack">Full Stack</SelectItem>
                        <SelectItem value="MEAN">MEAN Stack</SelectItem>
                        <SelectItem value="MERN">MERN Stack</SelectItem>
                        <SelectItem value="PERN">PERN Stack</SelectItem>
                        <SelectItem value="MEVN">MEVN Stack</SelectItem>
                        <SelectItem value="NEXT JS">NEXT JS</SelectItem>
                        <SelectItem value="JAVASCRIPT">JAVASCRIPT</SelectItem>
                        <SelectItem value="HTML & CSS">HTML & CSS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is Project Deployed"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Github Repo Link
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      placeholder="GitHub Repo Link"
                      value={gitRepolink}
                      onChange={(e) => setGitRepolink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Live Link
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      placeholder="Project Live Link"
                      value={projectLiveLink}
                      onChange={(e) => setProjectLiveLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Spinner content={"Updating Project..."} />
        ) : (
          <Button className="w-full" type="submit">
            Update Project
          </Button>
        )}
      </form>
    </div>
  );
};

export default UpdateProjects;
