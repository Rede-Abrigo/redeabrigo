import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { VER_CURSOS } from './apolloQueries';

import NavbarDesktop from '../../components/NavbarDesktop';
import Navbar from '../../components/Navbar';
import TopMenu from '../../components/TopMenu';
import Tabs from '../../components/Tabs';
import Search from '../../components/Search';
import CursoForm from '../../components/CursoForm';

import { Container, Content, Estatisticas, CursoList, Curso, Warning, NoCurso } from './styles';

interface IVerCursos {
  verCursos: {
    id: string;
    nome: string;
    descricao: string;
  }[]
}

const Cursos: React.FC = () => {
  const location = useLocation();
  // let query = new URLSearchParams(useLocation().search);

  const { data: cursosData, refetch } = useQuery<IVerCursos>(VER_CURSOS);

  // const loadCursos = useCallback(async (query) => {
  //   const response = await api.get(`/cursos?nome_like=${query}`);
  //   setCursos(response.data);
  // }, []);

  return (
    <Container>
      <TopMenu />
      <Tabs
        options={[
          { text: "ver estatísticas", path: "/estatisticas" },
          { text: "ver todos", path: "/todos" },
          { text: "criar novo", path: "/novo" },
        ]}
      />

      {location.pathname === '/cursos/estatisticas' && (
        <>
          {/* <Search searchTitle="cursos cadastrados" loadList={loadCursos} /> */}
          <CursoList>

            {cursosData && cursosData.verCursos.map(curso => (
              <Curso key={curso.id}>
                <Link to={`/curso-stats/${curso.id}`}>
                  <div>
                    <h3>{curso.nome}</h3>
                    <strong>{curso.descricao.substring(0, 100)}...</strong>
                  </div>
                </Link>
              </Curso>
            ))}

          {cursosData && cursosData.verCursos.length === 0 && (
            <NoCurso>
              Nenhum curso foi encontrado.
            </NoCurso>
          )}

          </CursoList>
        </>
      )}

      {location.pathname === '/cursos/todos' && (
        <>
          {/* <Search searchTitle="cursos cadastrados" loadList={loadCursos} /> */}
          <CursoList>

            {cursosData && cursosData.verCursos.map(curso => (
              <Curso key={curso.id}>
                <Link to={`/curso/${curso.id}`}>
                  <div>
                    <h3>{curso.nome}</h3>
                    <strong>{curso.descricao.substring(0, 100)}...</strong>
                  </div>
                </Link>
              </Curso>
            ))}

          {cursosData && cursosData.verCursos.length === 0 && (
            <NoCurso>
              Nenhum curso foi encontrado.
            </NoCurso>
          )}

          </CursoList>
        </>
      )}

      {location.pathname === '/cursos/novo' && (
        <CursoForm updateCursosList={refetch} />
      )}

      <NavbarDesktop />
      <Navbar />
    </Container>
  );
}

export default Cursos;