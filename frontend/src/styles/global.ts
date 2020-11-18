import { createGlobalStyle } from 'styled-components';

import imageBackground from '../assets/backgroundHome.png';

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
  body{
    @media (min-width:850px){
      background-color: lightgrey;   
      background-image: url(${imageBackground});
      background-size: cover;
      background-repeat: no-repeat;
    }
    background-color: white;
  }

`;
