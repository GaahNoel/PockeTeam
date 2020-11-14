import styled from 'styled-components';

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
  img {
    width: 200px;
  }
  h2 {
    margin-top: 2rem;
    font-size: 38px;
  }
`;
export const Form = styled.form`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .formMoves {
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 959px;
    flex-wrap: wrap;
  }
`;
export const Item = styled.div`
  width: 90%;
  margin-top: 4rem;
  display: flex;
  align-items: center;
`;
export const ItemDetails = styled.div`
  width: 70%;
  p {
    margin-top: 0.8rem;
  }
`;

export const ItemImage = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  img {
    width: 150px;
  }
`;

export const PokemonSelect = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 2rem;
  margin-bottom: 5rem;
  align-items: center;

  div {
    //  width: 12rem;
    img {
      display: block;
      max-width: 100px;
      padding: 0px;
      margin: 0px;
    }
  }
`;
export const MoveDetails = styled.div`
  p {
    margin-top: 0.8rem;
  }
`;
export const Move = styled.div`
  width: 20rem;
  margin-bottom: 5rem;
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
