import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

const usePage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(["pages"]) ?? {};

  const [content, setContent] = useState();
  const [innerHTML, setInnerHTML] = useState("");
  const editorRef = useRef();

  const handleContentChange = () => {
    setContent(editorRef.current);
  };

  const handleClick = () => {
    console.log(content, editorRef.current.lastHtml);
  };

  useEffect(() => {
    const currentPage = data?.map((item) => item._id === id);
    setInnerHTML(currentPage?.content ?? `<h1>Untitled</h1><br/><div>Starting typing</div>`);
  }, [id, data]);

  return {
    handleClick,
    handleContentChange,
    innerHTML,
    content,
    editorRef,
  };
};

export default usePage;
