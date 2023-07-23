import React from "react";
import { useParams } from "react-router-dom";

const Board = () => {
  const { active_project } = useParams();
  return <div>Board Man {active_project}</div>;
};

export default Board;
