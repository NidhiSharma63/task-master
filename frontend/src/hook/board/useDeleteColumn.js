import { useDeleteColumnName } from "../useColumnQuery";
import { useEffect } from "react";
import { useBackDropLoaderContext } from "../../context/BackDropLoaderContext";
import { useDispatch } from "react-redux";
import { isBackDropLoaderDisplayed } from "../../redux/boolean/booleanSlice";

const useDeleteColumn = ({ colId }) => {
  const { mutate: deleteCols, isLoading } = useDeleteColumnName();
  const { setValue } = useBackDropLoaderContext();
  const dispatch = useDispatch();

  /**
   * show back drop loader when column name is updating
   */
  useEffect(() => {
    if (isLoading) {
      setValue("Column deleting");
      dispatch(isBackDropLoaderDisplayed(true));
    } else {
      setValue("");
      dispatch(isBackDropLoaderDisplayed(false));
    }
  }, [isLoading, setValue, dispatch]);

  const deleteColumn = () => {
    deleteCols({ _id: colId });
  };

  return { deleteColumn };
};

export default useDeleteColumn;
