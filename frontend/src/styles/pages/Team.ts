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
  //justify-content: center;
  
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  height: 100%;

  @media (min-width: 850px) {
    width: 80%;
    background-color: white;
    height: 100%;

    display: flex;
    flex-direction: row;
    //justify-content: space-around;
    align-items: flex-start;
  }
`;

export const TitlePage = styled.div`
  display: flex;
  margin: 10px 60px;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  #title{
    font-weight: bold;
    font-size: 38px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .text{
    font-size: 28px;
  }
`;

export const Teams = styled.div`
  display: flex;
  margin: 10px 60px;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  #title{
    font-weight: bold;
    font-size: 38px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .text{
    font-size: 28px;
  }
`;

export const Names = styled.div`
  
`;

export const Pokemon = styled.div`
  
`;