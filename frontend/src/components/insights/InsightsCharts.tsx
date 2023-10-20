import { Box, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FadeLoader } from 'react-spinners';
import useInsight from 'src/hook/insights/useInsight';
import colors from 'src/theme/variables';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IInsightsCharts {
  status: string;
}
const InsightsCharts = ({ status }: IInsightsCharts) => {
  const { data, isLoading, chartData, allProjects, allTask, bgColors } =
    useInsight({
      status,
    });

  if (data?.data?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          mr: 5,
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h4"> You have no task!</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mr: 5,
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <FadeLoader color="#3E3A3A" />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { xs: '18rem', md: '25rem' },
          height: { md: '100%', xs: 'auto' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Doughnut data={chartData} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'relative',
          padding: '2rem',
          borderRadius: '.3rem',
          backgroundColor: colors.offWhite,
          boxShadow: '0px 0px 10px 0px #0000001c',
          height: { md: 'calc(100vh - 200px)', xs: '300px' },
          // overflowY: "scroll",
          maxWidth: '40rem',
        }}
      >
        <Typography variant="h6">Project List - Task contains</Typography>
        {/* </Box> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${colors.scrollbarColor}`,
              borderRadius: '4px',
            },
          }}
        >
          {allProjects?.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '.7rem',
                  // border: "1px solid red",
                  minWidth: '15rem',
                  padding: '0.5rem',
                  borderRadius: '.3rem',
                  border: `1px solid ${colors.lineColor}`,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: bgColors[i],
                    width: '2rem',
                    height: '1.7rem',
                    borderRadius: '50%',
                    boxShadow: '0px 0px 32px -4px #00000054',
                  }}
                ></Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    padding: '0rem .4rem',
                  }}
                >
                  <Typography>
                    {item.length > 20 ? `${item.substring(0, 20)}...` : item}
                  </Typography>
                  {/* <Typography>{capitalizeFirstLetter(item)}</Typography> */}
                  <Typography>{allTask[i]}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default InsightsCharts;
