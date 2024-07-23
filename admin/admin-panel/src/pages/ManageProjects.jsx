import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/redux/actions/projectAction";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageProjects = () => {
  const { isLoading, isError, message, projects } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();

  const handleDeleteProjects = async (id) => {
    try {
      await dispatch(deleteProject(id)); // Ensure deleteProject is an async function
      toast.success("Project deleted successfully");
      dispatch(getAllProjects()); // Fetch the updated list of projects
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, isError, message]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Projects</CardTitle>
                <Link to="/">
                  <Button>Back to Home</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Stack</TableHead>
                      <TableHead>Deployed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects && projects.data && projects.data.length > 0 ? (
                      projects.data.map((item) => {
                        return (
                          <TableRow key={item._id}>
                            <TableCell>
                              <div>
                                <img
                                  src={item && item.banner && item.banner.url}
                                  className="w-10 h-10"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {item.stack}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {item.deployed.toUpperCase()}
                            </TableCell>

                            <TableCell className="flex flex-row gap-3 items-center h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Link to={`/view-project/${item._id}`}>
                                      <button className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-50 hover:bg-green-600">
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Link to={`/update-project/${item._id}`}>
                                      <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-50 hover:bg-yellow-400">
                                        <Pen className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Edit
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <button
                                      className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                                      onClick={() =>
                                        handleDeleteProjects(item._id)
                                      }
                                    >
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Delete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-3xl overflow-y-hidden">
                          No Projects Found!
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
    </>
  );
};

export default ManageProjects;
