import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import FilesList from './FilesList';
import { addNotification } from 'redux/actions/notifications';
import { FileDescriptor, UUID } from 'types';
import { createNotification } from 'utils/notification';
import UploadControl from './UploadControl';

interface FilesUploadProps {
  className?: string;
  readOnly?: boolean;
  onAdd?: (files: File[]) => void;
  onRemove?: (id: UUID, remote: boolean) => void;
}

const createImprint = (file: File) => {
  const payload = [file.name, file.type, file.size, file.lastModified];

  return payload.map(entry => btoa(encodeURIComponent(entry))).join('_');
};

const getFiles = (descriptors: FileDescriptor[]) =>
  descriptors.reduce<File[]>((files, descriptor) => {
    if (descriptor.data !== undefined && descriptor.data !== null) {
      files.push(descriptor.data);
    }

    return files;
  }, []);

const FilesUpload: React.FC<FilesUploadProps & ConnectedFilesUploadProps> = ({
  className,
  readOnly = false,
  onAdd,
  onRemove,
  addNotification,
}) => {
  const [files, setFiles] = useState<FileDescriptor[]>([]);

  useEffect(() => {
    if (typeof onAdd === 'function') {
      onAdd(getFiles(files));
    }
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeItem = useCallback(
    (id: UUID) => {
      if (typeof onRemove === 'function') {
        onRemove(id, files.find(file => file.id === id)?.data === undefined);
      }

      setFiles(files => files.filter(file => file.id !== id));
    },
    [files, onRemove]
  );

  const handleChange = (addedFiles: File[]) => {
    const collectedFiles: FileDescriptor[] = [];
    const currentFiles = new Set(files.map(file => file.id));
    const warnings = [];

    for (const file of addedFiles) {
      const imprint = createImprint(file);

      if (!currentFiles.has(imprint)) {
        collectedFiles.push({
          id: imprint,
          name: file.name,
          size: file.size,
          data: file,
        });
      } else {
        warnings.push({
          name: file.name,
          cause: 'Файл уже добавлен в очередь',
        });
      }
    }

    if (warnings.length > 0) {
      addNotification(createNotification('warning', 'Не удалось добавить файл(-ы)', warnings));
    }
    setFiles(files => [...files, ...collectedFiles]);
  };

  return (
    <div className={className}>
      <UploadControl disabled={readOnly} onChange={handleChange} />
      <FilesList files={files} removeItem={!readOnly ? removeItem : undefined} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ addNotification }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type ConnectedFilesUploadProps = ConnectedProps<typeof connector>;

export default connector(FilesUpload);
