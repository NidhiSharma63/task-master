import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import usePage from 'src/hook/page/usePage';

const Markdown = () => {
  const editorRef = useRef(null);
  const {
    handleChange,
    openAccordianOnClick,
    handleListCreation,
    innerHTML,
    isAccordianOpen,
  } = usePage();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleClick = (content) => {
    console.log(innerHTML, 'content');
    // mutate({
    //   _id: id,
    //   content: editorRef.current.lastHtml,
    // });
    // dispatch(isBackDropLoaderDisplayed(true));
    // dispatch(isBackDropLoaderDisplayedForPage(true));
  };
  return (
    <Editor
      apiKey="your-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={innerHTML}
      onChange={handleChange}
      init={{
        content_css: 'dark',
        height: '100%',
        width: '100%',
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: rgb(18,18,18);color:white}
           .tox-toolbar { background-color: black; }
           .tox:not(.tox-tinymce-inline) .tox-editor-header{
            background-color: black;
           }`,
      }}
    />
  );
};

export default Markdown;
