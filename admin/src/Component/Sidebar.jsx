import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <IoIosAddCircleOutline className="w-5 h-5" />,
      label: "Add Items",
      path: "/add",
    },
    {
      icon: <FaRegListAlt className="w-5 h-5" />,
      label: "List Items",
      path: "/lists",
    },
    {
      icon: <SiTicktick className="w-5 h-5" />,
      label: "View Orders",
      path: "/order",
    },
  ];

  return (
    <div className="w-[18%] min-h-screen bg-[#F3F0FF] fixed left-0 top-0 pt-[70px] shadow-md border-r border-[#ddd] z-10">
      <div className="flex flex-col gap-6 px-6 pt-10">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-2 text-gray-800 rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-[#D6C1F5] font-semibold"
                  : "bg-white hover:bg-[#E0D1FB]"
              }`}
            >
              {item.icon}
              <p className="text-sm hidden md:block">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
