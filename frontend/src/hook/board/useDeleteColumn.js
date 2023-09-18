import { useDeleteColumnName } from "../useColumnQuery";
import { useEffect } from "react";
import { useBackDropLoaderContext } from "../../context/BackDropLoaderContext";
import { useDispatch } from "react-redux";
import { isBackDropLoaderDisplayed, isBackDropLoaderDisplayedForColumns } from "../../redux/boolean/booleanSlice";

const useDeleteColumn = ({ colId, setAnchorElForColumnIcons }) => {
  const { mutate: deleteCols } = useDeleteColumnName();
  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  const deleteColumn = () => {
    deleteCols({ _id: colId });
    setValue("Column deleting...");
    dispatch(isBackDropLoaderDisplayed(true));
    dispatch(isBackDropLoaderDisplayedForColumns(true));
    setAnchorElForColumnIcons(null);
  };

  return { deleteColumn };
};

export default useDeleteColumn;
