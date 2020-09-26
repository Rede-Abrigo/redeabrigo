import { createGlobalStyle, keyframes } from 'styled-components';
import { lighten } from 'polished';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


export default createGlobalStyle`
  * {
    font-family: 'Nunito', sans-serif;
    color: #002F67;
    box-sizing: border-box;
  }

  div{
    animation: ${fadeIn} .8s;
  }

  section, div, form, #root{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  html, body, #root{
    width: 100%;
    min-height: 100vh;
    margin: 0;
  }

  body{
    background: #f0f7ff;
    background: linear-gradient(141deg, #f0f7ff 0%, #EBEEFF 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input, button{
    width: 100%;
    border-radius: 30px;
    border: none;
    color: #fff;
    letter-spacing: 4px;
    font-size: 21px;
    padding: 13px 35px;
    &:focus{
      outline: none;
    }
  }

  input{
    background: #0B4385;
    &::placeholder { 
      color: #fff;
    }
  }

  input + input{
    margin-top: 15px;
  }

  button{
    text-align: center;
    background: #5D3077;
    box-shadow: 0px 10px 28px 0px #AD9DCD;
    transition: background .4s;
    cursor: pointer;

    &:hover{
      background: ${lighten(0.2, '#5D3077')};
    }
  }

  
  h2{
    text-align: left;
    width: 100%;
    font-size: 30px;
    max-width: 400px;
    align-self: flex-start;
    padding-left: 40px;
  }
`;