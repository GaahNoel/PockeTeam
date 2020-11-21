import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { array } from 'yup';
import TeamComponent from '../components/team';
import {
  Wrapper,
  Container,
  TitlePage,
  Teams,
  Grid,
} from '../styles/pages/Home';
import Header from '../components/header';

export default function Home() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [searchUserName, setSearchUserName] = useState('');
  const [inHome, setInHome] = useState(false);

  useEffect(() => {
    setSearchUserName('');
    setInHome(true);
  }, []);

  useEffect(() => {
    setSearchUserName('');
    if (inHome) {
      axios
        .get(`https://pocketeam.herokuapp.com/team/list`)
        .then((response) => {
          response.data.reverse();
          const teamFiltered = response.data.filter((team) => {
            if (!team.isPrivate) return team;
          });
          setTeams(teamFiltered);
        });
    }
  }, [inHome]);

  useEffect(() => {
    if (searchUserName) {
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
        <title>PockeTeam - Home</title>
      </Helmet>
      <Header setSearchUserName={setSearchUserName} />
      <Wrapper>
        <Container>
          <Grid>
            <TitlePage>
              <div>
                <h2 id="title">Inicio</h2>
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
