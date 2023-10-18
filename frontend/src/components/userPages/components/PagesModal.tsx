import { ChangeEventHandler, useEffect, useState } from 'react';
import DialogComponent from 'src/common/DialogComponent';
import { usePagesContext } from 'src/context/PagesContextProvider';
import { useAppDispatch } from 'src/hook/redux/hooks';
import { usePostPage, useUpdatePage } from 'src/hook/usePagesQuery';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
  isDialogBoxOpen,
} from 'src/redux/boolean/booleanSlice';

const PagesModal = () => {
  const { pageData } = usePagesContext();
  const [value, setValue] = useState<string>('');
  const { mutate } = usePostPage();
  const { mutate: updatePage } = useUpdatePage();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pageData && pageData?.name) {
      setValue(pageData.name);
    } else {
      setValue('');
    }
  }, [pageData]);

  const handleSaveButtonClicked = (): void => {
    dispatch(isDialogBoxOpen(false));

    if (value?.trim()?.length === 0) {
      return;
    }
    if (pageData?.name) {
      updatePage({
        _id: pageData._id,
        name: value,
        content: pageData.content,
      });
    } else {
      mutate({
        name: value,
        content: '',
      });
    }
    dispatch(isBackDropLoaderDisplayedForPage(true));
    dispatch(isBackDropLoaderDisplayed(true));
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (
    event,
  ): void => {
    setValue(event.target.value);
  };

  return (
    <DialogComponent
      value={value}
      title={pageData?.name ? 'Edit your page' : 'Create your Page'}
      subTitle={'Enter page name'}
      handleChangeInput={handleChangeInput}
      handleSaveButtonClicked={handleSaveButtonClicked}
    />
  );
};

export default PagesModal;
