import { Box, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { InsightsLogo } from 'src/assets/assets';
import InsightsCharts from 'src/components/insights/InsightsCharts';
import colors from 'src/theme/variables';
import InsightsFilter from './components/InsightsFilter';

const Insights = () => {
  const [activeStatus, setActiveStatue] = useState<string>('All');
  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
        mt: '.2rem',
        height: '100%',
        mr: '29rem',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
            <img src={InsightsLogo} alt="logo" style={{ width: '50px' }} />
            <Typography
              variant="h5"
              sx={{
                color: colors.textColor,
                fontWeight: 'medium',
              }}
            >
              Insights
            </Typography>
          </Box>
          <InsightsFilter
            setActiveStatue={setActiveStatue}
            activeStatus={activeStatus}
          />
        </Box>
        <Divider sx={{ borderColor: colors.lineColor }} />
      </Box>
      <InsightsCharts status={activeStatus} />
    </Box>
  );
};

export default Insights;
