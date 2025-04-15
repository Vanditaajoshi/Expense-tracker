import React from "react";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useAppContext } from "AppContext";

export default function H() {
  const {
    openExpenseWindowObject: { setOpenExpenseWindow },
    expenseNameObject: { expenseName, setExpenseName },
    amountObject: { amount, setAmount },
    allExpenses: { expenses, setExpenses },
  } = useAppContext();

  // Function to Open Expense Wndow
  const handleOpenExpenseWindow = () => {
    setOpenExpenseWindow(true);
  };

  const handleSubmit = () => {
    if (!expenseName || !amount) {
      alert("Fill all fields ❌");
      return;
    }
    const newExpense = { id: Date.now(), expenseName, amount };

    // Add to Local Storage ✅
    setExpenses([...expenses, newExpense]);
    localStorage.setItem("expenses", JSON.stringify([...expenses, newExpense]));

    // Clear Fields After Submit ✅
    setExpenseName("");
    setAmount("");
    setOpenExpenseWindow(false);

    console.log("Expense Added Successfully ✅");
  };

  return (
    <nav className="flex justify-between items-center">
      <LogoSection />
      {/* <Searchbar /> */}
      <div className="flex gap-3">
        <Button
          onClick={handleOpenExpenseWindow}
          text=" New Expense"
          icon={<AddOutlinedIcon sx={{ fontSize: "20px" }} />}
        />
      </div>
    </nav>
  );
}

function LogoSection() {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-purple-600 flex items-center justify-center p-[11px] rounded-lg">
        <SavingsOutlinedIcon sx={{ fontSize: "25px" }} className="text-white" />
      </div>
      <div className="flex gap-1 text-[24px] max-sm:hidden">
        <span className="font-bold text-purple-600">Expense-</span>
        <span className="text-slate-600">Tracker</span>
      </div>
    </div>
  );
}

// function Searchbar() {
//   return (
//     <div className="h-[46px] bg-slate-50 flex items-center text-sm text-black rounded-md pl-3 gap-1 w-[300px] max-sm:w-[220px]">
//       <SearchOutlinedIcon className="text-slate-400" />
//       <input
//         type="text"
//         placeholder="Search an expense.."
//         aria-label="Search expenses"
//         className="bg-transparent outline-none w-full font-light"
//       />
//     </div>
//   );
// }

type ButtonProps = {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
};

function Button({ onClick, text, icon }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 px-4 py-3 flex gap-1 text-sm rounded-md text-black items-center justify-center pr-[18px] max-sm:pr-3 hover:bg-purple-700"
    >
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}
