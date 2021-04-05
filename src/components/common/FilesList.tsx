import React from 'react';
import { Typography } from '@material-ui/core';
import FileView from './FileView';
import { noop } from 'utils';
import { FileDescriptor } from 'types';

interface FilesListProps {
  files: FileDescriptor[];
  removeItem?: (imprint: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, removeItem = noop }) => {
  const removable = removeItem !== noop;

  return (
    <>
      {files.length > 0 ? (
        files.map(file => (
          <FileView
            descriptor={file}
            file={file.data}
            removable={removable}
            removeItem={removeItem}
            key={file.id}
          />
        ))
      ) : (
        <Typography color="textSecondary" variant="body2">
          Нет файлов
        </Typography>
      )}
    </>
  );
};

export default FilesList;
