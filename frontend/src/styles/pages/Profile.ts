import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;

  @media (min-width: 850px) {
    background-color: lightgrey;
  }
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
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

export const Title = styled.h1``;
