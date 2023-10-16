// @ts-ignore
import CheckList from '@editorjs/checklist';
// @ts-ignore

import Code from '@editorjs/code';
// @ts-ignore

import Delimiter from '@editorjs/delimiter';

// @ts-ignore
import Embed from '@editorjs/embed';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import Table from '@editorjs/table';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CustomImage from 'src/components/userPages/components/CustomImageTool';
import { storage } from 'src/firebase/config';
import { v4 } from 'uuid';

/**
 * inteface
 */
interface IUploadResult {
  success: number;
  file: {
    url: string;
    // Add other necessary properties for the file data
  };
}

interface IFile {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

const convertToBlob = (file: IFile): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Call readAsArrayBuffer to start the file reading process
    // reader.readAsArrayBuffer(file as unknown as Blob);

    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], {
        type: file.type,
      });
      resolve(blob);
    };
    reader.onerror = (error) => {
      console.log('error occurred', error);
      reject(error);
    };
    reader.readAsArrayBuffer(file as unknown as Blob);
  });
};

export const tools = {
  CheckList: CheckList,
  code: Code,
  Delimiter: Delimiter,
  inlineCode: InlineCode,
  marker: Marker,
  header: {
    class: Header,
    inlineToolbar: ['link'],
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  // embed: Embed,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
        twitter: true,
        Facebook: true,
        Instagram: true,
        codepen: {
          regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
          embedUrl:
            'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
          html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          id: (groups: string[]) => groups.join('/embed/'),
        },
      },
    },
  },
  image: {
    class: CustomImage,
    config: {
      uploader: {
        uploadByFile: async (file: IFile) => {
          return new Promise<IUploadResult>(async (resolve, reject) => {
            try {
              const reader = await convertToBlob(file);
              const imageRef = ref(storage, `/images/${file.name}-${v4()}`);
              const snapshot = await uploadBytes(imageRef, reader);
              const url = await getDownloadURL(snapshot.ref);

              // Resolve with the image data required by EditorJS
              resolve({
                success: 1,
                file: {
                  url,
                },
              });
            } catch (error) {
              reject(error);
            }
          });
        },
      },
    },
  },
};
