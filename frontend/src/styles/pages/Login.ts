import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField)``;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
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
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    font-size: 1.5em;
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
    &:hover {
      background-color: #161616;
    }
    @media (min-width: 850px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const Desktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  h3 {
    @media (min-width: 850px) {
      font-size: 50px;
      text-align: center;
    }
  }
  h4 {
    @media (min-width: 850px) {
      text-align: center;
      font-size: 20px;
    }
  }
  @media (min-width: 850px) {
    display: block;
  }
`;
export const Mobile = styled.h3`
  display: initial;
  font-size: 60px;

  @media (min-width: 850px) {
    display: none;
  }
`;

export const Register = styled.div`
  //width: 70%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.a`
  color: #000000;
  margin-top: 15px;

  width: 100%;
  height: 2.5rem;

  border: 1px solid #000000;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
  &:hover {
    background-color: lightgrey;
  }
  @media (min-width: 850px) {
    //padding: 10.5px 116px;
    //padding: 10.5px 116px;
  }
`;
