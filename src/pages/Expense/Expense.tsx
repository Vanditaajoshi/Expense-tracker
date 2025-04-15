import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import AddTransactionModel from "pages/Expense/AddTransactionModel";

interface ExpenseProps {
  categories: { name: string; type: "Income" | "Expense" }[];
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  type: "Income" | "Expense";
}

const Expense: React.FC<ExpenseProps> = ({ categories }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Expense | null>(null);

  // Load expenses from localStorage
  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem("expenses");
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        const validatedExpenses = parsedExpenses.map((exp: Expense, index: number) => ({
          ...exp,
          id: exp.id ?? index + 1, // Ensure every entry has an id
        }));
        setExpenses(validatedExpenses);
      }
    } catch (error) {
      console.error("Error parsing expenses:", error);
      setExpenses([]);
    }
  }, []);

  const handleAddTransaction = (transaction: Omit<Expense, "id">) => {
    if (editTransaction) {
      // Edit existing transaction
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editTransaction.id ? { ...editTransaction, ...transaction } : exp
      );
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setEditTransaction(null);
    } else {
      // Add new transaction
      const newTransaction: Expense = { ...transaction, id: Date.now() };
      const updatedExpenses = [...expenses, newTransaction];
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    }
    setAddTransactionModalOpen(false);
  };

  const handleEditTransaction = (transaction: Expense) => {
    setEditTransaction(transaction);
    setAddTransactionModalOpen(true);
  };

  const handleDeleteTransaction = (id: number) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const columns = [
    {
      field: "srNo",
      headerName: "SR.NO",
      flex: 1,
      renderCell: (params: any) => (
        <span>{params.row.srNo}</span> // Display the SR.NO from the row data
      ),
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params: any) => (
        <span>{params.row.type}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton className="text-blue-500 hover:text-blue-600" onClick={() => handleEditTransaction(params.row)}>
            <Edit />
          </IconButton>
          <IconButton className="text-red-500 hover:text-red-600" onClick={() => handleDeleteTransaction(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  // Add SR.NO to rows before passing to DataGrid
  const rowsWithSRNo = expenses.map((exp, index) => ({
    ...exp,
    srNo: index + 1, // Adding SR.NO here
  }));

  return (
      <div className="poppins w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-600 p-6">
        <Card className="w-full shadow-lg rounded-2xl p-6 border border-gray-300 bg-white">
          <div className="flex justify-between items-center mb-0 ml-4 mt-4 font-bold">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddTransactionModalOpen(true)}
            >
              Add Transaction
            </Button>
          </div>
    
          <CardContent>
            {rowsWithSRNo.length > 0 ? (
              <DataGrid 
                rows={rowsWithSRNo}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                autoHeight
              />
            ) : (
              <p className="text-gray-500 text-center mt-4">No transactions available</p>
            )}
          </CardContent>
        </Card>
    
        {/* Add Transaction Modal */}
        {isAddTransactionModalOpen && (
          <AddTransactionModel
            open={isAddTransactionModalOpen}
            onClose={() => {
              setAddTransactionModalOpen(false);
              setEditTransaction(null);
            }}
            onAddTransaction={handleAddTransaction}
            categories={categories}
            transaction={editTransaction}
          />
        )}
      </div>

    
  );
};

export default Expense;
