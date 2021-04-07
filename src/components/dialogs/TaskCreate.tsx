import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  makeStyles,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import NormalButton from 'components/themed/NormalButton';
import FormField from 'components/formik/FormField';
import DateFormField from 'components/formik/DateFormField';
import ExecutorsAutocomplete from 'components/fields/ExecutorsAutocomplete';
import MarkdownView from 'components/MarkdownView';
import MarkdownEditor from 'components/MarkdownEditor';
import { currentDate, parseDateString } from 'utils/date';
import { REQUIRED_FIELD } from 'constants/fields';
import { Executor } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';
import { createTask } from 'api/v1';

interface TaskCreateProps {
  onCreate: () => void;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

interface TaskCreateForm {
  title: string;
  description: string;
  executors: Executor[];
  markdown: string;
  dueDate: Date | null;
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
  switch: {
    justifySelf: 'start',
  },
}));

const today = currentDate();

const initialValues: TaskCreateForm = {
  title: '',
  description: '',
  executors: [],
  markdown: '',
  dueDate: null,
};

const validationSchema = yup.object().shape({
  title: yup.string().required(REQUIRED_FIELD),
  description: yup.string(),
  executors: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().uuid(),
        name: yup.string().nullable(),
        username: yup.string(),
      })
    )
    .min(1, 'Необходим минимум один исполнитель')
    .required(REQUIRED_FIELD),
  markdown: yup.string(),
  dueDate: yup
    .date()
    .transform(parseDateString)
    .min(today, 'Дата не может быть раньше сегоднешней')
    .nullable()
    .required(REQUIRED_FIELD),
});

const TaskCreate: React.FC<TaskCreateProps> = ({ onCreate, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (values: TaskCreateForm, helpers: FormikHelpers<TaskCreateForm>) => {
    helpers.setSubmitting(true);

    const data = {
      title: values.title,
      description: values.description,
      markdown: values.markdown,
      dueDate: values.dueDate!.toISOString(),
      executorIds: values.executors.map(executor => executor.id),
    };

    createTask(data)
      .then(response => {
        helpers.setSubmitting(false);

        if (response.details.ok) {
          handleClose();
          onCreate();
        }
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog maxWidth="md" open={open} fullWidth>
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
                <DateFormField
                  label="Срок исполнения"
                  name="dueDate"
                  minDate={today}
                  disabled={isSubmitting}
                  required
                />
                {preview ? (
                  <MarkdownView className={classes.editor} outlined>
                    {values.markdown}
                  </MarkdownView>
                ) : (
                  <MarkdownEditor
                    className={classes.editor}
                    value={values.markdown}
                    onChange={value => setFieldValue('markdown', value)}
                  />
                )}
                <FormControlLabel
                  className={classes.switch}
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
      </Dialog>
    </>
  );
};

export default TaskCreate;
