import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';

import { 
  Wrapper, 
  Container, 
  Title, 
  Photo, 
  TopSide,
  BotSide,
  Infos,
  PokeInfos,
  FavoriteStarter,
  FavoriteTeam,
} from '../styles/pages/Profile';

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
      if (!localStorage.getItem('username')) {
        alert('Para acessar esta página é necessário estar logado');

        router.push('/login');
      } else {
        const userNameAux = localStorage.getItem('username');
        setUserName(userNameAux);
      } 
    })


  return (
    <>
      <Helmet>
        <title>Pokemania - Profile</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Title>@{userName} -> Profile</Title>
          <TopSide>
            <Photo>
              <p>Photo</p>
            </Photo>
            <Link href="/team/">
                  <button>Times</button>
            </Link>
          </TopSide>
          <BotSide>
            <Infos>
              <p>Infos: </p>
            </Infos>

            <PokeInfos>
              <FavoriteStarter>
                <p>Inicial Favorito: </p>
              </FavoriteStarter>

              <FavoriteTeam>
                <p>Time Favorito: </p>
              </FavoriteTeam>
            </PokeInfos>

          </BotSide>
        </Container>
      </Wrapper>
    </>
  );
}
