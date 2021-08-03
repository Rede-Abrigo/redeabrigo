import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import { PASSWORD_RECOVERY } from './apolloQueries';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

interface credentialsData {
  nome: string;
  email: string;
  password: string;
}

const PasswordRecovery: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const [RecoverPassword] = useMutation(PASSWORD_RECOVERY, {
    onCompleted() {
      addToast({
        title: "Email de recurepação de senha enviado",
        message: "Confira a caixa de spam",
        type: "success"
      });
      history.push('/');
    },
    onError() {
      addToast({
        title: "Ocorreu um erro",
        message: "Confira o email digitado e tente novamente",
        type: "error"
      });
    }
  });

  const handleSubmit = useCallback(async (formData: credentialsData) => {
    try {
      if (!formRef.current) {
        throw new Error('formRef invalid');
      }
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      RecoverPassword({
        variables: {
          email: formData.email,
        }
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        if (!formRef.current) {
          throw new Error('formRef invalid');
        }
        formRef.current.setErrors(errors);
        return
      }

      if (err instanceof Error) {
        addToast({
          title: err.message,
          message: 'tente novamente',
          type: 'error'
        });
      }

    }
  }, []);

  return (
    <Container style={{ maxWidth: 400 }}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Recuperação de senha</h1>
        <Input name="email" placeholder="digite seu e-mail" type="email" />
        <Button type="submit">Entrar</Button>
      </Form>

      <Link to="/">Voltar ao login</Link>
    </Container>
  );
}

export default PasswordRecovery;