import gql from "graphql-tag";

export const GET_ABRIGOS = gql`
{
  verAbrigos{
    id,
    nome,
    endereco
  }
}
`;

export const GET_USERS = gql`
query VerUsuarios{
  verUsuarios{
    id,
    nome,
    email,
    profissao
  }
}
`;

export const VIEW_NOTIFICATIONS = gql`
query{
  verNotificacoes{
    id
    conteudo
    tipo
    arquivada
    user{
      id
      nome
    }
  }
}
`;

export const DOWNLOAD_CURSOS = gql`
  query {
    exportarCursos
  }
`;

export const DOWNLOAD_ABRIGOS = gql`
  query {
    exportarAbrigos
  }
`;

export const DOWNLOAD_USUARIOS = gql`
  query {
    exportarUsuarios
  }
`;