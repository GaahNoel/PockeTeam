import React, { FormEvent, useEffect, useState } from 'react';
import Header from '../components/header';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import TeamComponent from './components/teams';
import { useRouter } from 'next/router';
import {
  Wrapper,
  Container,
  TitlePage,
  Teams,
  Grid,
} from '../styles/pages/Home';



export default function Home(){

  const router = useRouter();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:3333/team/list`)
        .then((response) => {
          response.data.reverse();
          setTeams(response.data);
          console.log(response.data);
        });
    
  }, []);

  return (
    <>
       <Helmet>
        <title>PockeTeam - Home</title>
      </Helmet>
      <Header />
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
};


