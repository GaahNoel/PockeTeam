import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Header from '../../components/header';
import TeamComponent from '../../components/team';
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
  const [isUser, setIsUser] = useState(true);
  const [isInTeamPage, setIsInTeamPage] = useState(false);
  const [teamUserName, setTeamUserName] = useState('');
  const { user } = router.query;

  useEffect(() => {
    let userNameAux;

    if (!localStorage.getItem('username')) {
      toast.warn('Para acessar esta página é necessário estar logado');

      router.push('/login');
    } else {
      if (router.query.user) {
        if (router.query.user !== localStorage.getItem('username')) {
          userNameAux = router.query.user;
          setIsUser(false);
        } else {
          userNameAux = localStorage.getItem('username');
          setIsUser(true);
        }
      } else {
        userNameAux = localStorage.getItem('username');
        setIsUser(true);
      }

      setUserName(localStorage.getItem('username'));
      setTeamUserName(userNameAux);

      axios
        .get(`https://pocketeam.herokuapp.com/team/user/${userNameAux}`)
        .then((response) => {
          response.data.reverse();
          const teamFiltered = response.data.filter((team) => {
            if (
              !team.isPrivate ||
              team.user.username === localStorage.getItem('username')
            )
              return team;
          });
          setMyTeams(teamFiltered);
        });
    }
  }, [user]);

  return (
    <>
      <Helmet>
        {isUser ? (
          <title>PockeTeam - Meus Times</title>
        ) : (
          <title>PockeTeam - Times de {teamUserName}</title>
        )}
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Grid>
            <TitlePage>
              <div>
                {isUser ? (
                  <h2 id="title">Meus times</h2>
                ) : (
                  <h2 id="title">Times de {teamUserName}</h2>
                )}
                <p id="text">Classificado por: mais recentes</p>
              </div>
              {isUser && (
                <Link href="/team/create">
                  <button>Criar Um Time</button>
                </Link>
              )}
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
