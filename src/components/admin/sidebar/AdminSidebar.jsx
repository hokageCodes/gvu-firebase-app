import React, { useState } from "react";
import { HiMenuAlt3, HiOutlineUserGroup, HiPlus } from "react-icons/hi";
import { MdOutlineDashboard, MdWorkOutline } from "react-icons/md";
import { RiSettings4Line, RiUploadLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import Logo from '../../../assets/logo.jpg'; // Adjust the path as necessary

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({ people: false, careers: false });

  const toggleDropdown = (section) => {
    setDropdownOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menus = [
    { name: "Dashboard", link: "/admin-dashboard", icon: MdOutlineDashboard },
    {
      name: "Student Management", link: "/student-management",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Upload Past-Question", link: "/upload-past-questions",
      icon: RiUploadLine,
    },
    { name: "View Uploads", link: "/view-uploads", icon: RiUploadLine },
    { name: "Messages", link: "/messages", icon: AiOutlineUser },
    { name: "profile", link: "/admin-profile", icon: RiSettings4Line },
  ];

  return (
    <section className="flex">
      <div className={`${open ? "w-64" : "w-20"} bg-[#fff] min-h-screen text-[#01553d] px-4 transition-all duration-300`}>
        <div className="py-5 flex justify-end">
          <HiMenuAlt3 size={30} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-5">
          <img src={Logo} alt="Logo" width={open ? 150 : 50} height={open ? 150 : 50} />
          {menus.map((menu, i) => (
            <div key={i} className={`flex flex-col ${menu.margin && "mt-5"}`}>
              {menu.link ? (
                <a href={menu.link} className="group flex items-center text-sm gap-4 font-medium p-2 rounded-md hover:bg-[#013d33]">
                  <div className="text-2xl">{React.createElement(menu.icon)}</div>
                  <span className={`whitespace-nowrap ${!open && "hidden"} group-hover:text-white`}>
                    {menu.name}
                  </span>
                </a>
              ) : (
                <div onClick={() => toggleDropdown(menu.name.toLowerCase())} className="cursor-pointer">
                  <div className="group flex items-center text-sm gap-4 font-medium p-2 rounded-md hover:bg-[#013d33]">
                    <div className="text-2xl">{React.createElement(menu.icon)}</div>
                    <span className={`whitespace-nowrap ${!open && "hidden"} group-hover:text-white`}>{menu.name}</span>
                    {menu.children && open && (
                      <HiPlus className={`transition-transform ${dropdownOpen[menu.name.toLowerCase()] ? 'rotate-45' : ''}`} />
                    )}
                  </div>
                  {dropdownOpen[menu.name.toLowerCase()] && menu.children && (
                    <div className="flex flex-col pl-4">
                      {menu.children.map((child, index) => (
                        child.link ? (
                          <a href={child.link} key={index} className="py-2 text-sm hover:bg-[#013d33] rounded-md transition-all">{child.name}</a>
                        ) : (
                          <div key={index} className="py-2 text-sm hover:bg-[#013d33] rounded-md transition-all">
                            {child.name}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
