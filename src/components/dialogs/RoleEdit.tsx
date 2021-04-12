import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  makeStyles,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import NormalButton from 'components/themed/NormalButton';
import FormField from 'components/formik/FormField';
import FormCheckbox from 'components/formik/FormCheckbox';
import { REQUIRED_FIELD } from 'constants/fields';
import { updateRole } from 'api/v1';
import { Role, Permission } from 'types';
import { State } from 'types/redux';
import { DialogChildrenHelpers } from 'types/components/dialogs';

interface RoleEditProps {
  role: Role;
  onChange: (payload: Role) => void;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

interface RoleEditForm {
  meaning: string;
  permissions: string[];
}

const useStyles = makeStyles(theme => ({
  content: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
}));

const validationSchema = yup.object().shape({
  meaning: yup.string().required(REQUIRED_FIELD),
});

const calculatePower = (keys: string[], permissions: Permission[]): number =>
  permissions.reduce((accumulator, permission) => {
    if (keys.includes(permission.name)) {
      accumulator |= permission.power;
    }

    return accumulator;
  }, 0);

const RoleEdit: React.FC<RoleEditProps> = ({ children, role, onChange }) => {
  const classes = useStyles();
  const permissions = useSelector((state: State) => state.metaData.permissions || []);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const initialValues: RoleEditForm = useMemo(
    () => ({
      meaning: role.meaning,
      permissions: permissions
        .filter(
          permission => role.power > 0 && (role.power & permission.power) === permission.power
        )
        .map(permission => permission.name),
    }),
    [role, permissions]
  );

  const handleSubmit = (values: RoleEditForm, helpers: FormikHelpers<RoleEditForm>) => {
    helpers.setSubmitting(true);

    updateRole({
      id: role.id,
      meaning: values.meaning || role.meaning,
      power: calculatePower(values.permissions, permissions),
    })
      .then(response => {
        helpers.setSubmitting(false);

        if (response.details.ok) {
          onChange(response.data!);
          handleClose();
        }
      })
      .catch(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog maxWidth="sm" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{role.meaning}</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          {({ isSubmitting, submitForm }) => (
            <>
              <DialogContent className={classes.content}>
                <FormField label="Название роли" name="meaning" disabled={isSubmitting} required />
                <FormGroup>
                  {permissions.map(permission => (
                    <FormCheckbox
                      label={permission.description}
                      name="permissions"
                      value={permission.name}
                      disabled={isSubmitting}
                      key={permission.name}
                    />
                  ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <NormalButton color="primary" disabled={isSubmitting} onClick={handleClose}>
                  Отмена
                </NormalButton>
                <NormalButton color="primary" disabled={isSubmitting} onClick={submitForm}>
                  Сохранить
                </NormalButton>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default RoleEdit;
