import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

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

export const Form = styled.button`
  
`;

export const TeamName = styled.div`
  width: 80%;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  
`;


export const FieldName = styled(TextField)`
  
`;

export const TeamSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 0;
  
`;



export const Button = styled.a`
  height: 60px;
  margin: 0px;
  color: #000000;
  background-color: #AFACAB;

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
  &:hover{
    background-color: #969391;
    //opacity: 0.8;
  }
`;

export const Buttons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  button {
    margin-bottom: 35px;
    padding: 0px 5px;
    height: 60px;
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
  color: #000000;
  padding: 20px 5px;
  height: 60px;
  width: 105.09px;
  border: 1px solid #000000;
  text-decoration: none;
  text-align: center;
  align-items: center;
  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
`;


