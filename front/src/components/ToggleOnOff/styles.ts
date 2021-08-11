import styled, {css} from 'styled-components';
import { DefaultContainer } from '../../styles/DefaultContainer';
import { DefaultBackground } from '../../styles/DefaultBackground';

export const Container = styled.div`
  ${DefaultBackground};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  max-width: 500px;
  margin-top: 20px;

  label{
    font-size: 20px;
    text-transform: capitalize;
    margin-right: 15px;
    font-weight: bold;
  }

  main{
    display: flex;
    align-items: center;
  }

  p{
    font-size: 13px;
    color: #3c6597;
  }
`;

interface IToggle{
  isOn: boolean;
}

export const ToggleSlider = styled.div<IToggle>`
  width: 85px;
  border-radius: 60px;
  height: 35px;
  background: #d9d9d9;
  position: relative;
  box-shadow: 0px 0px 11px -1px #aaaaaa inset;
  cursor: pointer;
  margin: 0 5px;

  span{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    top: 4px;
    left: 4px;
    transition: all .4s;
    box-shadow: 0 0 4px #959595;
    font-size: 13px;
    color: grey;
  }

  ${props => props.isOn && css`
    background: #ade993;

    span{
      left: 53px;
    }
  `}
`;