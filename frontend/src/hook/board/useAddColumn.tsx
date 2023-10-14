import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetColumnQuery,
  usePostColumnQuery,
  useUpdateColumnName,
} from 'src/hook/useColumnQuery';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForColumns,
} from 'src/redux/boolean/booleanSlice';
import { projectDataInStore } from 'src/redux/projects/projectSlice';

interface IProps {
  isAddColBtnClicked?: boolean;
  setIsAddColBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isColumnRename?: boolean;
  colId?: string;
  prevColumnName?: string;
}

/**
 * This function is invoked at two places one 1. Board.jsx (where user can add the column)
 * 2. Task box container (where user can edit the column name)
 */

const useAddColumn = ({
  setIsAddColBtnClicked,
  isAddColBtnClicked,
  isColumnRename,
  colId,
  prevColumnName,
}: IProps) => {
  const [columnValue, setColumnValue] = useState('');
  const { mutate } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);
  const { mutate: updateColsname } = useUpdateColumnName();
  const { isFetching } = useGetColumnQuery();

  const dispatch = useDispatch();

  const handlecolumnValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setColumnValue(event.target.value);
    },
    [],
  );

  /**
   * useEffect that fire when user tries to rename columns value to set the columnValue to previous column name
   */

  useEffect(() => {
    if (isColumnRename && prevColumnName === 'string') {
      setColumnValue(prevColumnName);
    }
  }, [isColumnRename, prevColumnName]);

  /**
   * When user added and updated the column then run this effect after the data is fetched
   */
  useEffect(() => {
    if (!isFetching) {
      setColumnValue('');
      setIsAddColBtnClicked(false);
    }
  }, [isFetching, setIsAddColBtnClicked]);

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
    if (!isColumnRename && active_project) {
      mutate({
        name: columnValue,
        projectName: active_project,
      });
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    }
    /**
     * update cols value
     */

    if (isColumnRename && colId === 'sting' && prevColumnName === 'string') {
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
      dispatch(isBackDropLoaderDisplayed(true));
      dispatch(isBackDropLoaderDisplayedForColumns(true));
    }
  };

  /**
   * when user click on add section button then text area should appear after that if user does not add anything and
   * click out the textarea then remove the text area
   */

  useEffect(() => {
    /**
     * on window we can only add the mouse event that's why we have to define
     * it as a mouse event not the HTML element event
     */
    const removeTextArea = (event: MouseEvent) => {
      /**
       * if target is a HTML element then it can access the tag name
       * so firt check and only get the element as a HTML element
       */
      const target = event.target as HTMLElement;
      if (
        target.tagName !== 'TEXTAREA' &&
        target.tagName !== 'BUTTON' &&
        columnValue?.trim()?.length === 0 &&
        isAddColBtnClicked
      ) {
        setIsAddColBtnClicked(false);
      }
    };

    window.addEventListener('click', removeTextArea);
    return () => {
      window.removeEventListener('click', removeTextArea);
    };
  }, [columnValue, setIsAddColBtnClicked, isAddColBtnClicked]);

  return {
    columnValue,
    handlecolumnValue,
    handleColsSubmit,
  };
};

export default useAddColumn;
