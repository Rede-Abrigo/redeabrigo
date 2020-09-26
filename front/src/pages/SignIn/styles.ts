import { lighten } from 'polished';
import styled from 'styled-components';
import { DefaultContainer } from '../../styles/defaultContainer';


export const Container = styled.div`
  ${DefaultContainer}

  img{
    margin-bottom: 20px;
    width: 70px;
  }

  > a{
    width: 100%;
    max-width: 250px;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    background: #D6E9FA;
    color: #002F67;
    border-radius: 30px;
    padding: 8px 15px;
    margin-top: 30px;
    text-decoration: none;
    transition: background .4s;

    &:hover{
      background: #bcdfff;
    }
  }

  form a{
    width: 100%;
    border-radius: 30px;
    border: none;
    color: #fff;
    letter-spacing: 4px;
    font-size: 21px;
    padding: 13px 35px;
    text-align: center;
    background: #5D3077;
    box-shadow: 0px 10px 28px 0px #AD9DCD;
    transition: background .4s;
    cursor: pointer;

    margin-top: 15px;
    text-decoration: none;

    &:focus{
      outline: none;
    }
    &:hover{
      background: ${lighten(0.2, '#5D3077')};
    }
  }
`;