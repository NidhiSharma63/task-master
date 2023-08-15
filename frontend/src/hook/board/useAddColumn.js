import { useEffect, useState } from "react";
import { usePostColumnQuery } from "../useColumnQuery";
import { projectDataInStore } from "../../redux/projects/projectSlice";
import { useSelector } from "react-redux";

const useAddColumn = ({ setIsAddColBtnClicked }) => {
  const [colsValue, setColsValue] = useState("");
  const { mutateAsync } = usePostColumnQuery();
  const { active_project } = useSelector(projectDataInStore);

  const handleColsValue = (event) => {
    setColsValue(event.target.value);
  };

  useEffect(() => {
    if (colsValue?.trim()?.length <= 0) return;
    const handleColsSubmit = (event) => {
      if (event.target.tagName !== "TEXTAREA") {
        if (colsValue?.trim()?.length > 0) {
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
