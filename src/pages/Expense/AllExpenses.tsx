import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "AppContext";
import { toast } from "react-toastify";

export default function AllExpenses() {
  const { expenses, setExpenses } = useAppContext().allExpenses;

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(storedExpenses);
  }, []);

  const { incomeObject } = useAppContext();
  const { income, setIncome } = incomeObject;


  const data = expenses.map((e) => ({
    name: e.expenseName,
    amount: parseFloat(e.amount),
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="number"
        placeholder="Enter Income Amount 💰"
        className="p-3 border rounded-md outline-none w-full text-center text-black"
        value={income}
        onChange={(e) => setIncome(parseFloat(e.target.value))}
      />

      {/* All Buttons in One Line 🔥🔥 */}
      <div className="flex gap-2 w-full">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={() => {
            toast.success("Income Added Successfully 💰🔥");
          }}
        >
          Add Income ✅
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={() => {
            setIncome(0);
            toast.success("Income Reset Successfully 🔄💰");
          }}
        >
          Reset Income 🔄
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
