import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useUpdatePage } from 'src/hook/usePagesQuery';
import {
  isBackDropLoaderDisplayed,
  isBackDropLoaderDisplayedForPage,
} from 'src/redux/boolean/booleanSlice';

const usePage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['pages']) ?? {};
  const { mutate } = useUpdatePage();
  const dispatch = useDispatch();

  const [innerHTML, setInnerHTML] = useState('');
  const editorRef = useRef();
  const [isAccordianOpen, setIsAccordianOpen] = useState(false);

  /**
   * only initial render set the inner html
   */
  useEffect(() => {
    const currentPage = data?.find((item) => item._id === id);
    const value =
      currentPage?.content.length > 0
        ? currentPage?.content
        : `<h1>Untitled</h1><br/><div>Starting typing</div>`;
    setInnerHTML(value);
  }, [id, data]);

  /**
   * set editing true on changing text and update the innerHTML as well
   */

  const handleChange = (event) => {
    setInnerHTML(event.target.value);
  };

  /**
   * handle click on save button
   */
  const handleClick = () => {
    mutate({
      _id: id,
      content: editorRef.current.lastHtml,
    });
    dispatch(isBackDropLoaderDisplayed(true));
    dispatch(isBackDropLoaderDisplayedForPage(true));
  };

  /**
   * open accordian on click
   */

  const openAccordianOnClick = () => {
    setIsAccordianOpen((prev) => !prev);
  };

  const handleListCreation = (listType) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const ulElement = document.createElement(listType);
    const listItem = document.createElement('li');
    listItem.contentEditable = true; // Make the list item editable
    listItem.textContent = ''; // Initial text for the list item

    ulElement.appendChild(listItem);

    // Insert the unordered list element at the selection range
    range.insertNode(ulElement);
  };

  return {
    handleClick,
    handleChange,
    openAccordianOnClick,
    innerHTML,
    editorRef,
    isAccordianOpen,
    handleListCreation,
  };
};

export default usePage;
