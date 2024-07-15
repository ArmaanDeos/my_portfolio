import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useParams } from "react-router-dom";
import userLoginImage from "@/assets/images/user-login.jpg";
import Spinner from "@/components/sub-components/spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, resetPassword } from "@/redux/actions/userAction";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    resetPassword(dispatch, token, password, confirmPassword);
    toast.success(
      "Password reset successfully! Please login with new password"
    );
    navigate("/login");
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError.message);
      clearAllError(dispatch);
    }

    if (isAuthenticated) {
      toast.success("User logged in successfully");
      navigate("/login");
    }
  }, [dispatch, isError, isAuthenticated, navigate, token]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Your Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to reset your password
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleResetPassword}>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  type="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {isLoading ? (
                <Spinner content="Resetting..." />
              ) : (
                <Button type="submit" className="w-full">
                  Reset Password
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

export default ResetPassword;
