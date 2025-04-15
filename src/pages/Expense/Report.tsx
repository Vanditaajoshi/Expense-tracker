import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { useAppContext } from "AppContext";
import Card from "@mui/material/Card";

const Report = () => {
  const { allExpenses, incomeObject } = useAppContext() || {};
  const expenses = allExpenses?.expenses || [];
  const income = incomeObject?.income || 0;

  const downloadPDF = () => {
    const savedCategories = localStorage.getItem("categories");
    const categories = savedCategories ? JSON.parse(savedCategories) : [];

    if (expenses.length === 0 && categories.length === 0) {
      toast.error("No Data Available ❌");
      return;
    }

    const doc = new jsPDF();
    doc.text("Expense & Category Report 🧾", 20, 10);
    let nextY = 20;

    // Expenses Table
    if (expenses.length > 0) {
      doc.text("Expenses:", 20, nextY);
      autoTable(doc, {
        startY: nextY + 5,
        head: [["Expense Name", "Amount (₹)"]],
        body: expenses.map((e: any) => [
          e.category || e.expenseName || "Unknown",
          `₹${e.amount}`,
        ]),
      });

      const lastTable = (doc as any).lastAutoTable;
      nextY = lastTable?.finalY ? lastTable.finalY + 10 : nextY + 20;
    }

    // Categories Table
    if (categories.length > 0) {
      doc.text("Categories:", 20, nextY);
      autoTable(doc, {
        startY: nextY + 5,
        head: [["Category Name", "Type", "Status", "Description"]],
        body: categories.map((c: any) => [
          c.name,
          c.type,
          c.status,
          c.description,
        ]),
      });
    }

    doc.save("Expense_Category_Report.pdf");
    toast.success("PDF Downloaded Successfully 🧾🔥");
  };

  return (
    <div className="poppins w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-600 p-6">
      <Card className="absolute left-4 w-full max-w-3xl shadow-lg rounded-2xl p-6 border border-gray-300 bg-white">
        <div className="flex justify-between items-center mb-0 ml-4 mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            onClick={downloadPDF}
          >
            Download PDF 🧾
          </button>
        </div>
      

      {/* Last 5 New Expenses Section */}
      <div className="mt-8 max-w-1x2">
        <h2 className="text-lg font-bold mb-4 text-center text-black">
          Last 5 New Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-center text-black">No Expenses Found 😓</p>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            {expenses
              .slice(-5)
              .reverse()
              .map((e: any, index: number) => (
                <div
                  key={index}
                  className="border-b last:border-none py-2 flex justify-between text-black"
                >
                  <span className="font-semibold">
                    {e.category || e.expenseName || "Unknown"}
                  </span>
                  <span
                    className={`font-bold ${
                      e.type === "Income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ₹{e.amount}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
      </Card>
    </div>
  );
};

export default Report;
