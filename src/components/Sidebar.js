// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

    {
      id: "orderManagement",
      label: "Order Management",
      icon: ShoppingCart,
      children: [
        { id: "openOrder", label: "Open Order", icon: List },
        { id: "closingLog", label: "Closing Log", icon: FileSearch },
      ],
    },

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
        { id: "manualdw", label: "Manual D/W", icon: Settings },
        { id: "dataReview", label: "Data Review", icon: FileSearch },
      ],
    },

    { id: "agentManagement", label: "Agent Management", icon: UserCog },
    { id: "reportManagement", label: "Report Management", icon: BarChart },

    {
      id: "parameterSettings",
      label: "Parameter Settings",
      icon: Sliders,
      children: [
        { id: "basicSettings", label: "Basic Settings", icon: Settings },
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
        { id: "carousel", label: "Carousel", icon: Package },
        { id: "addConfiguration", label: "Add Configuration", icon: Tags },
      ],
    },

    { id: "systemSettings", label: "System Settings", icon: Settings },
  ];

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
      </div>
    </div>
  );
};

export default Sidebar;
