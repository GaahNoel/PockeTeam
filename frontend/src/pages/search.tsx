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
import { array } from 'yup';



export default function Search(){

  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [ searchUserName , setSearchUserName ] = useState('');
  const [ inHome, setInHome ] = useState(false);

  useEffect(() => {
    setSearchUserName('');
    setInHome(true);
  }, []);

  useEffect(() => {
    setSearchUserName('');
    if(inHome)
    {
      axios.get(`http://localhost:3333/team/list`)
        .then((response) => {
          response.data.reverse();
          const teamFiltered = response.data.filter(team => {
            if(!team.isPrivate)
              return team;
          })
          setTeams(teamFiltered);
        }); 
    }   
  }, [inHome]);

  useEffect(() => {
    console.log('Teste')
    if(searchUserName)
    {
      axios.get(`http://localhost:3333/team/user/${searchUserName}`)
        .then((response) => {
          response.data.reverse();
          const teamFiltered = response.data.filter(team => {
            if(!team.isPrivate)
              return team;
          })
          setTeams(teamFiltered);
        }); 
    }
  }, [searchUserName]);

  return (
    <>
       <Helmet>
        <title>PockeTeam - Home</title>
      </Helmet>
      <Header setSearchUserName={setSearchUserName} setInHome={setInHome} />
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


