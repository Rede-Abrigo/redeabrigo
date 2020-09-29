import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';

import Arrow from '../../images/arrow.svg';
import Sino from '../../images/sino.svg';
import Perfil from '../../images/perfil.svg';

const TopMenu: React.FC = () => {
  const { goBack } = useHistory()
  return (
    <Container>
      <img src={Arrow} onClick={goBack} alt="seta para voltar" />
      <Link to="/mensagens">mensagens<img src={Sino} alt="sino" /></Link>
      <Link to="/user/1">meu perfil<img src={Perfil} alt="perfil" /></Link>
    </Container>
  );
}

export default TopMenu;