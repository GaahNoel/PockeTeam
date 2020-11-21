import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { array } from 'yup';
import TeamComponent from './components/teams';
import {
  Wrapper,
  Container,
  TitlePage,
  Teams,
  Grid,
} from '../styles/pages/Home';
import Header from '../components/header';

export default function Search() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [searchUserName, setSearchUserName] = useState('');
  const [isInSearchPage, setIsInSearchPage] = useState(true);

  useEffect(() => {
    const { user } = router.query;
    let username;
    if (user) {
      localStorage.setItem('search', String(user));
      setSearchUserName(String(user));
    } else {
      username = localStorage.getItem('search');
      console.log(username);
      setSearchUserName(String(username));
    }
  }, []);

  useEffect(() => {
    if (searchUserName) {
      localStorage.setItem('search', String(searchUserName));

      axios
        .get(`https://pocketeam.herokuapp.com/team/user/${searchUserName}`)
        .then((response) => {
          response.data.reverse();
          const teamFiltered = response.data.filter((team) => {
            if (!team.isPrivate) return team;
          });
          setTeams(teamFiltered);
        });
    }
  }, [searchUserName]);

  return (
    <>
      <Helmet>
        <title>PockeTeam - Pesquisa</title>
      </Helmet>
      <Header
        setSearchUserName={setSearchUserName}
        isInSearchPage={isInSearchPage}
      />
      <Wrapper>
        <Container>
          <Grid>
            <TitlePage>
              <div>
                <h2 id="title">Pesquisa</h2>
                <p id="text">Classificado por: mais recentes</p>
              </div>
            </TitlePage>
            <Teams>
              {teams.map((team) => (
                <TeamComponent team={team} />
              ))}
            </Teams>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
}
