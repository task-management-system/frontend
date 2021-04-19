import React, { useCallback, useRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { AddBox } from '@material-ui/icons';
import FileButton from 'components/themed/FileButton';
import { addNotification } from 'redux/actions/notifications';
import { noop } from 'utils';
import { createNotification } from 'utils/notification';
import { ACCEPT_FILES, MAX_FILE_SIZE } from 'constants/files';

interface UploadControlProps {
  disabled?: boolean;
  onChange?: (files: File[]) => void;
}

const UploadControl: React.FC<UploadControlProps & ConnectedUploadControlProps> = ({
  disabled,
  onChange = noop,
  addNotification,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const handleAdd = useCallback(() => input.current?.click(), [input]);

  const handleChange = useCallback(() => {
    if (input.current?.files) {
      const files: File[] = [];
      const warnings = [];

      for (let index = 0; index < input.current.files.length; index++) {
        const file = input.current.files.item(index);
        if (file !== null) {
          if (file.size <= MAX_FILE_SIZE) {
            files.push(file);
          } else {
            warnings.push({
              name: file.name,
              cause: 'Файл является слишком большим для загрузки',
            });
          }
        }
      }

      if (warnings.length > 0) {
        addNotification(createNotification('warning', 'Не удалось добавить файл(-ы)', warnings));
      }
      onChange(files);

      input.current.value = '';
    }
  }, [input, onChange, addNotification]);

  return (
    <>
      <input
        type="file"
        accept={ACCEPT_FILES}
        onChange={handleChange}
        disabled={disabled}
        multiple
        hidden
        ref={input}
      />
      <FileButton
        color="primary"
        startIcon={<AddBox />}
        disabled={disabled}
        onClick={handleAdd}
        fullWidth
      >
        Добавить файлы
      </FileButton>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ addNotification }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type ConnectedUploadControlProps = ConnectedProps<typeof connector>;

export default connector(UploadControl);
