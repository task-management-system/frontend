import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  makeStyles,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import WideDialog from 'components/themed/WideDialog';
import NormalButton from 'components/themed/NormalButton';
import FormField from 'components/formik/FormField';
import ExecutorsAutocomplete from 'components/fields/ExecutorsAutocomplete';
import MarkdownView from 'components/MarkdownView';
import MarkdownEditor from 'components/MarkdownEditor';
import { Executor } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';

interface TaskCreateProps {
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

interface TaskCreateForm {
  title: string;
  description: string;
  executors: Executor[];
  text: string;
  dueDate: string;
}

const useStyles = makeStyles(theme => ({
  content: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content',
  },
  editor: {
    height: 320,
  },
}));

const initialValues: TaskCreateForm = {
  title: '',
  description: '',
  executors: [],
  text: '',
  dueDate: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Ябляется обязательным'),
  description: yup.string(),
  executors: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string().nullable(),
        username: yup.string(),
      })
    )
    .min(1, 'Необходим минимум один исполнитель')
    .required('Является обязательным'),
  text: yup.string(),
  dueDate: yup.string(),
});

const TaskCreate: React.FC<TaskCreateProps> = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (values: TaskCreateForm, helpers: FormikHelpers<TaskCreateForm>) => {
    helpers.setSubmitting(true);
    console.log(values);
    helpers.setSubmitting(false);
  };

  return (
    <>
      {children({ handleOpen, handleClose })}
      <WideDialog open={open} onClose={handleClose}>
        <DialogTitle>Создание задачи</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          {({ values, setFieldValue, submitForm, isSubmitting }) => (
            <>
              <DialogContent className={classes.content}>
                <FormField label="Название" name="title" disabled={isSubmitting} required />
                <FormField label="Описание" name="description" disabled={isSubmitting} />
                <ExecutorsAutocomplete
                  label="Исполнители"
                  name="executors"
                  disabled={isSubmitting}
                  required
                />
                {preview ? (
                  <MarkdownView className={classes.editor}>{values.text}</MarkdownView>
                ) : (
                  <MarkdownEditor
                    className={classes.editor}
                    value={values.text}
                    onChange={value => setFieldValue('text', value)}
                  />
                )}
                <FormControlLabel
                  control={
                    <Switch
                      checked={preview}
                      onChange={() => setPreview(preview => !preview)}
                      name="preview"
                      color="primary"
                    />
                  }
                  label="Предпросмотр"
                />
              </DialogContent>
              <DialogActions>
                <NormalButton color="primary" disabled={isSubmitting} onClick={handleClose}>
                  Отмена
                </NormalButton>
                <NormalButton color="primary" disabled={isSubmitting} onClick={submitForm}>
                  Создать
                </NormalButton>
              </DialogActions>
            </>
          )}
        </Formik>
      </WideDialog>
    </>
  );
};

export default TaskCreate;
