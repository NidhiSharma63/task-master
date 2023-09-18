import { useCallback, useEffect, useState } from "react";
import { usePostColumnQuery, useUpdateColumnName, useGetColumnQuery } from "src/hook/useColumnQuery";
import { projectDataInStore } from "src/redux/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackDropLoaderContext } from "src/context/BackDropLoaderContext";
import { isBackDropLoaderDisplayed, isBackDropLoaderDisplayedForColumns } from "src/redux/boolean/booleanSlice";

/**
 * This function is invoked at two places one 1. Board.jsx (where user can add the column)
 * 2. Task box container (where user can edit the column name)
 */

const useAddColumn = ({ setIsAddColBtnClicked, isAddColBtnClicked, isColumnRename, colId, prevColumnName }) => {
  const [columnValue, setColumnValue] = useState("");
  const { mutate } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);
  const { mutate: updateColsname } = useUpdateColumnName();
  const { isFetching } = useGetColumnQuery();

  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  const handlecolumnValue = useCallback((event) => {
    setColumnValue(event.target.value);
  }, []);

  /**
   * useEffect that fire when user tries to rename columns value to set the columnValue to previous column name
   */

  useEffect(() => {
    if (isColumnRename) {
      setColumnValue(prevColumnName);
    }
  }, [isColumnRename, prevColumnName]);

  /**
   * When user added and updated the column then run this effect after the data is fetched
   */
  useEffect(() => {
    if (!isFetching) {
      setValue("");
      setColumnValue("");
      setIsAddColBtnClicked(false);
    }
  }, [isFetching, setValue, setIsAddColBtnClicked]);

  /**
   * fire on when user try to submit the column
   */
  const handleColsSubmit = () => {
    if (columnValue?.length === 0) {
      return setIsAddColBtnClicked(false);
    }
    /**
     * add column
     */
    if (!isColumnRename) {
      mutate({
        name: columnValue,
        projectName: active_project,
      });
      setValue("Column creating");
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    }
    /**
     * update cols value
     */

    if (isColumnRename) {
      /**
       * if column value is same as previous one then do nothing
       */
      if (columnValue?.trim() === prevColumnName?.trim()) {
        setIsAddColBtnClicked(false);
        return;
      }
      updateColsname({
        name: columnValue,
        _id: colId,
        previousColName: prevColumnName,
      });
      setValue("Column updating");
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    }
  };

  /**
   * when user click on add section button then text area should appear after that if user does not add anything and
   * click out the textarea then remove the text area
   */

  useEffect(() => {
    const removeTextArea = (event) => {
      if (
        event.target.tagName !== "TEXTAREA" &&
        event.target.tagName !== "BUTTON" &&
        columnValue?.trim()?.length === 0 &&
        isAddColBtnClicked
      ) {
        setIsAddColBtnClicked(false);
      }
    };

    window.addEventListener("click", removeTextArea);
    return () => {
      window.removeEventListener("click", removeTextArea);
    };
  }, [columnValue, setIsAddColBtnClicked, isAddColBtnClicked]);

  return {
    columnValue,
    handlecolumnValue,
    handleColsSubmit,
  };
};

export default useAddColumn;
