import React from 'react';
import { useParams } from 'react-router-dom';

import TopMenu from '../../../components/TopMenu'
import Navbar from '../../../components/Navbar'
import NavbarDesktop from '../../../components/NavbarDesktop'

import {Container} from '../styles'

interface IRouteParams {
  id: string;
}

const Statistics: React.FC = () => {
  const { id } = useParams<IRouteParams>();

  return (
    <Container>
      <TopMenu />
      <h2>Alunos Inscritos</h2>
      <Navbar />
      <NavbarDesktop />
    </Container>
  )
}

export default Statistics;