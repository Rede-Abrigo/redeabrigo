import styled from 'styled-components';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 350px;
  background: #67A4DD;

  @media(max-width: 950px){
    display: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 90%;
  align-items: flex-end;
  padding-right: 5%;

  img{
    max-width: 70px;
    margin: 20px 0 15px;
  }

  label{
    text-align: right;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    padding-right: 10px;
  }

  a{
    ${DefaultBackground}
    text-align: right;
    padding: 2px 20px;
    text-decoration: none;
    color: #446A97;
    width: auto;
    font-size: 14px;
    letter-spacing: .5px;
  }

  a + a, label + a{
    margin-top: 5px;
  }

  a + label{
    margin-top: 20px;
  }


`;