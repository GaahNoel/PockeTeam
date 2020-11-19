import React, { useState, useEffect } from 'react';

import { FiUser, FiStar, FiHome, FiPower } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import {
  Wrapper,
  Container,
  TopHeader,
  DownHeader,
  LeftHeader,
  RightHeader,
  Icon,
} from '../styles/components/Header';

interface PropTypes{
  setSearchUserName?: (username: string) => void,
  setInHome?: (inHome: boolean) => void,
}

export const Header:React.FC<PropTypes> = ({setSearchUserName, setInHome}) => {
  const [pesquisa, setPesquisa] = useState('');
  const router = useRouter();
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);
  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(pesquisa);
    setInHome(false);
    setSearchUserName(pesquisa);
  }

  return (
    <Wrapper>
      <Container>
        <TopHeader />
        <DownHeader>
          <LeftHeader>
            <Link href="/">
              <Icon onClick={()=>setInHome(true)}>
                <FiHome id="FiHome" size="1.3rem" />
              </Icon>
            </Link>
            <form onSubmit={e => onSubmit(e)}>
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquise por usuários"
                id="Pesquisa"
              />
            </form>
          </LeftHeader>

          <RightHeader>
            <Link href="/">
              <Icon>
                <FiStar id="FiStar" size="1.3rem" />
              </Icon>
            </Link>
            {username && (
              <Icon onClick={logout}>
                <FiPower id="FiPower" size="1.3rem" />
              </Icon>
            )}

            <Link href="/">
              <Icon>
                <FiUser id="FiUser" size="1.3rem" />
              </Icon>
            </Link>
          </RightHeader>
        </DownHeader>
      </Container>
    </Wrapper>
  );
}

export default Header;