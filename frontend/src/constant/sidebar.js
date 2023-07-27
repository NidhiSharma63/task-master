import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";

import AddIcon from "@mui/icons-material/Add";

export const UPPER_SIDE_BAR = [
  {
    Home: <HomeIcon />,
  },
];

export const INSIGHTS = [
  {
    Insights: <InsightsIcon />,
    Todo: <HourglassBottomIcon />,
    "In progress": <HourglassBottomIcon />,
    "In priority": <PriorityHighIcon />,
    Done: <HourglassFullIcon />,
  },
];

export const LOWER_PART = [{ Projects: <AddIcon /> }];
