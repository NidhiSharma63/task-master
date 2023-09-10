import { Box, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { statusDataInStore } from "src/redux/status/statusSlice";
import { MuiSelect } from "./InsightStyled";
import { useCallback } from "react";

const InsightsFilter = ({ setActiveStatue, activeStatus }) => {
  const { total_status } = useSelector(statusDataInStore);

  const handleChange = useCallback((event) => {
    event.preventDefault();
    setActiveStatue(event.target.value);
  }, []);

  const valuesOfStatus = ["All", ...total_status];

  return (
    <Box display="flex" alignItems="center">
      Status
      <MuiSelect onChange={handleChange} value={activeStatus}>
        {valuesOfStatus?.map((status) => {
          return (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </Box>
  );
};

export default InsightsFilter;
