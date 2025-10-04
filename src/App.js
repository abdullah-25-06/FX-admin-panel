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
<<<<<<< HEAD
import "./App.css";

// Create a wrapper component that has access to navigation
=======
import RechargeList from "./pages/RechargeList";
import ManualDW from "./pages/ManualDW";
import WithdrawalList from "./pages/WithdrawalList";
import OpenOrder from "./pages/OpenOrder";
import MemberWallet from "./pages/MemberWallet";
import DataReview from "./pages/DataReview";
import ProductList from "./pages/ProductList";

import "./App.css";

// Sidebar wrapper
>>>>>>> 4b828d7 (Initial commit to company repo)
function SidebarWithNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
  // Extract the active page from the URL path
=======
>>>>>>> 4b828d7 (Initial commit to company repo)
  const activePage = location.pathname.substring(1) || "dashboard";

  const setActivePage = (pageId) => {
    navigate(`/${pageId}`);
  };

<<<<<<< HEAD
  return <Sidebar activePage={activePage} setActivePage={setActivePage} />;
=======
  return (
    <Sidebar
      navigate={navigate}
      location={location}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
>>>>>>> 4b828d7 (Initial commit to company repo)
}

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className='app-container'>
        <SidebarWithNavigation />
        <div className='main-content'>
=======
      <div className='app-container flex'>
        <SidebarWithNavigation />
        <div className='main-content flex-1'>
>>>>>>> 4b828d7 (Initial commit to company repo)
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
<<<<<<< HEAD
=======
            <Route path='/rechargeList' element={<RechargeList />} />
            <Route path='/manualdw' element={<ManualDW />} />
            <Route path='/withdrawalList' element={<WithdrawalList />} />
            <Route path='/openOrder' element={<OpenOrder />} />
            <Route path='/memberWallet' element={<MemberWallet />} />
            <Route path='/dataReview' element={<DataReview />} />

            {/* ✅ Added Product List Route */}
            <Route path='/productList' element={<ProductList />} />
>>>>>>> 4b828d7 (Initial commit to company repo)
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
