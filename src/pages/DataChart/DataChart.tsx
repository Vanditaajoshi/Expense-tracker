import React, { useEffect, useRef } from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";
import { darkOptions } from "./Themes";
import { months } from "../../helper/Util";
import './DataChart.css';
const DataChart: React.FC<ChartConfiguration> = (props) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Chart.register(...registerables); // Register only once on mount

    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        ...props,
        options: {
          ...darkOptions, // Ensure dark mode options are applied correctly
          ...options,
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, options]); // Include options in the dependency array

  return <canvas ref={chartRef} />;
};

export default DataChart;
