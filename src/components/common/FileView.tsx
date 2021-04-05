import React, { useCallback, useMemo } from 'react';
import filesize from 'filesize';
import { Typography, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import FileButton from 'components/themed/FileButton';
import download from 'utils/download';
import { FileDescriptor } from 'types';

interface FileViewProps {
  descriptor: FileDescriptor;
  file?: Blob;
  removable?: boolean;
  removeItem: (imprint: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr max-content',
  },
  info: {
    width: '100%',
    gap: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    alignItems: 'center',
    overflow: 'hidden',
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const FileView: React.FC<FileViewProps> = ({ descriptor, file, removable = false, removeItem }) => {
  const classes = useStyles();
  const humanityFileSize = useMemo(() => filesize(descriptor.size), [descriptor.size]);

  const handleRemove = useCallback(() => {
    removeItem(descriptor.id);
  }, [descriptor, removeItem]);

  const handleDownload = useCallback(() => {
    if (file !== undefined) {
      download(descriptor.name, file);
    }
  }, [descriptor, file]);

  return (
    <div className={classes.root}>
      <FileButton color="primary" onClick={handleDownload}>
        <div className={classes.info}>
          <Typography className={classes.name}>{descriptor.name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {humanityFileSize}
          </Typography>
        </div>
      </FileButton>
      {removable && (
        <FileButton color="primary" onClick={handleRemove}>
          <Delete />
        </FileButton>
      )}
    </div>
  );
};

export default FileView;
