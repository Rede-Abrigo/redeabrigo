import styled, { css } from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';
import { DefaultContainer } from '../../styles/DefaultContainer';

export const Container = styled.div`
  ${DefaultContainer}
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  @media(max-width: 1400px){
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const CursoContent = styled.div`
  max-width: 500px;
  width: 90%;
  margin: 75px 0 0 50px;
  position: relative;
  min-height: 300px;

  label{
    width: 100%;
    font-weight: 900;
    font-size: 13px;
    margin-bottom: 4px;
  }

  button.alt{
    width: auto;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    background: #D6E9FA;
    color: #002F67;
    border-radius: 30px;
    padding: 8px 15px;
    margin: 0px auto 15px 0px;
    transition: background .4s;
    box-shadow: none;
    letter-spacing: 1px;

    &:hover{
      background: #bcdfff;
    }
  }

  @media(max-width: 1400px){
    margin: 40px 0 0 0px;
  }
`;

export const ListaModulos = styled.div`
  width: 100%;
  
  > div + div{
    margin-top: 60px;
  }
`;

export const Modulo = styled.div`
  width: 100%;
  align-items: flex-start;

  h3{
    position: relative;
    cursor: pointer;

    &:after{
      opacity: 0;
      content: 'atualizar nome';
      background: #fad552;
      font-size: 12px;
      position: absolute;
      font-weight: 400;
      padding: 2px 10px;
      border-radius: 20px;
      white-space: nowrap;

      top: 0px;
      left: 0%;
      transform: translateX(-7%);

      transition: all .4s;
    }

    &:hover:after{
      opacity: 1;
      top: -20px;
    }
  }

  > div{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;

    > button.alt{
      margin: 0;
    }

    > button + button{
      margin-left: 10px!important;
    }

    > button.delete{
      white-space: nowrap;
      background: #dd4c37;
      font-size: 12px;
      letter-spacing: 0px;
      padding: 4px 15px;
      width: auto;
      display: flex;
      align-items: center;
      svg{
        stroke: #fff;
        margin-left: 10px;
      }
    }
  }
`;

export const AulasContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div{
    ${DefaultBackground}
    padding: 15px 30px;
    flex-direction: row;
    justify-content: space-between;
  }

  div + div{
    margin-top: 15px;
  }

  button{
    width: auto;
    height: 24px;
    background: none;
    padding: 0;
    color: #002F67;
    box-shadow: none;

    &:hover{
      background: none;
    }
  }

  label{
    position: absolute;
    top: 0;
    letter-spacing:2px;
    font-size: 12px;
    background: #d5e8fa;
    border-radius: 15px;
    padding: 0 10px;
    width: auto;
    font-weight: 400;

    transform: translateY(-50%);
  }

  aside{
    position: absolute;
    left: -20px;
    display: flex;
    flex-direction: column;

    button:first-child{
      transition: transform .3s;
      transform: translateY(15px);
    }
    button:last-child{
      transition: transform .3s;
      transform: translateY(-15px);
    }
  }

  > div:hover aside{
    button:first-child, button:last-child{
      transform: translateY(0);
    }
  }
`;