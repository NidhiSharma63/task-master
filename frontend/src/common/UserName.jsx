import { useSelector } from "react-redux";
import { usersDataInStore } from "../redux/auth/userSlice";
import { getUserFirstNameFirstLetter } from "../utils/getUserFirstName";
import { Avatar } from "@mui/material";

const UserName = ({ handleOpen, formTaskComponent = false }) => {
  const { user_email } = useSelector(usersDataInStore);

  const userName = getUserFirstNameFirstLetter(user_email);

  return (
    <Avatar
      sx={{
        bgcolor: `${formTaskComponent ? "primary.main" : "secondary.main"}`,
        cursor: "pointer",
        fontWeight: 600,
        width: `${formTaskComponent ? "30px" : "40px"}`,
        height: `${formTaskComponent ? "30px" : "40px"}`,
        color: `${formTaskComponent ? "white" : "primary.main"}`,
      }}
      variant="circle"
      onClick={handleOpen}
    >
      {userName}
    </Avatar>
  );
};

export default UserName;
