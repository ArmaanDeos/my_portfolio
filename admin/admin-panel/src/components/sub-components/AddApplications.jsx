import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./spinner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Image } from "lucide-react";
import { toast } from "react-toastify";
import {
  addNewApplication,
  clearApplicationErrors,
  getAllApplication,
  resetApplication,
} from "@/redux/actions/applicationAction";

const AddApplications = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { isLoading, isError, message } = useSelector(
    (state) => state.application
  );
  const dispatch = useDispatch();

  const handleAddApplication = (e) => {
    e.preventDefault();

    const data = {
      name,
      svg,
    };
    if (!name || !svg) {
      toast.error("All fields are required");
      return;
    }
    dispatch(addNewApplication(data));
    toast.success("Application added successfully");
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearApplicationErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetApplication());
      dispatch(getAllApplication());
    }
  }, [dispatch, isError, isLoading, message]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-4">
        <form
          className="w-[100%] px-5 md:w-[650px]"
          onSubmit={handleAddApplication}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Add New Applications
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Application Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Applications Svg
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (
                        <img
                          src={svgPreview && svgPreview}
                          alt="svg"
                          className="mx-auto h-12 w-12 text-gray-300"
                        />
                      ) : (
                        <Image
                          aria-hidden="true"
                          className="mx-auto h-12 w-12 text-gray-300"
                        />
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            onChange={handleSvg}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Spinner content={"Adding Applications..."} />
          ) : (
            <Button className="w-full" type="submit">
              Add Applications
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddApplications;
