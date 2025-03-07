import { useTheme } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import DataCard from "../DataCard/DataCard";
import "./DataRibbon.css";

const DataRibbon = () => {
  const theme = useTheme(); // Get theme from provider

  return (
    <div className="container" style={{ backgroundColor: theme.palette.background.default }}>
      <div className="DataRibbon">
        <Grid container gap={1} justifyContent="center">
          <Grid>
            <DataCard
              title={"Total Sales"}
              value={"462"}
              description={"The totals of all DataSoft products in the current financial year"}
            />
          </Grid>
          <Grid>
            <DataCard
              title={"Total Value"}
              value={"$25,732.53"}
              description={"The total sales of all DataSoft products in the current financial year"}
            />
          </Grid>
          <Grid>
            <DataCard
              title={"Avg. Order Value"}
              value={"$159.30"}
              description={"The average order value for all DataSoft products in the current financial year"}
            />
          </Grid>
          <Grid>
            <DataCard
              title={"Conversion rate"}
              value={"0.61%"}
              description={"How many pitches resulted in sales"}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DataRibbon;
