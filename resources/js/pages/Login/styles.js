import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 360px;
  margin: 36px auto;

  h1 {
      text-align: center;
      margin-bottom: 26px;
  }

  button {
    border: 0;
    background-color: #670d64;
    padding: 12px;
    height: 46px;
    width: 100%;
    color: #f4f0f1;
    text-align: center;
    font-weight: 600;
    border-radius: 4px;
    margin: 24px auto;
    display: block;
    transition: background-color .3s;

    &:hover {
      background-color: ${shade(0.2, '#670d64')};
    }
  }
`;
