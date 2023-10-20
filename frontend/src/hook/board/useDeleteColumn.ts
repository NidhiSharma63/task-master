import { Dispatch, SetStateAction, useCallback } from 'react';
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
  setAnchorElForColumnIcons: Dispatch<
    SetStateAction<null | (EventTarget & SVGSVGElement)>
  >;
}

const useDeleteColumn = ({
  colId,
  setAnchorElForColumnIcons,
}: IUseDeleteColumn) => {
  const { mutate: deleteCols } = useDeleteColumnName();

  const dispatch = useDispatch();

  const deleteColumn = useCallback((): void => {
    deleteCols({ _id: colId });
    dispatch(isBackDropLoaderDisplayed(true));
    dispatch(isBackDropLoaderDisplayedForColumns(true));
    setAnchorElForColumnIcons(null);
  }, [dispatch, deleteCols, colId, setAnchorElForColumnIcons]);

  return { deleteColumn };
};

export default useDeleteColumn;
