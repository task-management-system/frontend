import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import WideDialog from 'components/themed/WideDialog';
import NormalButton from 'components/themed/NormalButton';
import NewFormField from 'components/formik/FormField';
import Editor from 'components/Editor';
import BorderContainer from 'components/common/BorderContainer';
import { DialogChildrenHelpers } from 'types/components/dialogs';

interface TaskCreateProps {
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

interface TaskCreateForm {
  title: string;
  description: string;
  text: string | null;
  dueDate: string;
}

const useStyles = makeStyles(theme => ({
  content: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content max-content 480px',
  },
}));

const initialValues: TaskCreateForm = {
  title: '',
  description: '',
  text: null,
  dueDate: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  text: yup.string().nullable(),
  dueDate: yup.string(),
});

const TaskCreate: React.FC<TaskCreateProps> = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
                <NewFormField label="Название" name="title" disabled={isSubmitting} required />
                <NewFormField label="Описание" name="description" disabled={isSubmitting} />

                <BorderContainer>
                  <Editor
                    data={values.text !== null ? JSON.parse(values.text) : null}
                    onChange={(api, data) =>
                      setFieldValue('text', data !== undefined ? JSON.stringify(data) : null)
                    }
                  />
                </BorderContainer>
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
