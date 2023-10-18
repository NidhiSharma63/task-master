import { Avatar } from '@mui/material';
import { useAppSelector } from 'src/hook/redux/hooks';
import { usersDataInStore } from 'src/redux/auth/userSlice';
import colors from 'src/theme/variables';
import { getUserFirstNameFirstLetter } from 'src/utils/getUserFirstName';

interface IUserNameProps {
  handleOpen?: () => void;
  formTaskComponent?: boolean;
}

const UserName = ({
  handleOpen,
  formTaskComponent = false,
}: IUserNameProps) => {
  const { user_email } = useAppSelector(usersDataInStore);

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
      variant="circular"
      onClick={handleOpen}
    >
      {userName}
    </Avatar>
  );
};

export default UserName;
