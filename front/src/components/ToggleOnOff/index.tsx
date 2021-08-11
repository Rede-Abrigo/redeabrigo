import React, {HTMLProps} from 'react';

import {Container, ToggleSlider} from './styles';

interface IToggle extends HTMLProps<HTMLElement>{
  callback: () => void;
  isOn: boolean;
  label: string;
}

const ToggleOnOff: React.FC<IToggle> = ({callback, isOn, label}) => {
  return (
    <Container>
      <label>{label}</label>
      <main>
        <p>não</p>
        <ToggleSlider isOn={isOn} onClick={callback}><span>||</span></ToggleSlider>
        <p>sim</p>
      </main>
    </Container>
  );
}

export default ToggleOnOff;