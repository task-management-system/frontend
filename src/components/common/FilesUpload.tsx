import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AddBox } from '@material-ui/icons';
import FileButton from 'components/themed/FileButton';
import FilesList from './FilesList';
import { ACCEPT_FILES, MAX_FILE_SIZE } from 'constants/files';
import { FileDescriptor, UUID } from 'types';

interface FilesUploadProps {
  className?: string;
  readOnly?: boolean;
  onChange?: (files: File[]) => void;
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

const FilesUpload: React.FC<FilesUploadProps> = ({ className, readOnly = false, onChange }) => {
  const [files, setFiles] = useState<FileDescriptor[]>([]);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getFiles(files));
    }
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeItem = useCallback((id: UUID) => {
    setFiles(files => files.filter(file => file.id !== id));
  }, []);

  const handleAdd = () => input.current?.click();

  const handleChange = () => {
    if (input.current?.files) {
      const collectedFiles: FileDescriptor[] = [];
      const currentFiles = new Set(files.map(file => file.id));

      for (let index = 0; index < input.current.files.length; index++) {
        const file = input.current.files.item(index);
        if (file !== null) {
          if (file.size <= MAX_FILE_SIZE) {
            const imprint = createImprint(file);

            if (!currentFiles.has(imprint)) {
              collectedFiles.push({
                id: imprint,
                name: file.name,
                size: file.size,
                data: file,
              });
            }
          }
        }
      }

      setFiles(files => [...files, ...collectedFiles]);

      input.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept={ACCEPT_FILES}
        onChange={handleChange}
        disabled={readOnly}
        multiple
        hidden
        ref={input}
      />
      <FileButton
        color="primary"
        startIcon={<AddBox />}
        disabled={readOnly}
        onClick={handleAdd}
        fullWidth
      >
        Добавить файлы
      </FileButton>
      <FilesList files={files} removeItem={!readOnly ? removeItem : undefined} />
    </div>
  );
};

export default FilesUpload;
