import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormField from 'components/formik/FormField';
import NormalButton from 'components/themed/NormalButton';
import PasswordField from 'components/common/PasswordField';
import { changePassword } from 'api/v1';

interface IChildrenHelpers {
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IChangePasswordProps {
  userId: number;
  children: (helpers: IChildrenHelpers) => React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  form: {
    minWidth: 480,
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 64,
  },
}));

const validationSchema = yup.object().shape({
  currentPassword: yup.string().min(8, 'Минимальная длина 8').required('Является обязательным'),
  newPassword: yup.string().min(8, 'Минимальная длина 8').required('Является обязательным'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Значения должны совпадать')
    .min(8, 'Минимальная длина 8')
    .required('Является обязательным'),
});

const ChangePassword: React.FC<IChangePasswordProps> = ({ children, userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: values => {
      formik.setSubmitting(true);
      changePassword(userId, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).then(response => {
        formik.setSubmitting(false);

        if (response.details.ok) {
          handleClose();
        }
      });
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog open={open}>
        <DialogTitle>Смена пароля</DialogTitle>
        <DialogContent className={classes.form}>
          <FormField
            component={PasswordField}
            label="Текущий пароль"
            name="currentPassword"
            value={formik.values.currentPassword}
            errors={formik.errors}
            touched={formik.touched}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            required
          />
          <FormField
            component={PasswordField}
            label="Новый пароль"
            name="newPassword"
            value={formik.values.newPassword}
            errors={formik.errors}
            touched={formik.touched}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            required
          />
          <FormField
            component={PasswordField}
            label="Повторите новый пароль"
            name="newPasswordConfirm"
            value={formik.values.newPasswordConfirm}
            errors={formik.errors}
            touched={formik.touched}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            required
          />
        </DialogContent>
        <DialogActions>
          <NormalButton color="primary" disabled={formik.isSubmitting} onClick={handleClose}>
            Отмена
          </NormalButton>
          <NormalButton
            color="primary"
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            onClick={formik.submitForm}
          >
            Изменить
          </NormalButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;
