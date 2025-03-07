import { Box, Grid } from "@mui/material";
import React from "react";
import DataRibbon from "./DataRibbon/DataRibbon";
import TransactionPerDay from "./TransactionPerDay/TransactionPerDay";
import TransactionBottomRow from "./TransactionBottomRow/TransactionBottomRow";
import "./Dashboad.css"; 

function Dashboad() {
  return (
    <Box className="parent-container">
      <Grid container gap={3} margin-top={10} justifyContent="center" alignItems="center" direction="row">
        <DataRibbon />
        <TransactionPerDay />
        <TransactionBottomRow />
      </Grid>
    </Box>
    
  );
}
export default Dashboad;
// import { useAppContext } from "AppContext";
// import React from "react";

// export default function H() {
//   const {
//     openExpenseWindowObject: { openExpenseWindow, setOpenExpenseWindow },
//     expenseNameObject: { expenseName, setExpenseName },
//     amountObject: { amount, setAmount },
//     allExpenses: { expenses, setExpenses },
//   } = useAppContext();

//   const handleSubmit = () => {
//     if (!expenseName || !amount) {
//       alert("Fill all fields");
//       return;
//     }
//     const newExpense = { id: Date.now(), expenseName, amount };
//     setExpenses([...expenses, newExpense]);
//     setExpenseName("");
//     setAmount("");
//     setOpenExpenseWindow(false);
//   };

//     return (
//       <>
//         {openExpenseWindow && (
//           <div className="expense-card">
//             <input
//               className="input-box"
//               placeholder="Expense Name"
//               value={expenseName}
//               onChange={(e) => setExpenseName(e.target.value)}
//             />
//             <input
//               className="input-box"
//               placeholder="Amount ₹"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <button onClick={handleSubmit}>Submit ✅</button>
//             <button onClick={() => setOpenExpenseWindow(false)}>Cancel ❌</button>
//           </div>
//         )}
//       </>
//     );
// }


