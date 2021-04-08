import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import ScrollableArea from 'components/common/ScrollableArea';
import Wrapper from 'components/common/Wrapper';
import FilesUpload from 'components/common/FilesUpload';
import FormField from 'components/formik/FormField';
import DateFormField from 'components/formik/DateFormField';
import ExecutorsAutocomplete from 'components/fields/ExecutorsAutocomplete';
import MarkdownEditor from 'components/MarkdownEditor';
import MarkdownView from 'components/MarkdownView';
import NormalButton from 'components/themed/NormalButton';
import { currentDate, parseDateString } from 'utils/date';
import { REQUIRED_FIELD } from 'constants/fields';
import { createTask, attachFilesToCreated } from 'api/v1';
import CreateTaskStage from 'enums/CreateTask';
import { Executor } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';

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
  files: File[];
}

const useStyles = makeStyles(theme => ({
  header: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center',
  },
  content: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content',
  },
  wrapper: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridAutoRows: 'max-content',
    },
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
  files: [],
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
    .typeError('Дата не является валидной')
    .min(today, 'Дата не может быть раньше сегоднешней')
    .nullable()
    .required(REQUIRED_FIELD),
});

const TaskCreate: React.FC<TaskCreateProps> = ({ onCreate, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<CreateTaskStage>(CreateTaskStage.None);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (open) {
      setStage(CreateTaskStage.None);
    }
  }, [open]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (values: TaskCreateForm, helpers: FormikHelpers<TaskCreateForm>) => {
    helpers.setSubmitting(true);

    const data = {
      title: values.title,
      description: values.description || null,
      markdown: values.markdown || null,
      dueDate: values.dueDate!.toISOString(),
      executorIds: values.executors.map(executor => executor.id),
    };

    createTask(data)
      .then(response => {
        if (response.details.ok) {
          setStage(CreateTaskStage.Prepared);
          if (values.files.length > 0) {
            attachFilesToCreated(response.data!.id, values.files)
              .then(() => {
                setStage(CreateTaskStage.Created);
                helpers.setSubmitting(false);

                handleClose();
                onCreate();
              })
              .catch(() => {
                helpers.setSubmitting(false);
              });
          } else {
            setStage(CreateTaskStage.Created);
            helpers.setSubmitting(false);

            handleClose();
            onCreate();
          }
        } else {
          helpers.setSubmitting(false);
        }
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog maxWidth="lg" open={open} fullWidth>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          {({ values, setFieldValue, submitForm, isSubmitting }) => (
            <>
              <div className={classes.header}>
                <DialogTitle>Создание задачи</DialogTitle>
                {isSubmitting && <CircularProgress size={24} />}
              </div>
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
                <div className={classes.wrapper}>
                  {preview ? (
                    <MarkdownView className={classes.editor} outlined>
                      {values.markdown}
                    </MarkdownView>
                  ) : (
                    <MarkdownEditor
                      className={classes.editor}
                      value={values.markdown}
                      disabled={isSubmitting}
                      onChange={value => setFieldValue('markdown', value)}
                    />
                  )}
                  <Wrapper className={classes.editor} outlined>
                    <ScrollableArea>
                      <FilesUpload
                        readOnly={stage !== CreateTaskStage.None || isSubmitting}
                        onChange={files => setFieldValue('files', files)}
                      />
                    </ScrollableArea>
                  </Wrapper>
                </div>
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
                {stage !== CreateTaskStage.Prepared && (
                  <NormalButton color="primary" disabled={isSubmitting} onClick={handleClose}>
                    {stage === CreateTaskStage.None ? 'Отмена' : 'Закрыть'}
                  </NormalButton>
                )}
                {stage !== CreateTaskStage.Created && (
                  <NormalButton color="primary" disabled={isSubmitting} onClick={submitForm}>
                    Создать
                  </NormalButton>
                )}
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default TaskCreate;
