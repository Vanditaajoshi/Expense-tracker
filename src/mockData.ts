 // Ensure correct import

import { months } from "helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }), // ✅ Ensure correct function usage
  datasets: [
    {
      label: "Transactions",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const doughnutChartData = {
  labels: ["Green", "Orange", "Yellow"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["rgb(13, 204, 71)", "rgb(216, 146, 16)", "rgb(227, 218, 43)"],
      hoverOffset: 4,
    },
  ],
};
