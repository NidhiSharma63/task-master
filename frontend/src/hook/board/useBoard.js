// import { statesOfTaskManager } from "../../constant/Misc";
// import {
//   useUpdateTaskQuery,
//   useUpdateTaskQueryWithStatus,
// } from "../../hook/useTaskQuery";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   booleanDataInStore,
//   isUpdatingTask,
// } from "../../redux/boolean/booleanSlice";
// import { isTaskDisplayed } from "../../redux/boolean/booleanSlice";
// import { useGetProjectQuery } from "../../hook/useProjectQuery";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useGetTaskAccordingToStatus } from "../../hook/useTaskQuery";
import { useGetColumnQuery } from "../useColumnQuery";
import { useDispatch } from "react-redux";
import { totalStatus } from "../../redux/status/statusSlice";

const useBoard = () => {
  const { data: columnData } = useGetColumnQuery();
  const { data } = useGetTaskAccordingToStatus();
  const [isAddColBtnClicked, setIsAddColBtnClicked] = useState(false);
  const dispatch = useDispatch();

  const columnDataWithTaskProperty = useMemo(() => {
    return columnData?.data?.map((item) => ({
      name: item.name,
      _id: item._id,
      tasks: [],
    }));
  }, [columnData]);

  useEffect(() => {
    const onlyColumns = columnData?.data?.map((item) => item.name);
    if (onlyColumns) {
      dispatch(totalStatus(onlyColumns));
    }
  }, [columnData, dispatch]);

  const finalState = useMemo(() => {
    return columnDataWithTaskProperty?.map((column) => ({
      ...column,
      tasks: data.flat().filter((task) => task?.status === column.name),
    }));
  }, [columnDataWithTaskProperty, data]);

  const handleClickOnAddColsBtn = () => {
    setIsAddColBtnClicked(true);
  };

  return {
    finalState,
    isAddColBtnClicked,
    handleClickOnAddColsBtn,
    setIsAddColBtnClicked,
  };
};

export default useBoard;
