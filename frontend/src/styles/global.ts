import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
  }

  body,
  input,
  button,
  textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  button,a {
    cursor: pointer;
  }
  
  img{
    display:block;
  }

`;
