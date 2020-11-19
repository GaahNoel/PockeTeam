import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';
import TeamComponent from './components/teams';
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
  const [ profileUserName, setProfileUserName ] = useState('');
  const [info, setInfo] = useState('');
  const [starterPokemon, setStarterPokemon] = useState('');
  const [imgStarter, setImgStarter] = useState(imageInterrogation);
  const [favoriteTeam, setFavoriteTeam] = useState();
  const [ isUser, setIsUser ] = useState(true);


  useEffect(() => {
      let userNameAux;

      
      if(router.query.user)
      {
        if(localStorage.getItem('username'))
        {
          if(router.query.user !== localStorage.getItem('username'))
         {
            userNameAux = router.query.user;
            setIsUser(false);
          } 
          else{
            userNameAux = localStorage.getItem('username');
            setIsUser(true);
          }
        }
        else{
          userNameAux = router.query.user;
          setIsUser(false);
        } 
      }
      else{
        if(!localStorage.getItem('username'))
        {
          alert('Para acessar esta página é necessário estar logado');
          router.push('/login')
        }
        userNameAux = localStorage.getItem('username');
        setIsUser(true);
      }
      
      setProfileUserName(userNameAux);
      
        setUserName(userNameAux);

        axios
        .post('http://localhost:3333/users/search', {
          username: userNameAux,
        })
        .then(response => {
          setInfo(response.data.info);
          setStarterPokemon(response.data.favoritePokemon);
          setFavoriteTeam(response.data.favoriteTeam);

          if(response.data.favoritePokemon)
            axios.get(`https://pokeapi.co/api/v2/pokemon/${response.data.favoritePokemon}`).then( responseFavPoke =>{
              setImgStarter(responseFavPoke.data.sprites.front_default);
            })
        }); 
    },[])


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
              <img src={imgStarter}></img>
            </Photo>
            <Link href={{
              pathname: '/team',
              query:{user: profileUserName}
            }}>
                  <button>Times</button>
            </Link>
            {
            isUser&&<Link href="/team/">
                  <button>Editar Perfil</button>
            </Link>
            }
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
                {favoriteTeam &&<TeamComponent team={favoriteTeam}/>}
              </FavoriteTeam>
            </PokeInfos>

          </BotSide>
        </Container>
      </Wrapper>
    </>
  );
}
