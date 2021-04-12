import React, { useState, useEffect } from 'react';
import { Formik, FieldArray, FormikHelpers } from 'formik';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import { Add, Check, Delete } from '@material-ui/icons';
import useStyles from './styles';
import { createUserTemplate, validationSchema } from './form';
import Container from 'components/common/Container';
import PasswordField from 'components/common/PasswordField';
import FormField from 'components/formik/FormField';
import AutocompleteFormField from 'components/formik/AutocompleteFormField';
import FlatButton from 'components/themed/FlatButton';
import AcceptButton from 'components/themed/AcceptButton';
import { loadRoles, createUsers } from 'api/v1';
import { Role, UserWithPassword } from 'types';
import { NullableProperties } from 'types/common';

type UserToAdd = NullableProperties<Omit<UserWithPassword, 'id' | 'isActive'>, 'role'>;

interface AddUserForm {
  users: UserToAdd[];
}

const initialValues: AddUserForm = {
  users: [createUserTemplate()],
};

const AddUser: React.FC = () => {
  const classes = useStyles();
  const [options, setOptions] = useState<Role[]>([]);

  useEffect(() => {
    loadRoles().then(response => {
      setOptions(response.data || []);
    });
  }, []);

  const handleSubmit = (values: AddUserForm, helpers: FormikHelpers<AddUserForm>) => {
    const users = values.users.map(user => ({
      username: user.username,
      password: user.password,
      name: user.name || null,
      email: user.email || null,
      isActive: true,
      roleId: user.role!.id,
    }));

    helpers.setSubmitting(true);

    createUsers(users).then(() => {
      helpers.setSubmitting(false);
      helpers.resetForm();
    });
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ values, errors, isSubmitting, submitForm }) => (
          <FieldArray name="users">
            {arrayHelpers => (
              <div className={classes.grid}>
                {values.users.map((entry, index) => (
                  <Card className={classes.card} key={index}>
                    <CardContent className={classes.content}>
                      <div className={classes.container}>
                        <FormField
                          label="Имя пользователя"
                          name={`users[${index}].username`}
                          disabled={isSubmitting}
                          required
                        />
                        <div className={classes.wrapper}>
                          <FormField
                            label="Имя профиля"
                            name={`users[${index}].name`}
                            disabled={isSubmitting}
                          />
                          <FormField
                            label="Почта"
                            name={`users[${index}].email`}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <div className={classes.container}>
                        <FormField
                          component={PasswordField}
                          label="Пароль"
                          name={`users[${index}].password`}
                          disabled={isSubmitting}
                          required
                        />
                        <AutocompleteFormField
                          label="Роль"
                          name={`users[${index}].role`}
                          options={options}
                          getOptionLabel={option => option.meaning}
                          getOptionSelected={(option, value) => option.id === value.id}
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardActions className={classes.actions}>
                      <FlatButton
                        color="primary"
                        variant="contained"
                        onClick={() => arrayHelpers.remove(index)}
                        disableElevation
                      >
                        <Delete />
                      </FlatButton>
                    </CardActions>
                  </Card>
                ))}
                <div className={classes.buttons}>
                  <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    startIcon={<Add />}
                    disabled={isSubmitting}
                    onClick={() => arrayHelpers.push(createUserTemplate())}
                  >
                    Добавить ещё
                  </Button>
                  <AcceptButton
                    color="primary"
                    variant="outlined"
                    size="large"
                    startIcon={<Check />}
                    disabled={
                      isSubmitting || values.users.length === 0 || (errors.users?.length || 0) > 0
                    }
                    onClick={submitForm}
                  >
                    {values.users.length === 1 ? 'Создать пользователя' : 'Создать пользователей'}
                  </AcceptButton>
                </div>
              </div>
            )}
          </FieldArray>
        )}
      </Formik>
    </Container>
  );
};

export default AddUser;
