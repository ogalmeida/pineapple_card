import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body{
    background-color: #f9f9f9;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    scroll-behavior: smooth;
    position: relative;
    padding-bottom: 12px;
  }

  body, input, button {
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
    color: #3f3f3f;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
    border-radius: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f9f9f9;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #2d2d2d;
  }
`;

export const Margin = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px;
`;
