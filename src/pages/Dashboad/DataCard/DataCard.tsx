import { InfoOutlined } from '@mui/icons-material';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import './DataCard.module.css';


export type DataCardProps = {
  title: string;
  value: string;
  description: string;
};

const DataCard = ({ title, value, description }: DataCardProps) => {
  return (
    <Paper className="styles.DataCard" elevation={3} sx={{ padding: 0.25, minWidth: 50 }}>
      {/* Wrap title and icon together using Flexbox */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontSize={"h6"} color={"lightslategrey"}>
          {title}
        </Typography>
        <Tooltip title={<Typography fontSize={12}>{`${description} which is ${value}`}</Typography>}>
          <IconButton size="small">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      {/* Display Value Below */}
      <Typography fontSize={"h4"} fontWeight="bold">{value}</Typography>
    </Paper>
  );
};

export default DataCard;
