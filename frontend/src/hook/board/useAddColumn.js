import { useEffect, useState } from "react";
import { usePostColumnQuery } from "../useColumnQuery";
import { projectDataInStore } from "../../redux/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateColumnName } from "../useColumnQuery";
import { useBackDropLoaderContext } from "../../context/BackDropLoaderContext";
import { isBackDropLoaderDisplayed } from "../../redux/boolean/booleanSlice";

const useAddColumn = ({
  setIsAddColBtnClicked,
  isColsRename,
  colId,
  prevColName,
}) => {
  const [colsValue, setColsValue] = useState("");
  const {
    mutateAsync,
    isLoading: isColumnCreating,
    mutate,
  } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);
  const {
    mutate: updateColsname,

    isLoading: isColumnUpdating,
  } = useUpdateColumnName();
  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  const handleColsValue = (event) => {
    setColsValue(event.target.value);
  };

  /**
   * show back drop loader when column name is updating
   */
  useEffect(() => {
    if (isColumnUpdating) {
      setValue("Column updating");
      dispatch(isBackDropLoaderDisplayed(true));
    } else {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
      setColsValue("");
      setIsAddColBtnClicked(false);
    }
  }, [isColumnUpdating, setValue, dispatch, setIsAddColBtnClicked]);

  /**
   * show back drop loader when column name is adding
   */
  useEffect(() => {
    if (isColumnCreating) {
      console.log(isColumnCreating, "::::is column creating");
      setValue("Column creating");
      dispatch(isBackDropLoaderDisplayed(true));
    } else {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
      setColsValue("");
      setIsAddColBtnClicked(false);
    }
  }, [isColumnCreating, setValue, dispatch, setIsAddColBtnClicked]);

  useEffect(() => {
    if (colsValue?.trim()?.length <= 0) {
      // console.log("i run");
      return;
    }

    const handleColsSubmit = (event) => {
      /** click on outside of texarea */
      if (event.target.tagName !== "TEXTAREA") {
        /**
         * add column
         */
        if (colsValue?.trim()?.length > 0 && !isColsRename) {
          mutate({
            name: colsValue,
            projectName: active_project,
          });
        }
        /**
         * update cols value
         */
        if (isColsRename) {
          updateColsname({
            name: colsValue,
            _id: colId,
            previousColName: prevColName,
          });
        }
      }
    };

    window.addEventListener("click", handleColsSubmit);

    return () => {
      window.removeEventListener("click", handleColsSubmit);
    };
  }, [
    active_project,
    colsValue,
    mutateAsync,
    setIsAddColBtnClicked,
    colId,
    updateColsname,
    isColsRename,
    prevColName,
    mutate,
  ]);

  useEffect(() => {
    const removeTextArea = (event) => {
      if (event.target.tagName === "DIV" && colsValue?.trim()?.length === 0) {
        setIsAddColBtnClicked(false);
      }
    };

    window.addEventListener("click", removeTextArea);
    return () => {
      window.removeEventListener("click", removeTextArea);
    };
  }, []);

  return {
    colsValue,
    handleColsValue,
  };
};

export default useAddColumn;
