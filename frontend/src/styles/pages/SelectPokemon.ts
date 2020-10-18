import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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
    width: 10rem;
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
    width: 60%;
    flex-wrap: wrap;
  }

  .formMoves .move {
    width: 20rem;
  }
`;
export const Item = styled.div`
  width: 60%;
  margin-top: 4rem;
`;
export const Pokemon = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 2rem;
  margin-bottom: 5rem;
  align-items: center;
`;
