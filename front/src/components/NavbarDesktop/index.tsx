import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from './styles';
import TopMenu from '../TopMenu';

const NavbarDesktop: React.FC = () => {
  return (
    <Container>
      <TopMenu isDesktop={true} />
      <Menu>
        <label>abrigos</label>
        <Link to="/abrigos/estatisticas">estatísticas</Link>
        <Link to="/abrigos/todos">ver todos</Link>
        <Link to="/abrigos/novo">criar novo</Link>

        <label>profissionais</label>
        <Link to="/profissionais/estatisticas">estatísticas</Link>
        <Link to="/profissionais/todos">ver todos</Link>
        <Link to="/profissionais/novo">criar novo</Link>

        <label>cursos</label>
        <Link to="/cursos/estatisticas">estatísticas</Link>
        <Link to="/cursos/todos">ver todos</Link>
        <Link to="/cursos/novo">criar novo</Link>

        <label>forum</label>
        <Link to="/forum/todos">ver todos</Link>
        <Link to="/forum/novo">criar novo</Link>
      </Menu>
    </Container>
  );
}

export default NavbarDesktop;