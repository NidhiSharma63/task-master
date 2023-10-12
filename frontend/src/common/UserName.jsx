import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { usersDataInStore } from 'src/redux/auth/userSlice';
import colors from 'src/theme/variables';
import { getUserFirstNameFirstLetter } from 'src/utils/getUserFirstName';

const UserName = ({ handleOpen, formTaskComponent = false }) => {
  const { user_email } = useSelector(usersDataInStore);

  const userName = getUserFirstNameFirstLetter(user_email);

  return (
    <Avatar
      sx={{
        bgcolor: colors.userLogoColor,
        cursor: 'pointer',
        fontWeight: 600,
        width: `${formTaskComponent ? '30px' : '30px'}`,
        height: `${formTaskComponent ? '30px' : '30px'}`,
        color: 'white',
        fontSize: '.8rem',
      }}
      variant="circle"
      onClick={handleOpen}
    >
      {userName}
    </Avatar>
  );
};

export default UserName;
