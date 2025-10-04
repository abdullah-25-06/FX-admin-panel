<<<<<<< HEAD
import React, { useState } from "react";
=======
// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> 4b828d7 (Initial commit to company repo)
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
<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Current active page from URL
  const activePage = location.pathname.substring(1) || "systemHome";

=======

const Sidebar = ({ navigate: navigateProp, location: locationProp }) => {
  // Hooks
  const navHook = useNavigate();
  const locHook = useLocation();
  const navigate = navigateProp || navHook;
  const location = locationProp || locHook;

  const [openMenu, setOpenMenu] = useState(null);

  // 🧭 Active page detection
  const pathname = location?.pathname || "/";
  let activePage = pathname.replace(/^\/+/, "").split("/")[0] || "systemHome";
  if (pathname === "/dashboard") {
    activePage = "systemHome"; // ✅ So that System Home stays highlighted on Dashboard route
  }

  // 📌 Menu Items
>>>>>>> 4b828d7 (Initial commit to company repo)
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

<<<<<<< HEAD
    // Order Management Dropdown
=======
>>>>>>> 4b828d7 (Initial commit to company repo)
    {
      id: "orderManagement",
      label: "Order Management",
      icon: ShoppingCart,
      children: [
        { id: "openOrder", label: "Open Order", icon: List },
        { id: "closingLog", label: "Closing Log", icon: FileSearch },
      ],
    },

<<<<<<< HEAD
    // Member Management Dropdown
=======
>>>>>>> 4b828d7 (Initial commit to company repo)
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
<<<<<<< HEAD
        { id: "manualDW", label: "Manual D/W", icon: Settings }, // ✅ Manual D/W
=======
        { id: "manualdw", label: "Manual D/W", icon: Settings },
>>>>>>> 4b828d7 (Initial commit to company repo)
        { id: "dataReview", label: "Data Review", icon: FileSearch },
      ],
    },

    { id: "agentManagement", label: "Agent Management", icon: UserCog },
    { id: "reportManagement", label: "Report Management", icon: BarChart },

<<<<<<< HEAD
    // Parameter Settings Dropdown
=======
>>>>>>> 4b828d7 (Initial commit to company repo)
    {
      id: "parameterSettings",
      label: "Parameter Settings",
      icon: Sliders,
      children: [
        { id: "basicSettings", label: "Basic Settings", icon: Settings },
<<<<<<< HEAD
        { id: "parameterSettingsChild", label: "Parameter Settings", icon: Sliders },
        { id: "invitationRewards", label: "Invitation Rewards", icon: BarChart },
        { id: "announcementList", label: "Announcement List", icon: FileSearch },
=======
        {
          id: "parameterSettingsChild",
          label: "Parameter Settings",
          icon: Sliders,
        },
        {
          id: "invitationRewards",
          label: "Invitation Rewards",
          icon: BarChart,
        },
        {
          id: "announcementList",
          label: "Announcement List",
          icon: FileSearch,
        },
>>>>>>> 4b828d7 (Initial commit to company repo)
        { id: "carousel", label: "Carousel", icon: Package },
        { id: "addConfiguration", label: "Add Configuration", icon: Tags },
      ],
    },

    { id: "systemSettings", label: "System Settings", icon: Settings },
  ];

<<<<<<< HEAD
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
=======
  // 🔓 Auto-open parent if any child is active
  useEffect(() => {
    for (const item of menuItems) {
      if (item.children && item.children.some((c) => c.id === activePage)) {
        setOpenMenu(item.id);
        return;
      }
    }
    if (menuItems.some((m) => m.id === activePage)) {
      setOpenMenu(activePage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  // 🧭 Navigation Handler
  const handleNavigation = (pageId) => {
    if (!pageId) return;

    // 📝 Special rule for System Home → goes to Dashboard route
    let targetRoute = pageId === "systemHome" ? "/dashboard" : `/${pageId}`;

    if (typeof navigate === "function") {
      navigate(targetRoute);
    } else {
      console.warn("navigate is not available");
    }
    setOpenMenu(null);
  };

  // 🧱 Inline Styles
  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    flexShrink: 0,
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "20px 15px",
    borderBottom: "1px solid #34495e",
  };

  const avatarStyle = {
    backgroundColor: "#3498db",
    color: "white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
  };

  const navContainerStyle = {
    padding: "15px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const parentBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s",
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left",
  };

  const subBaseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s",
    border: "none",
    background: "transparent",
    textAlign: "left",
    width: "100%",
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <div style={avatarStyle}>A</div>
        <span style={{ fontSize: "16px", fontWeight: "600" }}>Admin Panel</span>
      </div>

      {/* Navigation */}
      <div style={navContainerStyle}>
        {menuItems.map((item) => {
          const isActiveParent = activePage === item.id;
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;

          const parentStyle = {
            ...parentBaseStyle,
            backgroundColor: isActiveParent ? "#e74c3c" : "transparent",
            color: isActiveParent ? "white" : "#95a5a6",
          };

          return (
            <div key={item.id}>
              {/* Parent Item */}
              <button
                type='button'
                style={parentStyle}
                onClick={() =>
                  hasChildren
                    ? setOpenMenu(openMenu === item.id ? null : item.id)
                    : handleNavigation(item.id)
                }
                onMouseEnter={(e) => {
                  if (!isActiveParent) {
                    e.currentTarget.style.backgroundColor = "#34495e";
                    e.currentTarget.style.color = "#ecf0f1";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActiveParent) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#95a5a6";
                  }
                }}
                aria-expanded={hasChildren ? openMenu === item.id : undefined}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <item.icon size={18} />
                  <span style={{ fontWeight: "500" }}>{item.label}</span>
                </div>
                {hasChildren && (
                  <div>
                    {openMenu === item.id ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {hasChildren && openMenu === item.id && (
                <div
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  {item.children.map((subItem) => {
                    const isActive = activePage === subItem.id;
                    const subStyle = {
                      ...subBaseStyle,
                      backgroundColor: isActive ? "#e74c3c" : "transparent",
                      color: isActive ? "white" : "#95a5a6",
                    };

                    return (
                      <button
                        key={subItem.id}
                        type='button'
                        style={subStyle}
                        onClick={() => handleNavigation(subItem.id)}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "#34495e";
                            e.currentTarget.style.color = "#ecf0f1";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#95a5a6";
                          }
                        }}
                      >
                        <subItem.icon size={16} />
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
>>>>>>> 4b828d7 (Initial commit to company repo)
      </div>
    </div>
  );
};

export default Sidebar;
