import React, { useState, useEffect } from 'react';

import { FiUser, FiStar, FiHome, FiPower } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Wrapper,
  Container,
  TopHeader,
  DownHeader,
  LeftHeader,
  RightHeader,
  Icon,
} from '../styles/components/Header';

export default function Header() {
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
            <form>
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
