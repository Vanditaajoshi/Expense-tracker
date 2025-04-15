import React, { useState, useEffect, useRef } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

function SubHeader() {
  return (
    <div className="mt-[90px] flex justify-between">
      <WalletOptions />
      <ClearAllBtn />
    </div>
  );
}
export default SubHeader;

function WalletOptions() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("Home Wallet");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const walletOptions = [
    { name: "Home Wallet", icon: <HomeOutlinedIcon className="text-purple-600" sx={{ fontSize: "27px" }} /> },
    { name: "Savings Wallet", icon: <SavingsOutlinedIcon className="text-purple-600" sx={{ fontSize: "27px" }} /> },
    { name: "Business Wallet", icon: <BusinessCenterOutlinedIcon className="text-purple-600" sx={{ fontSize: "27px" }} /> }
  ];

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (wallet: any) => {
    setSelectedWallet(wallet.name);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="border p-2 rounded-md flex items-center gap-2 cursor-pointer"
        onClick={handleDropdown}
      >
        {walletOptions.find(wallet => wallet.name === selectedWallet)?.icon}
        <span className="text-[15px] mt-1 text-slate-500">{selectedWallet}</span>
        <KeyboardArrowDownOutlinedIcon
          fontSize="small"
          className="mt-[4px] text-slate-500"
        />
      </div>

      {dropdownOpen && (
        <div className="absolute bg-white text-black shadow-md border rounded-md w-[180px] mt-2 z-10">
          {walletOptions.map((wallet, index) => (
            <div
              key={index}
              className="dropdown-item p-2 hover:bg-purple-50 text-sm cursor-pointer flex items-center gap-2"
              onClick={() => handleSelect(wallet)}
            >
              {wallet.icon}
              <span>{wallet.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClearAllBtn() {
  const handleClearAll = () => {
    localStorage.removeItem("expenses");
    alert("All expenses have been cleared!");
    window.location.reload();
  };

  return (
    <button
      onClick={handleClearAll}
      className="border transition-all text-slate-500 px-6 hover:bg-slate-50 flex text-sm rounded-md items-center justify-center"
    >
      <span>Clear All</span>
    </button>
  );
}
