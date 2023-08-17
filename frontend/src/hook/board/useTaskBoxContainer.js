import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddTaskQuery } from "../useTaskQuery";
import { projectDataInStore } from "../../redux/projects/projectSlice";
import { booleanDataInStore } from "../../redux/boolean/booleanSlice";
import { activeTask } from "../../redux/task/taskSlice";
import {
  isBoardDrawerOpen,
  isTaskDisplayed,
} from "../../redux/boolean/booleanSlice";

const useTaskBoxContainer = ({ data, name }) => {
  const dispatch = useDispatch();
  const [textAreaValuesTop, setTextAreaValuesTop] = useState([]);
  const [textAreaValuesBottom, setTextAreaValuesBottom] = useState([]);
  const { active_project } = useSelector(projectDataInStore);
  const { is_task_displayed } = useSelector(booleanDataInStore);
  const [currentWorkingTestAreaIndex, setCurrentWorkingTestAreaIndex] =
    useState(null);
  const [anchorElForColumnIcons, setAnchorElForColumnIcons] = useState(null);
  const [openColsIcons, setOpenColsIcons] = useState(false);
  const isTaskAddedFromBottom = useRef(null);
  const [isColsRename, setIsColsRename] = useState(false);

  const { mutate, isLoading } = useAddTaskQuery();

  /**
   * add task to top
   */
  const handleAddTask = () => {
    setTextAreaValuesTop((prevValues) => ["", ...prevValues]);
    isTaskAddedFromBottom.current = false;
    dispatch(isTaskDisplayed(false));
  };

  /*
   * add task from bottom
   */
  const handleClickForAddingTaskFromBottom = () => {
    isTaskAddedFromBottom.current = true;
    setTextAreaValuesBottom((prevValues) => [...prevValues, ""]);
    dispatch(isTaskDisplayed(false));
  };

  /**
   * handle change task
   */
  const handleChange = (event, index, newValue) => {
    if (!isTaskAddedFromBottom.current) {
      setTextAreaValuesTop((prevValues) => {
        const copyValues = [...prevValues];
        copyValues[index] = newValue;
        return copyValues;
      });
    } else {
      setTextAreaValuesBottom((prevValues) => {
        const copyValues = [...prevValues];
        copyValues[index] = newValue;
        return copyValues;
      });
    }
  };

  /**
   * handle saving task
   */

  const handleBlur = async (event, index) => {
    let valueOfTextField = "";
    let lastIndexOfCurrentTask = data?.[data.length - 1]?.index;

    if (!isTaskAddedFromBottom.current) {
      if (textAreaValuesTop[index].trim().length === 0) {
        setTextAreaValuesTop((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(index, 1);
          return copyValues;
        });
      } else {
        valueOfTextField = textAreaValuesTop[index].trim();
      }
    } else {
      if (textAreaValuesBottom[index].trim().length === 0) {
        setTextAreaValuesBottom((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(index, 1);
          return copyValues;
        });
      } else {
        valueOfTextField = textAreaValuesBottom[index].trim();
      }
    }

    if (!valueOfTextField) return;

    const payloadForTask = {
      task: valueOfTextField,
      status: name,
      projectName: active_project,
      index: isTaskAddedFromBottom.current ? lastIndexOfCurrentTask + 1 : 0,
    };

    mutate(payloadForTask);
    setCurrentWorkingTestAreaIndex(index);
  };

  /**
   * remove textarea
   */
  useEffect(() => {
    if (is_task_displayed === true) {
      if (!isTaskAddedFromBottom.current) {
        setTextAreaValuesTop((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(currentWorkingTestAreaIndex, 1);
          return copyValues;
        });
      } else {
        setTextAreaValuesBottom((prevValues) => {
          const copyValues = [...prevValues];
          copyValues.splice(currentWorkingTestAreaIndex, 1);
          return copyValues;
        });
      }
      setCurrentWorkingTestAreaIndex(null);
    }
  }, [is_task_displayed, currentWorkingTestAreaIndex]);

  /**
   * for managing style of textarea
   */
  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleClickOnTask = (task) => {
    dispatch(activeTask(task));
    dispatch(isBoardDrawerOpen(true));
  };

  /**
   * handleClickOnThreeDots
   */
  const handleClickOnThreeDots = (event) => {
    setAnchorElForColumnIcons(event.target);
    setOpenColsIcons(true);
  };

  /**
   * close three dots icons
   */
  const handleCloseOfColsIcons = () => {
    setAnchorElForColumnIcons(null);
    setOpenColsIcons(false);
  };

  /**
   * hanlde column rename
   */
  const handleClickOnRename = (colId) => {
    setIsColsRename(true);
    handleCloseOfColsIcons();
  };

  /**
   * saving cols name
   */

  return {
    setIsColsRename,
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    handleCloseOfColsIcons,
    handleClickOnThreeDots,
    handleClickOnRename,
    textAreaValuesBottom,
    textAreaValuesTop,
    anchorElForColumnIcons,
    openColsIcons,
    isColsRename,
    isLoading,
  };
};

export default useTaskBoxContainer;
