import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
const User = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {tab === "profile" && <UserProfile />}
      {tab === "posts" && <Dashboard />}
    </div>
  );
};

export default User;
