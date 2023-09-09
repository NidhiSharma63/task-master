import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DialogComponent from "src/common/DialogComponent";
import { isDialogBoxOpen } from "src/redux/boolean/booleanSlice";
import { usePostPage } from "src/hook/usePagesQuery";

const PagesModal = () => {
  const [value, setValue] = useState();
  const { mutate } = usePostPage();

  const dispatch = useDispatch();

  const handleSaveButtonClicked = () => {
    dispatch(isDialogBoxOpen(false));
    mutate({
      name: value,
      content: "",
    });
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <DialogComponent
      value={value}
      title={"Creat your Page"}
      subTitle={"Enter page name"}
      handleChangeInput={handleChangeInput}
      handleSaveButtonClicked={handleSaveButtonClicked}
    />
  );
};

export default PagesModal;
