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
export default convertToBlob;
