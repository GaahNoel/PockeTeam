import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled.header`
  width: 100%;
  #FiHome {
    color: white;
    margin-top: 2px;
  }

  #Pesquisa {
    width: 52vw;
    color: white;
    padding: 5px;
    border: 1px solid white;
    border-radius: 24px;
    background-color: #414141;
    margin-left: 8px;
    &::placeholder {
      color: white;
      text-align: center;
    }
  }

  span{
    color: white;
    margin-top: 4px;
    margin-right: 30px;
  }

  #GiBigGear {
    color: white;
    margin-top: 2px;
    margin-right: 10px;
  }
  #FiPower {
    color: white;
    margin-top: 2px;
  }

  #FiUser {
    color: white;
    margin-left: 10px;
    margin-top: 2px;
  }

  @media (min-width: 1050px) {
    max-width: 80%;
    #FiHome {
      margin-left: 15px;
    }

    #header_left form {
      max-width: 1000px;
    }

    #Pesquisa {
      width: 55vw;
      /*min-width: 40rem;*/
      margin-left: 25px;
    }

    #FiStar {
      margin-right: 15px;
    }

    #FiUser {
      margin-right: 15px;
    }
  }

  @media (min-width: 500px) {
    #FiHome {
      margin-left: 15px;
    }

    #header_left form {
      max-width: 1000px;
    }

    #Pesquisa {
      width: 50vw;
      /*min-width: 40rem;*/
      margin-left: 25px;
    }

    #FiStar {
      margin-right: 15px;
    }

    #FiUser {
      margin-right: 15px;
    }
  }
`;
export const TopHeader = styled.div`
  padding-top: 0;
  margin-top: 0;
  width: 100%;
  height: 1rem;
  background-color: #f30404;
`;
export const DownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #414141;
`;
export const LeftHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  padding-left: 5px;
`;
export const RightHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
`;
export const Icon = styled.a`
  &:hover {
    opacity: 0.8;
  }
`;
export const Login = styled.button`
  margin-right: 15px;
  color: #ffffff;
  background-color: #414141;
  border: 2px solid #ffffff;
  text-decoration: none;
  width: 10rem;
  align-items: center;
  font-weight: bold;
  font-size: medium;
  border-radius: 5px;
  &:hover {
    background-color: #ffffff;
    color: #414141;
    border: 2px solid #414141;
  }
`;
