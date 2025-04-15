import React, { useState, useEffect, useRef } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAppContext } from "AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ExpenseWindowProps {
  className?: string;
}

export function ExpenseWindow({ className }: ExpenseWindowProps) {
  const {
    openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
    allExpenses: { expenses, setExpenses },
  } = useAppContext();

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("Home Wallet");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const walletOptions = {
    "Home Wallet": ["Electricity Bill", "Water Bill", "Gas Bill", "Rent"],
    "Savings Wallet": ["Emergency Fund", "Investment"],
    "Business Wallet": ["Client Payment", "Office Rent"],
  };

  const handleSubmit = () => {
    if (!expenseName || !amount) {
      toast.error("Please fill all fields 🔥");
      return;
    }

    const newExpense = {
      id: Date.now(),
      expenseName,
      amount,
      wallet: selectedWallet,
      subCategory: selectedSubOption,
    };

    setExpenses([...expenses, newExpense]);
    localStorage.setItem("expenses", JSON.stringify([...expenses, newExpense]));
    toast.success("Expense Added Successfully ✅");
    setOpenExpenseWindow(false);
    setExpenseName("");
    setAmount("");
  };

  return (
    <div className={`${openExpenseWindow ? "block" : "hidden"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md ${className}`}>
      <Header setOpenExpenseWindow={setOpenExpenseWindow} />
      <div>
        <ExpenseInput value={expenseName} setValue={setExpenseName} />
        <AmountInput value={amount} setValue={setAmount} />
        <WalletDropdown
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
          walletOptions={walletOptions}
        />
        <Footer onSubmit={handleSubmit} setOpenExpenseWindow={setOpenExpenseWindow} />
      </div>
    </div>
  );
}

function Header({ setOpenExpenseWindow }: { setOpenExpenseWindow: (value: boolean) => void }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-bold text-purple-700">Add Expense</h2>
      <CloseOutlinedIcon onClick={() => setOpenExpenseWindow(false)} className="cursor-pointer text-slate-400" />
    </div>
  );
}

function ExpenseInput({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-slate-600">Expense Name</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter Expense Name..." className="w-full text-black p-2 border rounded-md" />
    </div>
  );
}

function AmountInput({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-slate-600">Amount</label>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter Amount..." className="w-full text-black p-2 border rounded-md" />
    </div>
  );
}

function WalletDropdown({ selectedWallet, setSelectedWallet, selectedSubOption, setSelectedSubOption, walletOptions }: any) {
  return (
    <div>
      <label className="block text-sm text-slate-600">Wallet</label>
      <select value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)} className="w-full text-black p-2 border rounded-md">
        {Object.keys(walletOptions).map((wallet) => (
          <option key={wallet}>{wallet}</option>
        ))}
      </select>

      {walletOptions[selectedWallet]?.length > 0 && (
        <select value={selectedSubOption} onChange={(e) => setSelectedSubOption(e.target.value)} className="w-full text-black  p-2 border rounded-md mt-2">
          {walletOptions[selectedWallet].map((option: any) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function Footer({ onSubmit, setOpenExpenseWindow }: { onSubmit: () => void; setOpenExpenseWindow: (value: boolean) => void }) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <button onClick={() => setOpenExpenseWindow(false)} className="bg-slate-500 px-4 py-2 rounded-md text-sm">Cancel</button>
      <button onClick={onSubmit} className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">Submit</button>
    </div>
  );
}
