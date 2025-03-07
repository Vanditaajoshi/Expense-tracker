import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AppContextProps {
  openExpenseWindowObject: {
    openExpenseWindow: boolean;
    setOpenExpenseWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allExpenses: {
    expenses: any[];
    setExpenses: React.Dispatch<React.SetStateAction<any[]>>;
  };
  expenseNameObject: {
    expenseName: string;
    setExpenseName: React.Dispatch<React.SetStateAction<string>>;
  };
  amountObject: {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
  };
  incomeObject: {
    income: number;
    setIncome: React.Dispatch<React.SetStateAction<number>>;
  };
  darkModeObject: {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [openExpenseWindow, setOpenExpenseWindow] = useState(false);
  const [expenses, setExpenses] = useState<any[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [expenseName, setExpenseName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(() => {
    const storedIncome = localStorage.getItem("income");
    return storedIncome ? JSON.parse(storedIncome) : 0; // 🔥 Automatically fetch income
  });

  const incomeObject = {
    income,
    setIncome,
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.body.className = darkMode ? "dark" : "light";
  }, [expenses, darkMode]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income)); // 🔥 Auto Save Income in LocalStorage
  }, [income]);

  return (
    <AppContext.Provider
      value={{
        openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
        allExpenses: { expenses, setExpenses },
        expenseNameObject: { expenseName, setExpenseName },
        amountObject: { amount, setAmount },
        incomeObject: incomeObject,
        darkModeObject: { darkMode, setDarkMode },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
