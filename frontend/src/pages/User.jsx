import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import SideBar from "../components/SideBar";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-900">
      <div className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-100 shadow-sm">
        <SideBar />
      </div>
      <div className="flex-1 bg-white">
        {tab === "profile" && <UserProfile />}
        {tab === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
};

export default User;
