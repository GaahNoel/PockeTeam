import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
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
  height: 100%;

  @media (min-width: 850px) {
    width: 80%;
    background-color: white;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

export const Title = styled.h1`
  margin-top:20px;
`;

export const TopSide = styled.div`
  width: 70%;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  //flex-direction: row;
  align-items: center;

  button{
    color: #ffffff;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 8px;
    border: 1px solid black;
    background-color: black;
    &:hover {
      background-color: #363636;
    }
  }
`;

export const Photo = styled.div`
  border: 5px solid red;

  img{
    padding: 10px;
    width: 150px;
  }
`;

export const BotSide = styled.div`
  width: 95%;
  margin-top: 55px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  //align-items: center;
`;

export const Infos = styled.div`
  width: 100%;
  height: 140px;
  border: 2px solid black;
  p{
    margin-left: 15px;
    margin-top: 18px;
  }
  `;

export const PokeInfos = styled.div`
  margin: 30px 0px;
  //margin-left: 15px;
  width: 100%;
  height: 450px;
  border: 2px solid black;
`;

export const FavoriteStarter = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`;

export const FavoriteTeam = styled.div`
  margin-top: 45px;
  margin-left: 15px;
`;