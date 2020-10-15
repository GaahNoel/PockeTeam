import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  height: 100%;
  @media (min-width: 850px) {
    width: 80%;
    background-color: white;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;
export const Button = styled.a`
  color: #000000;
  margin-top: 15px;
  padding: 10.5px 55px;

  border: 1px solid #000000;
  text-decoration: none;

  align-items: center;
  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
  @media (min-width: 850px) {
    padding: 10.5px 116px;
  }
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    min-width: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 1.5em;
    }
    input {
      width: 300px;
      @media (min-width: 850px) {
        display: flex;

        min-width: 20vw;
        height: 1rem;
      }
    }
    button {
      margin-top: 25px;
      margin-bottom: 35px;
      width: 100%;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: medium;
      color: #ffffff;
      background-color: #000000;
      border-radius: 5px;
      @media (min-width: 850px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
export const Desktop = styled.div`
  display: none;
  h4 {
    @media (min-width: 1050px) {
      font-size: 30px;
    }
    @media (min-width: 850px) {
      display: block;
      text-align: center;
      font-size: 20px;
    }
  }
  h3 {
    display: block;
    text-align: center;
    font-size: 20px;
    @media (min-width: 850px) {
      display: block;
      font-size: 50px;
      text-align: center;
    }
  }
  @media (min-width: 850px) {
    display: block;
  }
`;
export const Mobile = styled.div`
  display: initial;
  font-size: 35px;
  margin-top: 100px;
  @media (min-width: 850px) {
    display: none;
  }
`;
