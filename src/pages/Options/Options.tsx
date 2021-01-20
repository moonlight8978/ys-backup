import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Options.css';
import { Formik } from 'formik';
import { Button, Container, Form } from 'react-bootstrap';
import { object, string } from 'yup';

interface ConfigForm {
  githubToken: string;
  gistId: string;
}

const configSchema = object({
  githubToken: string().required('Github token is required'),
});

const Options = () => {
  const saveConfig = (form: ConfigForm) => {
    localStorage.setItem('_config/githubToken', form.githubToken);
    localStorage.setItem('_config/gistId', form.gistId);
  };

  const configValues: ConfigForm = {
    githubToken: localStorage.getItem('_config/githubToken') || '',
    gistId: localStorage.getItem('_config/gistId') || '',
  };

  return (
    <Container>
      <Formik<ConfigForm> initialValues={configValues} onSubmit={saveConfig}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="githubToken">
                <Form.Label aria-required="true">Github token</Form.Label>
                <Form.Control type="text" value={values.githubToken} onChange={handleChange('githubToken')} required />
                <Form.Text className="text-muted">
                  Does not have Github account? Let's{' '}
                  <a href="https://github.com/join" target="_blank">
                    create one
                  </a>
                  . Then{' '}
                  <a
                    href="https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token"
                    target="_blank"
                  >
                    create a personal token
                  </a>{' '}
                  with <b>gist</b> permission.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="gistId">
                <Form.Label>Gist ID</Form.Label>
                <Form.Control type="text" value={values.gistId} onChange={handleChange('gistId')} />
                <Form.Text className="text-muted">If you do not have existing backup, omit this field.</Form.Text>
              </Form.Group>

              <Button type="submit">Save</Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Options;
