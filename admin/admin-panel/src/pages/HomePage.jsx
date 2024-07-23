import { clearAllError, logoutUser } from "@/redux/actions/userAction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageCircleCode,
  Package,
  PencilRuler,
  User,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/sub-components/Dashboard";
import AddProjects from "@/components/sub-components/AddProjects";
import AddSkills from "@/components/sub-components/AddSkills";
import AddApplications from "@/components/sub-components/AddApplications";
import AddTimeline from "@/components/sub-components/AddTimeline";
import Messages from "@/components/sub-components/Messages";
import Accounts from "@/components/sub-components/Accounts";
import Logout from "@/components/sub-components/Logout";

const HomePage = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, isError, user } = useSelector((state) => state.user);
  console.log(user);

  const handleLogout = async () => {
    await logoutUser(dispatch);
    navigate("/login");
    toast.success("User logged out successfully");
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      clearAllError(dispatch);
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isError, isAuthenticated, navigate, dispatch]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 bg-background border-r hidden w-14 flex-col sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-2">
            <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full ">
              <Package className="h-6 w-6 transition-all group-hover:scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Dashboard"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Dashboard")}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Project"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Add Project")}
                  >
                    <FolderGit className="h-5 w-5" />
                    <span className="sr-only">Add Project</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Project</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Skills"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Add Skills")}
                  >
                    <PencilRuler className="h-5 w-5" />
                    <span className="sr-only">Add Skills</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Skills</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Applications"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Add Applications")}
                  >
                    <LayoutGrid className="h-5 w-5" />
                    <span className="sr-only">Add Applications</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Applications</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Timeline"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Add Timeline")}
                  >
                    <History className="h-5 w-5" />
                    <span className="sr-only">Add Timeline</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Timeline</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Messages"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Messages")}
                  >
                    <MessageCircleCode className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={() => setActive("Account")}
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent "
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8 border-2 shadow-sm`}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

        <header className="sticky top-0 z-30  h-14 flex-col border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900]:[100px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                varient="outline"
                className="sm:hidden mt-2"
              ></Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs ">
              <nav className="grid gap-6 text-lg font-medium">
                <Link className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                  <Package className="h-5 w-5 transition-all group-hover:scale-110" />
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  Add Project
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skills"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Skills")}
                >
                  <PencilRuler className="h-5 w-5" />
                  Add Skills
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Applications"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Applications")}
                >
                  <LayoutGrid className="h-5 w-5" />
                  Add Applications
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Timeline"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  Add Timeline
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageCircleCode className="h-5 w-5" />
                  Messages
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Logout"
                      ? "text-accent-foreground "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-4">
            {user && user.user?.avatar && user.user?.avatar.url ? (
              <img
                src={user && user.user?.avatar.url}
                alt="avatar"
                className="h-20 w-20 rounded-full max-[900px]:hidden "
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 max-[900px]:hidden" />
            )}
            <h1 className="text-3xl font-semibold">
              Welcome Back, {user && user.user?.fullName}
            </h1>
          </div>
        </header>
        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
            case "Add Project":
              return <AddProjects />;
            case "Add Skills":
              return <AddSkills />;
            case "Add Applications":
              return <AddApplications />;
            case "Add Timeline":
              return <AddTimeline />;
            case "Messages":
              return <Messages />;
            case "Account":
              return <Accounts />;
            case "Logout":
              return <Logout />;
            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </>
  );
};

export default HomePage;
