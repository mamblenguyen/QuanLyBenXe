import styled from 'styled-components';
import '../../config/scss/tailwind.scss';

export const InputWrapper = styled.div<{ $size: string; $border: string; $borderRadius: string }>`
  position: relative;
  border: 1px solid
    ${({ $border }) => ($border === 'red' ? '#ED2025' : $border === 'blue' ? '#0B80EC' : $border === 'grey' ? '#37383980' : 'transparent')};
  width: ${({ $size }) => ($size === 'full' ? '100%' : $size === 'small' ? '130px' : $size === 'medium' ? '350px' : '892px')};
  transition: border-color 0.3s;
  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : '8px')};
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 25%;
  font-size: 18px;
  color: var(--icon-color);
`;

export const StyledInput = styled.input<{ $background: string; $hasIcon: boolean; $borderRadius: string }>`
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : '8px')};
  padding: 0 16px 0 ${({ $hasIcon }) => ($hasIcon ? '52px' : '16px')};
  font-size: 16px;
  font-weight: 400;
  font-family: Source Sans Pro;
  line-height: 16px;
  background-color: ${({ $background }) => ($background === 'dark grey' ? '#E1E1E1' : $background === 'light grey' ? '#F2F2F2' : '#FFFFFF')};
  color: var(--black-text);

  &::placeholder {
    color: #aaa;
  }

  &.disabled {
    background-color: #cdcdcd;
    pointer-events: none;
  }
`;