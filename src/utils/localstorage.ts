export const saveExpenses = (expense: any) => {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
};
