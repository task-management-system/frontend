import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import FormField from 'components/formik/FormField';
import NormalButton from 'components/themed/NormalButton';
import PasswordField from 'components/common/PasswordField';
import { REQUIRED_FIELD } from 'constants/fields';
import { changePassword } from 'api/v1';
import { UUID } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';

interface ChangePasswordProps {
  userId: UUID;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const useStyles = makeStyles(theme => ({
  form: {
    minWidth: 480,
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 64,
  },
}));

const initialValues: ChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const validationSchema = yup.object().shape({
  currentPassword: yup.string().min(8, 'Минимальная длина 8').required(REQUIRED_FIELD),
  newPassword: yup.string().min(8, 'Минимальная длина 8').required(REQUIRED_FIELD),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Значения должны совпадать')
    .min(8, 'Минимальная длина 8')
    .required(REQUIRED_FIELD),
});

const ChangePassword: React.FC<ChangePasswordProps> = ({ children, userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (values: ChangePasswordForm, helpers: FormikHelpers<ChangePasswordForm>) => {
    helpers.setSubmitting(true);
    changePassword(userId, {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    }).then(response => {
      helpers.setSubmitting(false);

      if (response.details.ok) {
        handleClose();
      }
    });
  };

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog open={open}>
        <DialogTitle>Смена пароля</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          {({ submitForm, dirty, isValid, isSubmitting }) => (
            <>
              <DialogContent className={classes.form}>
                <FormField
                  component={PasswordField}
                  label="Текущий пароль"
                  name="currentPassword"
                  disabled={isSubmitting}
                  required
                />
                <FormField
                  component={PasswordField}
                  label="Новый пароль"
                  name="newPassword"
                  disabled={isSubmitting}
                  required
                />
                <FormField
                  component={PasswordField}
                  label="Повторите новый пароль"
                  name="newPasswordConfirm"
                  disabled={isSubmitting}
                  required
                />
              </DialogContent>
              <DialogActions>
                <NormalButton color="primary" disabled={isSubmitting} onClick={handleClose}>
                  Отмена
                </NormalButton>
                <NormalButton
                  color="primary"
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={submitForm}
                >
                  Изменить
                </NormalButton>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default ChangePassword;
