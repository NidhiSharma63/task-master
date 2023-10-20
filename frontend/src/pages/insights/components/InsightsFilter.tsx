import { Box, MenuItem, SelectChangeEvent } from '@mui/material';
import { ReactNode, useCallback } from 'react';
import { useAppSelector } from 'src/hook/redux/hooks';
import { statusDataInStore } from 'src/redux/status/statusSlice';
import { MuiSelect } from './InsightStyled';

/**
 * interface
 */
interface IInsightsFilter {
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
  activeStatus: string;
}

const InsightsFilter = ({ setActiveStatus, activeStatus }: IInsightsFilter) => {
  const { total_status } = useAppSelector(statusDataInStore);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>, child: ReactNode) => {
      event.preventDefault();
      const targetValue = event.target.value as string;
      setActiveStatus(targetValue);
    },
    [setActiveStatus],
  );

  const valuesOfStatus = ['All', ...total_status];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: 1,
      }}
    >
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
