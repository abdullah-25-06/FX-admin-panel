import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <div className='header'>
      <div className='search-bar'>
        <Search size={18} />
        <input type='text' placeholder='Search...' />
      </div>

      <div className='header-right'>
        <div className='header-icon'>
          <Bell size={18} />
        </div>
        <div className='admin-dropdown'>
          <div className='avatar'>A</div>
          <span>admin</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;
