import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import SideBar from "../components/SideBar";
import UserPost from "../components/UserPost";
import UserPersonalGallery from "../components/UserPersonalGallery";
const User = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("profile");
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full md:w-64 lg:w-72 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 shadow-sm">
        <SideBar />
      </div>
      <div className="flex-1 bg-white dark:bg-gray-900">
        {tab === "profile" && <UserProfile />}
        {tab === "bookings" && <Dashboard />}
        {tab === "dashboard" && <Dashboard />}
        {tab === "post" && <UserPost />}
        {tab === "gallery" && <UserPersonalGallery />}
      </div>
    </div>
  );
};

export default User;
