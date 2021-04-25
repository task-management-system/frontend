import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Paper, FormGroup } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Container from 'components/common/Container';
import AcceptButton from 'components/themed/AcceptButton';
import FormField from 'components/formik/FormField';
import FormCheckbox from 'components/formik/FormCheckbox';
import { REQUIRED_FIELD } from 'constants/fields';
import { calculatePower } from 'utils/permissions';
import useStyles from './styles';
import { createRole } from 'api/v1';
import { State } from 'types/redux';
import { RoleForm } from 'types/components/formik/role';

const initialValues: RoleForm = {
  meaning: '',
  permissions: [],
};

const validationSchema = yup.object().shape({
  meaning: yup.string().required(REQUIRED_FIELD),
});

const AddRole: React.FC<ConnectedAddRoleProps> = ({ permissions }) => {
  const classes = useStyles();

  const handleSubmit = (values: RoleForm, helpers: FormikHelpers<RoleForm>) => {
    createRole({
      meaning: values.meaning,
      power: calculatePower(values.permissions, permissions),
    })
      .then(response => {
        if (response.details.ok) {
          helpers.resetForm();
        }
      })
      .finally(() => {
        helpers.setSubmitting(false);
      });
  };

  return (
    <Container className={classes.grid}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isValid, isSubmitting, submitForm }) => (
          <>
            <Paper className={classes.form}>
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
            </Paper>
            <div className={classes.buttons}>
              <AcceptButton
                color="primary"
                variant="outlined"
                size="large"
                startIcon={<Add />}
                disabled={isSubmitting || !isValid}
                onClick={submitForm}
              >
                Создать роль
              </AcceptButton>
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  permissions: state.metaData.permissions,
});

const connector = connect(mapStateToProps);

type ConnectedAddRoleProps = ConnectedProps<typeof connector>;

export default connector(AddRole);
