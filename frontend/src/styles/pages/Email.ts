import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
export const Container = styled.div`
  width: 80%;
  min-height: 100vh;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;
export const Button = styled.div`
  color: #000000;
  margin-top: 2rem;

  width: 25rem;
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
    cursor: pointer;
    background-color: lightgrey;
  }
`;
