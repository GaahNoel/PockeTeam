import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/header';
import TeamComponent from '../components/teams';
import {
  Wrapper,
  Container,
  TitlePage,
  Teams,
  Grid,
} from '../../styles/pages/Team';

export default function Team() {
  const router = useRouter();
  const [myTeams, setMyTeams] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      alert('Para acessar esta página é necessário estar logado');

      router.push('/login');
    } else {
      setUserName(localStorage.getItem('username'));
      const userNameAux = localStorage.getItem('username');
      setUserName(userNameAux);

      axios
        .get(`http://localhost:3333/team/user/${userNameAux}`)
        .then((response) => {
          response.data.reverse();
          setMyTeams(response.data);
          console.log(response.data);
        });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>PockeTeam - Meus Times</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Grid>
            <TitlePage>
              <div>
                <h2 id="title">Meus times</h2>
                <p id="text">Classificado por: mais recentes</p>
              </div>
              <Link href="/team/create">
                <button>Criar Um Time</button>
              </Link>
            </TitlePage>
            <Teams>
              {myTeams.map((team) => (
                <TeamComponent team={team} />
              ))}
            </Teams>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
}
