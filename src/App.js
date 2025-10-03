import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import CurrencyManagement from "./pages/CurrencyManagement";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import WebSettings from "./pages/WebSettings";
import Finance from "./pages/Finance";
import TradeCenter from "./pages/TradeCenter";
import Mining from "./pages/Mining";
import CoinSubscribe from "./pages/CoinSubscribe";
import Announcement from "./pages/Announcement";
import AgentManagement from "./pages/AgentManagement";
import UserWallet from "./pages/UserWallet";
import UserCoin from "./pages/UserCoin";
import OnlineChat from "./pages/OnlineChat";
import AdminManagement from "./pages/AdminManagement";
import "./App.css";

// Create a wrapper component that has access to navigation
function SidebarWithNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the active page from the URL path
  const activePage = location.pathname.substring(1) || "dashboard";

  const setActivePage = (pageId) => {
    navigate(`/${pageId}`);
  };

  return <Sidebar activePage={activePage} setActivePage={setActivePage} />;
}

function App() {
  return (
    <Router>
      <div className='app-container'>
        <SidebarWithNavigation />
        <div className='main-content'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/webSetting' element={<WebSettings />} />
            <Route path='/userManagement' element={<UserManagement />} />
            <Route path='/finance' element={<Finance />} />
            <Route path='/tradeCenter' element={<TradeCenter />} />
            <Route path='/mining' element={<Mining />} />
            <Route path='/coinSubscribe' element={<CoinSubscribe />} />
            <Route path='/announcement' element={<Announcement />} />
            <Route path='/system' element={<SystemSettings />} />
            <Route path='/webInfo' element={<WebSettings />} />
            <Route path='/systemManagement' element={<SystemSettings />} />
            <Route path='/walletCoin' element={<CurrencyManagement />} />
            <Route path='/marketList' element={<CurrencyManagement />} />
            <Route path='/agentManagement' element={<AgentManagement />} />
            <Route path='/userWallet' element={<UserWallet />} />
            <Route path='/userCoin' element={<UserCoin />} />
            <Route path='/onlineChat' element={<OnlineChat />} />
            <Route path='/adminManagement' element={<AdminManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
