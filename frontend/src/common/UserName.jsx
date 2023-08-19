import { useSelector } from "react-redux";
import { usersDataInStore } from "../redux/auth/userSlice";
import { getUserFirstNameFirstLetter } from "../utils/getUserFirstName";
import { Avatar } from "@mui/material";
import colors from "../theme/variables";

const UserName = ({ handleOpen, formTaskComponent = false }) => {
  const { user_email } = useSelector(usersDataInStore);

  const userName = getUserFirstNameFirstLetter(user_email);

  return (
    <Avatar
      sx={{
        bgcolor: colors.bannerColor,
        cursor: "pointer",
        fontWeight: 600,
        width: `${formTaskComponent ? "30px" : "40px"}`,
        height: `${formTaskComponent ? "30px" : "40px"}`,
        color: colors.secondaryColor,
      }}
      variant="circle"
      onClick={handleOpen}
    >
      {userName}
    </Avatar>
  );
};

export default UserName;
