import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  console.log("user dashboard", user);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/**left for menu */}
        <div className="sticky top-24  max-h-[calc(100vh-96px)] overflow-y-auto 
        hidden lg:block border-r border-gray-200">
          <UserMenu />
        </div>

        {/**right for content */}
        <div className="bg-white min-h-[76vh] w-full lg:col-span-4 ">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
