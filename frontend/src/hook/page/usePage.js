import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
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

  /**
   * only initial render set the inner html
   */
  useEffect(() => {
    const currentPage = data?.find((item) => item._id === id);
    const value =
      currentPage?.content.length > 0
        ? currentPage?.content
        : `<div>Starting typing...</div>`;
    setInnerHTML(value);
  }, [id, data]);

  /**
   * handle click on save button
   */
  const handleClick = useCallback(() => {
    mutate({
      _id: id,
      content: editorRef.current.getContent(),
    });
    dispatch(isBackDropLoaderDisplayed(true));
    dispatch(isBackDropLoaderDisplayedForPage(true));
  }, [mutate, dispatch, id]);

  return {
    handleClick,
    innerHTML,
    editorRef,
  };
};

export default usePage;
