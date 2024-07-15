import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import userLoginImage from "@/assets/images/user-login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllError, forgetPassword } from "@/redux/actions/userAction";
import Spinner from "@/components/sub-components/spinner";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.user);

  const handleForgetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("All fields are required");
      return;
    }

    forgetPassword(dispatch, { email });
    toast.success(`Password reset link sent to your email address ${email}`);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      clearAllError(dispatch);
    }
  }, [dispatch, isError, message]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forget Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to reset your password
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleForgetPassword}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {isLoading ? (
                <Spinner content="Requesting..." />
              ) : (
                <Button type="submit" className="w-full">
                  Request for reset password
                </Button>
              )}
            </form>
            <div className="mt-4 text-center text-sm">
              Do you remember your password?
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={userLoginImage}
            alt="User login"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
