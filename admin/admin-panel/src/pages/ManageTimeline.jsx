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
  clearTimelineError,
  deleteTimeline,
  getAllTimeline,
  resetTimeline,
} from "@/redux/actions/timelineAction";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeline = () => {
  const { isLoading, isError, message, timeline } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    try {
      dispatch(deleteTimeline(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearTimelineError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimeline());
      dispatch(getAllTimeline());
    }
  }, [dispatch, isError, message]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Timeline</CardTitle>
                <Link to="/">
                  <Button>Back to Home</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline && timeline.data && timeline.data.length > 0 ? (
                      timeline.data.map((item) => {
                        return (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {item.description}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {item.timeline.from}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {item.timeline.to ? item.timeline.to : "Present"}
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <button
                                className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                                onClick={() => handleDeleteTimeline(item._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
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
    </>
  );
};

export default ManageTimeline;
