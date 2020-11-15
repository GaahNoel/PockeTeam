import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;

  @media (min-width: 850px) {
    background-color: lightgrey;
  }
`;
export const Container = styled.div`
  width: 80%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitlePage = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  h2 {
    font-size: 3rem;
  }
  button {
    padding: 0 2rem;
    border-radius: 1rem;
    border: 1px solid black;
    background-color: lightgrey;
    &:hover {
      background-color: #b7b7b7;
    }
  }
`;
export const Teams = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const Grid = styled.div`
  max-width: 100%;
  width: 90%;
`;
