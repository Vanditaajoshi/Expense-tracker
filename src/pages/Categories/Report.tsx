import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { useAppContext } from "AppContext";

const Report = () => {
  const { expenses } = useAppContext().allExpenses;
  const { income, setIncome } = useAppContext().incomeObject;

  const downloadPDF = () => {
    if (expenses.length === 0) {
      toast.error("No Expenses Available ❌");
      return;
    }

    const doc = new jsPDF();
    doc.text("Expense Report 🧾", 20, 10);

    const tableColumn = ["Expense Name", "Amount (₹)"];
    const tableRows = expenses.map((e: any) => [e.expenseName, `₹${e.amount}`]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("Expense_Report.pdf");
    toast.success("PDF Downloaded Successfully 🧾🔥");
  };

  return (
    <>
      <div className="w-[39%] items-center justify-center max-lg:w-[97%] bg-white shadow-lg rounded-2xl p-12 px-[52px] max-sm:px-[30px] relative z-50">
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            onClick={downloadPDF}
          >
            Download PDF 🧾
          </button>
        </div>

        {/* Last 5 New Expenses Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4 text-center text-purple-600">
            Last 5 New Expenses 
          </h2>
          {expenses.slice(-5).reverse().map((e: any, index: number) => (
            <div
              key={index}
              className="border-b py-2 flex justify-between text-gray-700"
            >
              <span>{e.expenseName}</span>
              <span className="font-bold text-purple-700">₹{e.amount}</span>
              {expenses.length === 0 && (
              <p className="text-center text-gray-500">No Expenses Found 😓</p>
              )}

            </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Report;
