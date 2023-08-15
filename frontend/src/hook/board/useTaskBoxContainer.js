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
  const { mutate } = useAddTaskQuery();
  const [currentWorkingTestAreaIndex, setCurrentWorkingTestAreaIndex] =
    useState(null);

  const isTaskAddedFromBottom = useRef(null);

  const handleAddTask = () => {
    setTextAreaValuesTop((prevValues) => ["", ...prevValues]);
    isTaskAddedFromBottom.current = false;
    dispatch(isTaskDisplayed(false));
  };

  const handleClickForAddingTaskFromBottom = () => {
    isTaskAddedFromBottom.current = true;
    setTextAreaValuesBottom((prevValues) => [...prevValues, ""]);
    dispatch(isTaskDisplayed(false));
  };

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

  const handleClickOnThreeDots = () => {};
  return {
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    textAreaValuesBottom,
    textAreaValuesTop,
  };
};

export default useTaskBoxContainer;
