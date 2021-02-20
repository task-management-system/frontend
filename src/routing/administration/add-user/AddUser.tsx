import React, { useState, useEffect } from 'react';
import { Formik, FieldArray, FormikHelpers } from 'formik';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import { Add, Check, Delete } from '@material-ui/icons';
import useStyles from './styles';
import { createUserTemplate, validationSchema } from './form';
import Container from 'components/common/Container';
import FormField from 'components/formik/FormField';
import AutocompleteFormField from 'components/formik/AutocompleteFormField';
import FlatButton from 'components/themed/FlatButton';
import AcceptButton from 'components/themed/AcceptButton';
import { getRoles, createUsers } from 'api/v1';
import { IRole, IUserWithPassword } from 'types';
import { NullableProperties } from 'types/common';

type TUserToAdd = NullableProperties<Omit<IUserWithPassword, 'id' | 'isActive'>, 'role'>;

interface IAddUserForm {
  users: TUserToAdd[];
}

const initialValues: IAddUserForm = {
  users: [createUserTemplate()],
};

const AddUser: React.FC = () => {
  const classes = useStyles();
  const [options, setOptions] = useState<IRole[]>([]);

  useEffect(() => {
    getRoles().then(response => {
      setOptions(response.data || []);
    });
  }, []);

  const handleSubmit = (values: IAddUserForm, helpers: FormikHelpers<IAddUserForm>) => {
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
        {({ values, errors, isSubmitting, handleChange, setFieldValue, submitForm }) => (
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
                          value={entry.username}
                          errors={errors}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          required
                        />
                        <div className={classes.wrapper}>
                          <FormField
                            label="Имя профиля"
                            name={`users[${index}].name`}
                            value={entry.name}
                            errors={errors}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <FormField
                            label="Почта"
                            name={`users[${index}].email`}
                            value={entry.email}
                            errors={errors}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <div className={classes.container}>
                        <FormField
                          label="Пароль"
                          name={`users[${index}].password`}
                          value={entry.password}
                          errors={errors}
                          onChange={handleChange}
                          disabled
                          required
                        />
                        <AutocompleteFormField
                          label="Роль"
                          name={`users[${index}].role`}
                          value={entry.role}
                          options={options}
                          getOptionLabel={option => option.text}
                          getOptionSelected={(option, value) => option.id === value.id}
                          errors={errors}
                          onChange={setFieldValue}
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
