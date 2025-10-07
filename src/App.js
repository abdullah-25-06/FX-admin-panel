import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Main Pages
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
import RechargeList from "./pages/RechargeList";
import ManualDW from "./pages/ManualDW";
import WithdrawalList from "./pages/WithdrawalList";
import OpenOrder from "./pages/OpenOrder";
import MemberWallet from "./pages/MemberWallet";
import DataReview from "./pages/DataReview";
import ProductList from "./pages/ProductList";
import RiskManagement from "./pages/RiskManagement";
import RecycleBin from "./pages/RecycleBin";
import BasicSettings from "./pages/BasicSettings";
import Carousel from "./pages/Carousel";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";

/* ✅ Helper ProtectedRoute component */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true" && localStorage.getItem("auth");
  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

/* ✅ Sidebar wrapper for navigation */
function SidebarWithNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname.substring(1) || "dashboard";

  const setActivePage = (pageId) => {
    navigate(`/${pageId}`);
  };

  return (
    <Sidebar
      navigate={navigate}
      location={location}
      activePage={activePage}
      setActivePage={setActivePage}
    />
  );
}

/* ✅ Main Layout for dashboard & other protected pages */
function MainLayout() {
  return (
    <div className='app-container flex'>
      <SidebarWithNavigation />
      <div className='main-content flex-1'>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' />} />
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
          <Route path='/rechargeList' element={<RechargeList />} />
          <Route path='/manualdw' element={<ManualDW />} />
          <Route path='/withdrawalList' element={<WithdrawalList />} />
          <Route path='/openOrder' element={<OpenOrder />} />
          <Route path='/memberWallet' element={<MemberWallet />} />
          <Route path='/dataReview' element={<DataReview />} />
          <Route path='/riskManagement' element={<RiskManagement />} />
          <Route path='/productList' element={<ProductList />} />
          <Route path='/recycleBin' element={<RecycleBin />} />
          <Route path='/basicSettings' element={<BasicSettings />} />
          <Route path='/carousel' element={<Carousel />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Default route: Redirect to login first */}
        <Route path='/' element={<Navigate to='/login' />} />

        {/* ✅ Public Routes - NO SIDEBAR */}
        <Route path='/login' element={<Login />} />
        {/* <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} /> */}

        {/* ✅ Protected Routes - Only if logged in */}
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
