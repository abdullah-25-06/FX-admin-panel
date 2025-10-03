import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  UserCog,
  BarChart,
  Sliders,
  Settings,
  List,
  Tags,
  Shield,
  Trash2,
  ChevronRight,
  ChevronDown,
  Wallet,
  CreditCard,
  FileSearch,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Current active page from URL
  const activePage = location.pathname.substring(1) || "systemHome";

  const menuItems = [
    { id: "systemHome", label: "System Home", icon: Home },

    {
      id: "productManagement",
      label: "Product Management",
      icon: Package,
      children: [
        { id: "productList", label: "Product List", icon: List },
        { id: "productCategories", label: "Product Categories", icon: Tags },
        { id: "riskManagement", label: "Risk Management", icon: Shield },
        { id: "recycleBin", label: "Recycle Bin", icon: Trash2 },
      ],
    },

    // Order Management Dropdown
    {
      id: "orderManagement",
      label: "Order Management",
      icon: ShoppingCart,
      children: [
        { id: "openOrder", label: "Open Order", icon: List },
        { id: "closingLog", label: "Closing Log", icon: FileSearch },
      ],
    },

    // Member Management Dropdown
    {
      id: "memberManagement",
      label: "Member Management",
      icon: Users,
      children: [
        { id: "memberList", label: "Member List", icon: List },
        { id: "myTeam", label: "My Team", icon: Users },
        { id: "memberBank", label: "Member Bank", icon: CreditCard },
        { id: "memberWallet", label: "Member Wallet", icon: Wallet },
        { id: "rechargeList", label: "Recharge List", icon: BarChart },
        { id: "withdrawalList", label: "Withdrawal List", icon: Sliders },
        { id: "blacklist", label: "Blacklist", icon: Trash2 },
        { id: "manualDW", label: "Manual D/W", icon: Settings }, // ✅ Manual D/W
        { id: "dataReview", label: "Data Review", icon: FileSearch },
      ],
    },

    { id: "agentManagement", label: "Agent Management", icon: UserCog },
    { id: "reportManagement", label: "Report Management", icon: BarChart },

    // Parameter Settings Dropdown
    {
      id: "parameterSettings",
      label: "Parameter Settings",
      icon: Sliders,
      children: [
        { id: "basicSettings", label: "Basic Settings", icon: Settings },
        { id: "parameterSettingsChild", label: "Parameter Settings", icon: Sliders },
        { id: "invitationRewards", label: "Invitation Rewards", icon: BarChart },
        { id: "announcementList", label: "Announcement List", icon: FileSearch },
        { id: "carousel", label: "Carousel", icon: Package },
        { id: "addConfiguration", label: "Add Configuration", icon: Tags },
      ],
    },

    { id: "systemSettings", label: "System Settings", icon: Settings },
  ];

  const handleNavigation = (pageId) => {
    // Navigate to page based on id
    navigate(`/${pageId}`);
  };

  return (
    <div className="sidebar bg-gray-900 text-white w-64 h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="logo flex items-center gap-2 px-6 py-8 border-b border-gray-700">
        <div className="logo-circle bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
          A
        </div>
        <span className="text-xl font-semibold tracking-wide">Admin Panel</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col mt-10 px-4 space-y-6">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Parent Item */}
            <div
              className={`flex items-center justify-between gap-5 px-6 py-4 rounded-lg cursor-pointer transition-all ${
                activePage === item.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() =>
                item.children
                  ? setOpenMenu(openMenu === item.id ? null : item.id)
                  : handleNavigation(item.id)
              }
            >
              <div className="flex items-center gap-4">
                <item.icon size={22} />
                <span className="text-base font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
              {item.children && (
                <div className="transition-transform duration-200">
                  {openMenu === item.id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </div>
              )}
            </div>

            {/* Submenu Items */}
            {item.children && openMenu === item.id && (
              <div className="ml-10 mt-3 flex flex-col space-y-3">
                {item.children.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer transition-all ${
                      activePage === subItem.id
                        ? "bg-indigo-500 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => handleNavigation(subItem.id)}
                  >
                    <subItem.icon size={18} />
                    <span className="text-sm tracking-wide">
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
