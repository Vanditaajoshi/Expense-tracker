import Grid from "@mui/material/Grid";
import React from "react";
import Paper from "@mui/material/Paper";
import DataChart from "../../DataChart/DataChart";
import { doughnutChartData } from "../../../mockData";
import './TransactionBottomRow.css';


const TransactionBottomRow = () => {
  return (
    <Grid 
    container 
    className="bottomRow" 
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
<Grid>
         <Paper className={'styles.dataCard'}>
          <p>Transactions per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
         </Paper>
       </Grid>
       <Grid>
        <Paper className={'styles.dataCard'}>
          <p>Transactions per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
          </Grid>
         <Grid>
          <Paper className={'styles.dataCard'}>
          <p>Transactions per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={'styles.dataCard'}>
          <p>Transactions per user type</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TransactionBottomRow;