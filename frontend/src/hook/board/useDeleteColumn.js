import { useDeleteColumnName } from "../useColumnQuery";

const useDeleteColumn = ({ colId }) => {
  const { mutate: deleteCols } = useDeleteColumnName();

  const deleteColumn = () => {
    deleteCols({ _id: colId });
  };

  return { deleteColumn };
};

export default useDeleteColumn;
