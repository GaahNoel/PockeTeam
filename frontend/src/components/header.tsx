import React, { useState, useEffect } from 'react';

import { FiUser, FiHome, FiPower } from 'react-icons/fi';
import { GiBigGear } from 'react-icons/gi';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import {
  Wrapper,
  Container,
  TopHeader,
  DownHeader,
  LeftHeader,
  RightHeader,
  Icon,
  Login,
} from '../styles/components/Header';

interface PropTypes {
  setSearchUserName?: (username: string) => void;
  isInSearchPage?: boolean;
}

export const Header: React.FC<PropTypes> = ({
  setSearchUserName,
  isInSearchPage,
}) => {
  const [pesquisa, setPesquisa] = useState('');
  const router = useRouter();
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);
  const logout = () => {
    if(localStorage.getItem('username'))
    {
      toast.dark('Logout Realizado Com Sucesso');
      router.push('/');
    }
    setUsername('');
    localStorage.clear();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isInSearchPage) {
      setSearchUserName(pesquisa);
    }
    router.push({ pathname: '/search', query: { user: pesquisa } });
  };

  return (
    <Wrapper>
      <Container>
        <TopHeader />
        <DownHeader>
          <LeftHeader>
            <Link href="/">
              <Icon>
                <FiHome id="FiHome" size="1.3rem" />
              </Icon>
            </Link>
            <form onSubmit={(e) => onSubmit(e)}>
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
          {username?(   
            <>
              <span>Olá, @{username}</span>     
              <Link
                  href={{
                    pathname: '/team',
                    query: { user: username },
                  }}
                >
                  <Icon>
                    <GiBigGear id="GiBigGear" size="1.3rem" />
                  </Icon>
                </Link>
            </>
             ):
              <Link href="/login">
                <Login>Fazer login</Login>
              </Link>
             }

            {username && (
              <Icon onClick={logout}>
                <FiPower id="FiPower" size="1.3rem" />
              </Icon>
            )}

            <Link href="/profile">
              <Icon>
                <FiUser id="FiUser" size="1.3rem" />
              </Icon>
            </Link>
            
          </RightHeader>
        </DownHeader>
      </Container>
    </Wrapper>
  );
};

export default Header;
