import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogComponent from "src/common/DialogComponent";
import {
  isDialogBoxOpen,
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
} from "src/redux/boolean/booleanSlice";
import { usePostPage, useUpdatePage } from "src/hook/usePagesQuery";
import { usePagesContext } from "src/context/PagesContextProvider";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";

const PagesModal = () => {
  const { pageData } = usePagesContext();
  const [value, setValue] = useState("");
  const { setValue: backdropValue } = useBackDropLoaderContext();
  const { mutate } = usePostPage();
  const { mutate: updatePage } = useUpdatePage();

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageData?.name) {
      setValue(pageData.name);
    } else {
      setValue("");
    }
  }, [pageData]);

  const handleSaveButtonClicked = () => {
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
        content: "",
      });
    }
    dispatch(isBackDropLoaderDisplayedForPage(true));
    dispatch(isBackDropLoaderDisplayed(true));
    backdropValue("updating...");
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <DialogComponent
      value={value}
      title={pageData?.name ? "Edit your page" : "Create your Page"}
      subTitle={"Enter page name"}
      handleChangeInput={handleChangeInput}
      handleSaveButtonClicked={handleSaveButtonClicked}
    />
  );
};

export default PagesModal;
