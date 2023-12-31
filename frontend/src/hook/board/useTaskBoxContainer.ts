import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IForTaskDisplaying,
  IUpdatedColumnItem,
} from 'src/common/Interface/Interface';
import {
  booleanDataInStore,
  isBoardDrawerOpen,
  isTaskDisplayed,
  showLoaderForTask,
} from '../../redux/boolean/booleanSlice';
import { projectDataInStore } from '../../redux/projects/projectSlice';
import { activeTask } from '../../redux/task/taskSlice';
import { useAddTaskQuery } from '../useTaskQuery';
/**
 * interface
 */

interface IUseTaskBoxContainer {
  data: IUpdatedColumnItem;
  name: string;
}
interface ITaskCard {
  item: IForTaskDisplaying;
  handleClickOnTask: (item: ITaskCard) => void;
}
const useTaskBoxContainer = ({ data, name }: IUseTaskBoxContainer) => {
  const dispatch = useDispatch();
  const [textAreaValuesTop, setTextAreaValuesTop] = useState<string[]>([]);
  const [textAreaValuesBottom, setTextAreaValuesBottom] = useState<string[]>(
    [],
  );
  const { active_project } = useSelector(projectDataInStore);
  const { is_task_displayed } = useSelector(booleanDataInStore);
  const [currentWorkingTestAreaIndex, setCurrentWorkingTestAreaIndex] =
    useState<number | null>(null);

  const [anchorElForColumnIcons, setAnchorElForColumnIcons] = useState<
    null | (EventTarget & SVGSVGElement)
  >(null);

  const [openColsIcons, setOpenColsIcons] = useState<boolean>(false);
  const isTaskAddedFromBottom = useRef<boolean | null>(null);
  const [isColumnRename, setisColumnRename] = useState<boolean>(false);
  const { show_loader_for_task } = useSelector(booleanDataInStore);
  const { mutate, isLoading } = useAddTaskQuery();

  /**
   * add task to top
   */
  const handleAddTask = useCallback((): void => {
    setTextAreaValuesTop((prevValues) => ['', ...prevValues]);
    isTaskAddedFromBottom.current = false;
    dispatch(isTaskDisplayed(false));
  }, [dispatch]);

  /*
   * add task from bottom
   */
  const handleClickForAddingTaskFromBottom = useCallback((): void => {
    isTaskAddedFromBottom.current = true;
    setTextAreaValuesBottom((prevValues) => [...prevValues, '']);
    dispatch(isTaskDisplayed(false));
  }, [dispatch]);

  /**
   * handle change task
   */
  const handleChange = useCallback(
    (event: ChangeEvent, index: number, newValue: string): void => {
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
    },
    [],
  );

  /**
   * handle saving task
   */

  const handleBlur = useCallback(
    (
      event: React.FocusEvent<HTMLTextAreaElement, Element>,
      index: number,
    ): void => {
      let valueOfTextField = '';
      let lastIndexOfCurrentTask = data.tasks?.[data.tasks.length - 1]?.index;

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
      dispatch(showLoaderForTask(true));
      setCurrentWorkingTestAreaIndex(index);
    },
    [
      active_project,
      mutate,
      name,
      dispatch,
      textAreaValuesBottom,
      textAreaValuesTop,
      data.tasks,
    ],
  );

  /**
   * remove textarea
   */
  useEffect(() => {
    if (is_task_displayed === true) {
      if (!isTaskAddedFromBottom.current) {
        setTextAreaValuesTop((prevValues) => {
          const copyValues = [...prevValues];
          if (currentWorkingTestAreaIndex !== null) {
            copyValues.splice(currentWorkingTestAreaIndex, 1);
          }
          return copyValues;
        });
      } else {
        setTextAreaValuesBottom((prevValues) => {
          const copyValues = [...prevValues];
          if (currentWorkingTestAreaIndex !== null) {
            copyValues.splice(currentWorkingTestAreaIndex, 1);
          }
          return copyValues;
        });
      }
      setCurrentWorkingTestAreaIndex(null);
    }
  }, [is_task_displayed, currentWorkingTestAreaIndex]);

  /**
   * for managing style of textarea
   */
  const handleInput = useCallback(
    (event: FormEvent<HTMLTextAreaElement>): void => {
      event.currentTarget.style.height = 'auto';
      event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
    },
    [],
  );

  const handleClickOnTask = useCallback(
    (task: IForTaskDisplaying): void => {
      dispatch(activeTask(task));
      dispatch(isBoardDrawerOpen(true));
    },
    [dispatch],
  );

  /**
   * handleClickOnThreeDots
   */
  // const handleClickOnThreeDots = (event: MouseEvent<SVGSVGElement>): void => {
  //   setAnchorElForColumnIcons(event.currentTarget);
  //   setOpenColsIcons(true);
  // };
  const handleClickOnThreeDots: MouseEventHandler<SVGSVGElement> = useCallback(
    (event): void => {
      // if (event.currentTarget instanceof HTMLElement) {
      setAnchorElForColumnIcons(event.currentTarget);
      setOpenColsIcons(true);
      // }
    },
    [],
  );

  /**
   * close three dots icons
   */
  const handleCloseOfColsIcons = useCallback((): void => {
    setAnchorElForColumnIcons(null);
    setOpenColsIcons(false);
  }, []);

  /**
   * hanlde column rename
   */
  const handleClickOnRename = useCallback((): void => {
    setisColumnRename(true);
    handleCloseOfColsIcons();
  }, [handleCloseOfColsIcons]);

  /**
   * saving cols name
   */

  return {
    setisColumnRename,
    handleClickOnTask,
    handleInput,
    handleBlur,
    handleChange,
    handleAddTask,
    handleClickForAddingTaskFromBottom,
    handleCloseOfColsIcons,
    handleClickOnThreeDots,
    handleClickOnRename,
    setAnchorElForColumnIcons,
    textAreaValuesBottom,
    textAreaValuesTop,
    anchorElForColumnIcons,
    openColsIcons,
    isColumnRename,
    isLoading,
    show_loader_for_task,
  };
};

export default useTaskBoxContainer;
