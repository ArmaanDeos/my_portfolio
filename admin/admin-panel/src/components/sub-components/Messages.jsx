import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { format, formatDistanceToNow } from "date-fns";
import Spinner from "./spinner";
import {
  clearErrorMessages,
  deleteMessage,
  getAllMessages,
  resetMessage,
} from "@/redux/actions/messageAction";
import { toast } from "react-toastify";

const Messages = () => {
  const [messageId, setMessageId] = useState("");
  const navigateTo = useNavigate();

  const { isLoading, isError, message, messages } = useSelector(
    (state) => state.messages
  );

  const dispatch = useDispatch();

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
    toast.success("Message deleted successfully");
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch(clearErrorMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
      dispatch(getAllMessages());
    }
  }, [dispatch, isError, message, isLoading]);

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), "d MMM");
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    return `${formattedDate} (${timeAgo})`;
  };

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:p-4 sm:pl-20">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:columns-2 gap-2">
              {messages && messages.length > 0 ? (
                messages.map((message) => (
                  <Card key={message._id} className="grid gap-2 p-10 ">
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Sender Name :</span>
                      {message.senderName}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Subject :</span>{" "}
                      {message.subject}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Message :</span>
                      {message.message}
                    </CardDescription>
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Received On :</span>
                      {formatDate(message.createdAt)}
                    </CardDescription>
                    <CardFooter className="justify-end">
                      {isLoading && messageId === message._id ? (
                        <Spinner content={"Loading..."} />
                      ) : (
                        <Button
                          onClick={() => handleMessageDelete(message._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardHeader>No Messages Found!</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
