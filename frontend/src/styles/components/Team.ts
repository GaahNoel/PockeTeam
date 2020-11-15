import styled from 'styled-components';

export const Team = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Names = styled.div`
  margin-bottom: 2rem;
`;

export const Graph = styled.div`
  margin-left: 3rem;
`;
export const Info = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 15px;
  padding: 2.5rem 1.5rem 0 1.5rem;
`;
export const Pokemon = styled.div`
  display: flex;
  > div {
    & > img {
      max-width: 5.5rem;
      border: 1px dashed black;
      padding: 0.5rem;
    }
  }
`;
export const Item = styled.div`
  position: relative;
  bottom: 30px;
  left: 60px;
  img {
  }
`;
export const Empty = styled.div`
  border: 1px dashed black;
  width: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 5.5rem;
`;
