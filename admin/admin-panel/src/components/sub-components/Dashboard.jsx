import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import {
  clearApplicationErrors,
  deleteApplication,
  getAllApplication,
  resetApplication,
} from "@/redux/actions/applicationAction";
import { toast } from "react-toastify";
import { clearAllSkillError } from "@/redux/actions/skillAction";
import Spinner from "./spinner";

const Dashboard = () => {
  const [appId, setAppId] = useState("");

  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.application
  );
  const { timeline } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleApplicationDelete = (id) => {
    setAppId(id);
    dispatch(deleteApplication(id))
      .then(() => {
        dispatch(getAllApplication());
        toast.warn("Application deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete application");
      });
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplication());
    }
    dispatch(getAllApplication());
  }, [dispatch, isError, message]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  ">
              <Card className="sm:col-span-1">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user && user.user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user && user.portfolioUrl} target="_blank">
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-3">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-3xl">
                    {projects && projects.data && projects.data.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to="/manage-projects">
                    <Button>Manage Project</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-3">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-3xl">
                    {skills && skills.data && skills.data.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to="/manage-skills">
                    <Button>Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className=" md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects &&
                        projects.data &&
                        projects.data.length > 0 ? (
                          projects.data.map((item) => {
                            return (
                              <TableRow key={item._id} className="bg-accent">
                                <TableCell>
                                  <div className="font-semibold">
                                    {item.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="font-semibold">
                                    {item.stack}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="font-semibold">
                                    {item.deployed.toUpperCase()}
                                  </div>
                                </TableCell>
                                <TableCell className="">
                                  <Link to={`/update-project/${item._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className=" text-right">
                                  <Link
                                    to={`item.projectLiveLink ? ${item.projectLiveLink}:""`}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-hidden">
                              Project Not Found! Please add your project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 xl:grid-col-4 gap-4">
                    {skills && skills.data && skills.data.length > 0 ? (
                      skills.data.map((item) => {
                        return (
                          <Card
                            key={item._id}
                            className="flex flex-col justify-center"
                          >
                            <CardHeader className="pb-3">
                              <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                              <Progress value={item.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <Card className="flex flex-col justify-center">
                        <CardHeader className="pb-3">
                          <CardTitle>No Skills Found!</CardTitle>
                        </CardHeader>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications &&
                        applications.data &&
                        applications.data.length > 0 ? (
                          applications.data.map((item) => {
                            return (
                              <TableRow key={item._id}>
                                <TableCell>
                                  <div className="font-semibold">
                                    {item.name}
                                  </div>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    src={item.svg && item.svg.url}
                                    alt={item.name}
                                    className="w-7 h-7"
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {isLoading && appId === item._id ? (
                                    <Spinner
                                      content={"Deleting..."}
                                      className="w-fit"
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleApplicationDelete(item._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              No Applications Found!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage-timeline"}>
                      <Button>Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Start From</TableHead>
                          <TableHead>End To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline &&
                        timeline.data &&
                        timeline.data.length > 0 ? (
                          timeline.data.map((item) => {
                            return (
                              <TableRow key={item._id}>
                                <TableCell className="font-medium">
                                  {item.title}
                                </TableCell>
                                <TableCell className="font-semibold">
                                  {item.timeline.from}
                                </TableCell>
                                <TableCell className="font-semibold">
                                  {item.timeline.to
                                    ? item.timeline.to
                                    : "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              No Timeline Found!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
