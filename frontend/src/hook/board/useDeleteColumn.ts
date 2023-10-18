import React, { ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForColumns,
} from '../../redux/boolean/booleanSlice';
import { useDeleteColumnName } from '../useColumnQuery';

/**
 * interface
 */

interface IUseDeleteColumn {
  colId: string;
  setAnchorElForColumnIcons: React.Dispatch<
    React.SetStateAction<null | ReactNode>
  >;
}

const useDeleteColumn = ({
  colId,
  setAnchorElForColumnIcons,
}: IUseDeleteColumn) => {
  const { mutate: deleteCols } = useDeleteColumnName();

  const dispatch = useDispatch();

  const deleteColumn = useCallback(() => {
    deleteCols({ _id: colId });
    dispatch(isBackDropLoaderDisplayed(true));
    dispatch(isBackDropLoaderDisplayedForColumns(true));
    setAnchorElForColumnIcons(null);
  }, [dispatch, deleteCols, colId, setAnchorElForColumnIcons]);

  return { deleteColumn };
};

export default useDeleteColumn;
