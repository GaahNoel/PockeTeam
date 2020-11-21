import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Header from '../components/header';
import TeamComponent from '../components/team';
import imageInterrogation from '../assets/interrogation.png';
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
  const [profileUserName, setProfileUserName] = useState('');
  const [info, setInfo] = useState('');
  const [starterPokemon, setStarterPokemon] = useState('');
  const [imgStarter, setImgStarter] = useState(imageInterrogation);
  const [favoriteTeam, setFavoriteTeam] = useState();
  const [isUser, setIsUser] = useState(true);
  const username = router.query.user;

  useEffect(() => {
    let userNameAux;

    if (username) {
      if (localStorage.getItem('username')) {
        if (username !== localStorage.getItem('username')) {
          userNameAux = username;
          setIsUser(false);
        } else {
          userNameAux = localStorage.getItem('username');
          setIsUser(true);
        }
      } else {
        userNameAux = username;
        setIsUser(false);
      }
    } else {
      if (!localStorage.getItem('username')) {
        toast.warn('Para acessar esta página é necessário estar logado');
        router.push('/login');
      }
      userNameAux = localStorage.getItem('username');
      setIsUser(true);
    }

    setProfileUserName(userNameAux);

    setUserName(userNameAux);

    axios
      .post('https://pocketeam.herokuapp.com/users/search', {
        username: userNameAux,
      })
      .then((response) => {
        setInfo(response.data.info);
        setStarterPokemon(response.data.favoritePokemon);
        setFavoriteTeam(response.data.favoriteTeam);

        if (response.data.favoritePokemon)
          axios
            .get(
              `https://pokeapi.co/api/v2/pokemon/${response.data.favoritePokemon}`,
            )
            .then((responseFavPoke) => {
              setImgStarter(responseFavPoke.data.sprites.front_default);
            });
      });
  }, [username]);

  return (
    <>
      <Helmet>
        <title>Pokemania - Profile</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Title>@{userName} -&gt; Profile</Title>
          <TopSide>
            <Photo>
              <img src={imgStarter} />
            </Photo>
            <Link
              href={{
                pathname: '/team',
                query: { user: profileUserName },
              }}
            >
              <button>Times</button>
            </Link>
            {isUser && (
              <Link href="/profileEdit">
                <button>Editar Perfil</button>
              </Link>
            )}
          </TopSide>
          <BotSide>
            <Infos>
              <p>Infos: {info}</p>
            </Infos>

            <PokeInfos>
              <FavoriteStarter>
                <p>Inicial Favorito: {starterPokemon}</p>
              </FavoriteStarter>

              <FavoriteTeam>
                <p>Time Favorito: </p>
                {favoriteTeam && <TeamComponent team={favoriteTeam} />}
              </FavoriteTeam>
            </PokeInfos>
          </BotSide>
        </Container>
      </Wrapper>
    </>
  );
}
