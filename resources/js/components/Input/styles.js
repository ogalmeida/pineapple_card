/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #f1f1f1;
  border-radius: 10px;
  border: 2px solid #f1f1f1;
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #670d64;
      border-color: #670d64;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #670d64;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;

    &:-webkit-autofill {
      -webkit-box-shadow: inset 0 0 0px 9999px #f1f1f1;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
