import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForColumns,
} from '../../redux/boolean/booleanSlice';
import { useDeleteColumnName } from '../useColumnQuery';

const useDeleteColumn = ({ colId, setAnchorElForColumnIcons }) => {
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
