import { useEffect, useState } from "react";
import { usePostColumnQuery } from "../useColumnQuery";
import { projectDataInStore } from "../../redux/projects/projectSlice";
import { useSelector } from "react-redux";
import { useUpdateColumnName } from "../useColumnQuery";

const useAddColumn = ({ setIsAddColBtnClicked, isColsRename, colId }) => {
  const [colsValue, setColsValue] = useState("");
  const { mutateAsync } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);
  const { mutateAsync: updateColsname } = useUpdateColumnName();

  const handleColsValue = (event) => {
    setColsValue(event.target.value);
  };

  useEffect(() => {
    if (colsValue?.trim()?.length <= 0 && !isColsRename) return;

    const handleColsSubmit = (event) => {
      /** click on outside of texarea */
      if (event.target.tagName !== "TEXTAREA") {
        /**
         * add column
         */
        if (colsValue?.trim()?.length > 0 && !isColsRename) {
          mutateAsync({
            name: colsValue,
            projectName: active_project,
          })
            .then(() => {
              setColsValue("");
              setIsAddColBtnClicked(false);
            })
            .catch((_error) => {});
        }
        /**
         * update cols value
         */
        if (isColsRename) {
          updateColsname({ name: colsValue, _id: colId })
            .then(() => {
              setIsAddColBtnClicked(false);
              setColsValue("");
            })
            .catch((_error) => {});
        }
      }
    };

    window.addEventListener("click", handleColsSubmit);

    return () => {
      window.removeEventListener("click", handleColsSubmit);
    };
  }, [active_project, colsValue, mutateAsync, setIsAddColBtnClicked]);

  return {
    colsValue,
    handleColsValue,
  };
};

export default useAddColumn;
