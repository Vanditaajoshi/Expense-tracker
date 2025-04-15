import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function SingleExpense() {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-100 shadow-md
       flex gap-3 items-center justify-between p-5 py-6">
       
      {/* Icon Section */}
      <div className="bg-purple-200 rounded-lg p-2 flex items-center justify-center">
        <HomeOutlinedIcon className="text-purple-600" sx={{ fontSize: "27px" }} />
      </div>

      {/* Expense Details */}
      <div className="flex-1 flex flex-col">
        <span className="font-bold">Expense Name</span>
        <span className="text-slate-400 text-[13px] p-[2px]">Wallet</span>
      </div>

      {/* Amount & Actions */}
      <div className="flex gap-5 font-bold items-center">
        <span className="text-[16px]">-88₹</span>
        <div className="flex gap-2 items-center">
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer
            bg-purple-200 hover:bg-slate-300">
            <EditOutlinedIcon sx={{ fontSize: "17px" }} className="text-purple-600" />
          </div>
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer
            bg-slate-200 hover:bg-slate-300">
            <DeleteOutlinedIcon sx={{ fontSize: "17px" }} className="text-slate-600" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default SingleExpense;
