import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAbrigo } from '../../hooks/AbrigoHook';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, Content, AbrigoUser } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Perfil from '../../images/perfil.jpg';
import { FiMinusCircle } from 'react-icons/fi';

interface IAbrigoUsers {
  id: number;
  nome: string;
}

export interface IAbrigosData {
  id: number;
  nome: string;
  endereco: string;
  classificacao: string;
  capacidade: string;
  faixaEtaria: string;
  profissionais: IAbrigoUsers[];
}

interface IAbrigoFormProps {
  id?: string;
  headingText?: string;
}

const AbrigoForm: React.FC<IAbrigoFormProps> = ({ id, headingText }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>();
  const [abrigoId, setAbrigoId] = useState<string>();
  const [abrigo, setAbrigo] = useState<IAbrigosData>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { setHookAbrigo } = useAbrigo();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: IAbrigosData) => {
    try {
      setIsLoading(true);
      let response;
      if (abrigoId) {
        response = await api.put(`/abrigos/${abrigoId}`, data);
      } else {
        response = await api.post(`/abrigos`, data);
        setAbrigoId(response.data.id);
      }
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Abrigo Cadastrado!',
        message: 'este abrigo já está visível na lista.',
      });
    } catch (err) {
      setIsLoading(false);
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar!',
        message: 'tente novamente ou entre em contato com suporte.',
      });
    }
  }, [abrigoId, setIsLoading, setAbrigoId]);

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.delete(`/abrigos/${abrigoId}`);
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Abrigo Deletado!',
        message: 'você será redirecionado para a listagem.',
      });
      history.push('/abrigos/todos');
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        title: 'Erro ao deletar',
        message: 'tente novamente ou entre em contato com suporte.',
      });
    }
  }, [abrigoId, setIsLoading, history]);

  const handleRemoveProfissional = (profissionalId: number) => {
    if (abrigo) {
      const profissionais = abrigo.profissionais.filter(
        profissional => profissional.id !== profissionalId
      );

      try {
        api.put(`/abrigos/${abrigo.id}`, { ...abrigo, profissionais });
        setAbrigo({ ...abrigo, profissionais });
        addToast({
          type: 'success',
          title: 'Profissional Removido!',
          message: 'informações do abrigo foram atualizadas',
        });
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao remover!',
          message: 'tente novamente ou entre em contato com suporte.',
        });
      }
    }
  }

  const handleAddProfissional = () => {
    if (abrigo) {
      setHookAbrigo(abrigo);
      history.push('/profissionais/todos');
    }
  }

  useEffect(() => {
    headingText ? setHeading(headingText) : setHeading('criar novo abrigo')

    if (id) {
      setAbrigoId(id);
      api.get(`/abrigos/${id}`)
        .then(response => {
          setAbrigo(response.data);
        });

    }
  }, [setAbrigoId, setAbrigo, setHeading]);

  return (
    <Container>
      <h1>{heading}</h1>
      <Content>

        <label>profissionais</label>
        <button className="alt" onClick={handleAddProfissional}>adicionar profissional</button>
        {abrigo && abrigo.profissionais && abrigo.profissionais.map(profissional => (
          <AbrigoUser key={profissional.id}>
            <div>
              <img src={Perfil} />
              <h3>{profissional.nome}</h3>
            </div>
            <button onClick={() => handleRemoveProfissional(profissional.id)}><FiMinusCircle size={24} /></button>
          </AbrigoUser>
        ))}

        <Form ref={formRef} onSubmit={handleSubmit} initialData={abrigo}>
          <div className="full-width">
            <label>nome</label>
            <Input name="nome" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="full-width">
            <label>endereço</label>
            <Input name="endereco" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="full-width">
            <label>classificação</label>
            <Input name="classificacao" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="half-width">
            <label>capacidade</label>
            <Input className="bigger" name="capacidade" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <div className="half-width">
            <label>faixa etária</label>
            <Input className="bigger" name="faixaEtaria" containerStyle={{ border: 'none', borderRadius: 0, width: '100%' }} />
          </div>

          <Button type="submit" loading={isLoading}>salvar</Button>
        </Form>

        {abrigoId && (
          <Button className="delete" onClick={handleDelete} loading={isLoading}>deletar abrigo</Button>
        )}
      </Content>
    </Container>
  );
}

export default AbrigoForm;