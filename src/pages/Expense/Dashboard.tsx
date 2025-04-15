import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

interface Expense {
  category: string;
  amount: number;
  date: string;
  type: "Income" | "Expense";
}

interface CategoryData {
  name: string;
  value: number;
}

interface TrendData {
  date: string;
  total: number;
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Expense[]>([]);

  useEffect(() => {
    const storedExpenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(storedExpenses);
    calculateData(storedExpenses);
  }, []);

  const calculateData = (data: Expense[]) => {
    let income = 0;
    let expense = 0;
    const categoryMap: Record<string, number> = {};
    const trendMap: Record<string, number> = {};

    data.forEach(({ category, amount, date, type }) => {
      if (type === "Income") income += amount;
      else expense += amount;

      categoryMap[category] = (categoryMap[category] || 0) + amount;

      const day = date.split("T")[0];
      trendMap[day] = (trendMap[day] || 0) + amount;
    });

    const sortedRecent = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setTotalIncome(income);
    setTotalExpense(expense);
    setCategoryData(Object.entries(categoryMap).map(([name, value]) => ({ name, value })));
    setTrendData(Object.entries(trendMap).map(([date, total]) => ({ date, total })));
    setRecentTransactions(sortedRecent.slice(0, 5));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="poppins w-full min-h-[120vh] flex flex-col items-center bg-gradient-to-br from-green-600 p-4">
      <div className="max-w-5xl w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-slide-up">
            <h2 className="text-xl font-semibold text-gray-700">Income</h2>
            <p className="text-2xl font-bold text-green-600">₹{totalIncome}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-semibold text-gray-700">Expense</h2>
            <p className="text-2xl font-bold text-red-500">₹{totalExpense}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold text-gray-700">Balance</h2>
            <p className="text-2xl font-bold text-blue-500">₹{totalIncome - totalExpense}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Trend */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Expense Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-10 w-full max-w-4xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Recent Transactions</h3>
          <div className="grid gap-4">
            {recentTransactions.map((tx: Expense, index: number) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center animate-fade-scale hover-lift"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div>
                  <p className="font-medium text-gray-700">{tx.category}</p>
                  <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className={`font-semibold ${tx.type === "Income" ? "text-green-600" : "text-red-500"}`}>
                  ₹{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
