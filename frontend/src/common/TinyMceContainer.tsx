import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import sanitize from 'sanitize-html';
import TinyMceDescription from 'src/common/formik/TinyMceDescription';
import { useAppSelector } from 'src/hook/redux/hooks';
import { taskDataInStore } from 'src/redux/task/taskSlice';
import colors from 'src/theme/variables';

const TinyMceContainer = () => {
  const [toggleEditModeForDescription, setToggleEditModeForDescription] =
    useState<boolean>(false);
  const { active_task } = useAppSelector(taskDataInStore);

  /**
   * handleToggleModeForDescription
   */

  const handleToggleModeForDescription = (): void => {
    setToggleEditModeForDescription((prev) => !prev);
  };

  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }} variant="h6">
        Description
      </Typography>
      {toggleEditModeForDescription ||
      (active_task !== null && !active_task.description) ? (
        <TinyMceDescription
          name="description"
          label="Description"
          setToggleEditModeForDescription={setToggleEditModeForDescription}
        />
      ) : (
        <Box
          onClick={handleToggleModeForDescription}
          sx={{
            height: 'fit-content',
            width: '100%',
            border: '1px solid red',
            borderRadius: '.4rem',
            mt: 1,
            p: 2,
            paddingLeft: 3,
            color: colors.textColor,
            borderColor: (theme) => theme.palette.grey[500],
          }}
          dangerouslySetInnerHTML={{
            __html: sanitize(
              active_task !== null && active_task.description !== undefined
                ? active_task.description
                : '',
            ),
          }}
        />
      )}
    </>
  );
};

export default TinyMceContainer;
