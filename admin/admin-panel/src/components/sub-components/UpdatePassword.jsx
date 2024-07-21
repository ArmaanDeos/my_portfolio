import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";

import { Input } from "../ui/input";

import { Button } from "../ui/button";
import Spinner from "./spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllError,
  getLoggedUser,
  resetProfile,
  updatePassword,
} from "@/redux/actions/userAction";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { isLoading, isError, isUpdated, message } =
    useSelector((state) => state.user) || {};

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      clearAllError(dispatch);
    }

    if (isUpdated) {
      getLoggedUser(dispatch);
      resetProfile(dispatch);
      toast.success("Password Updated Successfully");
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isLoading, isError, isUpdated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5">Update Your Password</p>
            </div>

            <div className="grid gap-2">
              <Label>Current Password :</Label>
              <Input
                type="text"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
              />
            </div>
            <div className="grid gap-2">
              <Label>New Password :</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password :</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            <div className="grid gap-2">
              {!isLoading ? (
                <Button className="w-full" onClick={handleUpdatePassword}>
                  Update
                </Button>
              ) : (
                <Spinner content={"Updating..."} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
