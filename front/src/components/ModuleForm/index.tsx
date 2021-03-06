import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useMutation } from '@apollo/client';

import { useToast } from '../../hooks/toast';
import { CRIAR_MODULO, UPDATE_MODULO } from './apolloQueries';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface IModuloData {
  id: number;
  nome: string;
}

interface IModuleFormProps {
  cursoId: number;
  modulo?: IModuloData;
  setVisibility?: (v: boolean) => void;
  reloadModulo?: () => void;
}

interface IFormData {
  nome: string;
}

const ModuleForm: React.FC<IModuleFormProps> = ({ modulo, cursoId, setVisibility, reloadModulo }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [CriarModulo] = useMutation(CRIAR_MODULO, {
    onCompleted() {
      addToast({
        title: "modulo criado com sucesso",
        type: "success"
      });
      reloadModulo && reloadModulo();
      setVisibility && setVisibility(false);
    },
    onError() {
      addToast({
        title: "erro ao criar o modulo",
        type: "error"
      });
    }
  });

  const [AtualizarModulo] = useMutation(UPDATE_MODULO, {
    onCompleted() {
      addToast({
        title: "modulo atualizado com sucesso",
        type: "success"
      });
      reloadModulo && reloadModulo();
      setVisibility && setVisibility(false);
    },
    onError() {
      addToast({
        title: "erro ao atualizar o modulo",
        type: "error"
      });
    }
  });

  const handleSubmit = (data: IFormData) => {
    if (modulo && modulo.id) {
      AtualizarModulo({
        variables: {
          moduloId: modulo.id,
          nome: data.nome,
          cursoId: cursoId
        }
      });
    } else {
      CriarModulo({
        variables: {
          nome: data.nome,
          cursoId: cursoId
        }
      });
    }
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={modulo}>
          <div className="full-width">
            <label>nome do m??dulo</label>
            <Input name="nome" className="alt line-bottom" />
          </div>

          <Button type="submit">salvar m??dulo</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default ModuleForm;