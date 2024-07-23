import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  clearAllSkillError,
  deleteSkills,
  getAllSkills,
  resetSkill,
  updateSkills,
} from "@/redux/actions/skillAction";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const [newProficiency, setNewProficiency] = useState(1);
  const { isLoading, isError, message, skills } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkills(id, newProficiency));
    toast.success("Skill updated successfully");
  };

  const handleDeleteSkill = (id) => {
    try {
      dispatch(deleteSkills(id));
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearAllSkillError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkill());
      dispatch(getAllSkills());
    }
  }, [dispatch, isError, message]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs className="">
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Skills</CardTitle>
                <Link to="/">
                  <Button className="w-fit">Back to Home</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills && skills.data && skills.data.length > 0 ? (
                  skills.data.map((item) => {
                    return (
                      <Card key={item._id}>
                        <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                          {item.title}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Trash2
                                  onClick={() => handleDeleteSkill(item._id)}
                                  className="h-5 w-5 hover:text-red-600"
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                style={{ color: "red" }}
                              >
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardHeader>
                        <CardFooter>
                          <Label className="text-2xl mr-2">Proficiency</Label>
                          <Input
                            type="number"
                            defaultValue={item.proficiency}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleUpdateSkill(item._id)}
                          />
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardTitle className="text-3xl overflow-y-hidden">
                    No Skills Found!
                  </CardTitle>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageSkills;
