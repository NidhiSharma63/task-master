import { useEffect, useState } from "react";
import { usePostColumnQuery, useUpdateColumnName } from "src/hook/useColumnQuery";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { isBackDropLoaderDisplayed, isBackDropLoaderDisplayedForColumns } from "src/redux/boolean/booleanSlice";

/**
 * This function is invoked at two places one 1. Board.jsx (where user can add the column)
 * 2. Task box container (where user can edit the column name)
 */

const useAddColumn = ({ setIsAddColBtnClicked, isAddColBtnClicked, isColsRename, colId, prevColName }) => {
  const [colsValue, setColsValue] = useState("");
  const { isLoading: isColumnCreating, mutate } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);
  const { mutate: updateColsname, isLoading: isColumnUpdating } = useUpdateColumnName();

  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  const handleColsValue = (event) => {
    setColsValue(event.target.value);
  };

  /**
   * useEffect that fire when user tries to rename columns value
   */

  useEffect(() => {
    if (isColsRename) {
      setColsValue(prevColName);
    }
  }, [isColsRename, prevColName]);

  /**
   * show back drop loader when column name is updating
   */
  useEffect(() => {
    if (isColumnUpdating) {
      setValue("Column updating");
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    } else {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
      setColsValue("");
      setIsAddColBtnClicked(false);
      dispatch(isBackDropLoaderDisplayedForColumns(false));
    }
  }, [isColumnUpdating, setValue, dispatch, setIsAddColBtnClicked]);

  /**
   * show back drop loader when column name is adding
   */
  useEffect(() => {
    if (isColumnCreating) {
      setValue("Column creating");
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    } else {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
      setColsValue("");
      setIsAddColBtnClicked(false);
      dispatch(isBackDropLoaderDisplayedForColumns(false));
    }
  }, [isColumnCreating, setValue, dispatch, setIsAddColBtnClicked]);

  const handleColsSubmit = (event) => {
    if (colsValue?.length === 0) {
      return setIsAddColBtnClicked(false);
    }
    /**
     * add column
     */
    if (!isColsRename) {
      mutate({
        name: colsValue,
        projectName: active_project,
      });
    }
    /**
     * update cols value
     */

    if (isColsRename) {
      /**
       * if column value is same as previous one then do nothing
       */
      if (colsValue?.trim() === prevColName?.trim()) {
        setIsAddColBtnClicked(false);
        return;
      }
      updateColsname({
        name: colsValue,
        _id: colId,
        previousColName: prevColName,
      });
    }
  };

  useEffect(() => {
    const removeTextArea = (event) => {
      if (
        event.target.tagName !== "TEXTAREA" &&
        event.target.tagName !== "BUTTON" &&
        colsValue?.trim()?.length === 0 &&
        isAddColBtnClicked
      ) {
        setIsAddColBtnClicked(false);
      }
    };

    window.addEventListener("click", removeTextArea);
    return () => {
      window.removeEventListener("click", removeTextArea);
    };
  }, [colsValue, setIsAddColBtnClicked, isAddColBtnClicked]);

  return {
    colsValue,
    handleColsValue,
    handleColsSubmit,
  };
};

export default useAddColumn;
