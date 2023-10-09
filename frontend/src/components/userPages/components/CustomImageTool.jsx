import Image from '@editorjs/image';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'src/firebase/config';

// extend the image tool to enhance the image removal lifecycle
class CustomImage extends Image {
  removed() {
    // access the image block's file data that deleted
    const data = this._data.file.url;

    // check if the data includes firebasestorage.googleapis
    if (data.includes('firebasestorage.googleapis')) {
      const storageRef = ref(storage, data);
      deleteObject(storageRef)
        .then(() => {})
        .catch(() => {
          console.log('something went wrong while deleting the file');
        });
    }
    // do something with the file data
    // i.e. delete from server or s3 bucket
  }
}

export default CustomImage;
