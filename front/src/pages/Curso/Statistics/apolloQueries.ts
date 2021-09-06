import { gql } from '@apollo/client';

export const VER_CURSO = gql`
query VerCurso($id: Float!){
  verCurso(id: $id){
    curso{
      id
      nome
      descricao
      finalizado
      modulos{
        id
      }
    }
  }
}
`;

export const VER_MODULO_POR_CURSO = gql`
query VerModulosPorCurso($cursoId: Float!){
  verModulosPorCurso(cursoId: $cursoId){
    id
    nome
    aulas{
      id
      nome
      descricao
      ordem
      video_url
      duracao
    }
    perguntas{
      id
      enunciado
      ordem
      alternativa1
      alternativa2
      alternativa3
      alternativa4
      resposta
      justificativa
    }
  }
}
`;


