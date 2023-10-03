import CheckList from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Table from '@editorjs/table';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CustomImage from 'src/components/userPages/components/CustomImageTool';
import { storage } from 'src/firebase/config';
import { v4 } from 'uuid';

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
          id: (groups) => groups.join('/embed/'),
        },
      },
    },
  },
  image: {
    class: CustomImage,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          return new Promise(async (resolve, reject) => {
            try {
              const mountainsRef = ref(
                storage,
                `/images/mountains.jpg-${v4()}`,
              );
              const snapshot = await uploadBytes(mountainsRef, file);
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
