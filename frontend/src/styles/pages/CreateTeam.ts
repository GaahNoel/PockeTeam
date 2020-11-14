import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
export const Container = styled.div`
  width: 80%;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const TeamName = styled.div`
  p {
    margin-bottom: 15px;
  }
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  //align-items: center;
  background-color: #ffffff;
  margin: 35px 0px;
`;

export const FieldName = styled(TextField)``;

export const TeamSelect = styled.div`
  /*display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 0;*/
  display: flex;
  justify-content: space-between;
`;

export const PokemonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

export const PokemonStatsRadar = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.a`
  height: 120px;
  width: 20px;
  margin: 0px;
  color: #000000;
  background-color: #afacab;

  border: 1px solid #000000;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
  @media (min-width: 850px) {
    padding: 10.5px 116px;
  }
  &:hover {
    background-color: #969391;
    //opacity: 0.8;
  }

  img {
    width: 250px;
  }
`;

export const RadioDiv = styled.div`
  margin-top: 40px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 50px;
  button {
    margin: 0px 60px;
    margin-bottom: 35px;
    padding: 0px 5px;
    height: 60px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: medium;
    color: #ffffff;
    background-color: #000000;
    border-radius: 5px;
  }
`;

export const Voltar = styled.a`
  margin: 0px 60px;
  color: #000000;
  padding: 20px 5px;
  height: 60px;
  width: 200px;
  border: 1px solid #000000;
  text-decoration: none;
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
`;
