import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Transaction {
  type: "Income" | "Expense";
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void;
  categories: { name: string; type: "Income" | "Expense" }[];
  transaction?: Transaction | null;
}

const AddTransactionModel: React.FC<Props> = ({
  open,
  onClose,
  onAddTransaction,
  categories,
  transaction,
}) => {
  const [type, setType] = useState<Transaction["type"]>(transaction?.type || "Expense");
  const [category, setCategory] = useState(transaction?.category || "");
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "");
  const [description, setDescription] = useState(transaction?.description || "");
  const [date, setDate] = useState<Date | null>(
    transaction ? new Date(transaction.date) : new Date()
  );

  const handleTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    value: "Expense" | "Income" | null
  ) => {
    if (value) {
      setType(value);
      setCategory(""); // reset category if type changes
    }
  };

  const handleSubmit = () => {
    if (!category || !amount || !description || !date) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }

    onAddTransaction({
      type,
      category,
      amount: parsedAmount,
      description,
      date: date.toISOString().split("T")[0],
    });

    setCategory("");
    setAmount("");
    setDescription("");
    setDate(new Date());
    onClose();
  };

  // Filter categories based on selected type
  const filteredCategories = categories.filter((cat) => cat.type === type);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>

      <DialogContent>
        {/* Toggle Buttons */}
        <div className="flex justify-center mt-2 mb-4">
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleTypeChange}
            className="bg-gray-100 shadow-md rounded-md"
          >
            <ToggleButton value="Expense" className="px-6 py-2 font-semibold">
              Expense
            </ToggleButton>
            <ToggleButton value="Income" className="px-6 py-2 font-semibold">
              Income
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Category *"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {filteredCategories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Amount *"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !category ||
            !amount ||
            isNaN(parseFloat(amount)) ||
            parseFloat(amount) <= 0 ||
            !description ||
            !date
          }
        >
          {transaction ? "Update Transaction" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionModel;
