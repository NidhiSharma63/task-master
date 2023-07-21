import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";

import AddIcon from "@mui/icons-material/Add";

export const UPPER_SIDE_BAR = [
  {
    Home: <HomeIcon />,
    Insights: <InsightsIcon />,
  },
];

export const INSIGHTS = [
  {
    "In progress": <HourglassBottomIcon />,
    "In priority": <PriorityHighIcon />,
    Completed: <HourglassFullIcon />,
  },
];

export const LOWER_PART = [{ Projects: <AddIcon /> }];