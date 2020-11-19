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
  const [ isUser, setIsUser ] = useState(true);
  const [ teamUserName, setTeamUserName ] = useState('');

  useEffect(() => {

    let userNameAux;

      if (!localStorage.getItem('username')) {
        alert('Para acessar esta página é necessário estar logado');

        router.push('/login');
      }
      else {

        if(router.query.user)
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
          userNameAux = localStorage.getItem('username');
          setIsUser(true);
        }

        setUserName(localStorage.getItem('username'));
        setTeamUserName(userNameAux);

        axios
          .get(`http://localhost:3333/team/user/${userNameAux}`)
          .then((response) => {
            response.data.reverse();
            const teamFiltered = response.data.filter(team => {
              if(!team.isPrivate || team.user.username === localStorage.getItem('username'))
                return team;
            })
            setMyTeams(teamFiltered);
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
