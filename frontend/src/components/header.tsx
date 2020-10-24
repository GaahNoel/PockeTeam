import React, { useState } from 'react';

import { FiUser, FiStar, FiHome } from 'react-icons/fi';
import Link from 'next/link';
import {
  Wrapper,
  Container,
  TopHeader,
  DownHeader,
  LeftHeader,
  RightHeader,
} from '../styles/components/Header';

export default function Header() {
  const [pesquisa, setPesquisa] = useState('');

  return (
    <Wrapper>
      <Container>
        <TopHeader />
        <DownHeader>
          <LeftHeader>
            <Link href="/">
              <FiHome id="FiHome" size="1.3rem" />
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
              <FiStar id="FiStar" size="1.3rem" />
            </Link>
            <Link href="/">
              <FiUser id="FiUser" size="1.3rem" />
            </Link>
          </RightHeader>
        </DownHeader>
      </Container>
    </Wrapper>
  );
}
