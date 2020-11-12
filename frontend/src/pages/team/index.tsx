import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/header';

import {
    Wrapper,
    Container,
    TitlePage,
    Teams,
    Names,
    Pokemon,
  } from '../../styles/pages/Team';

  

export default function Team() {
    const router = useRouter();
    const [ myTeams, setMyTeams ] = useState([]);
    const [ userName, setUserName ] = useState('');

    useEffect(() => {

      
      const userNameAux = localStorage.getItem('username');
      setUserName(userNameAux);

      axios.get(`http://localhost:3333/team/user/${userNameAux}`).then((response) => {
        setMyTeams(response.data);
        console.log(response.data);
      });
    }, []);

    return (
      <>
        <Helmet>
          <title>Pokemania - My Teams</title>
        </Helmet>
        <Header />
        <Wrapper>
          <Container>
            <TitlePage>
            <p id="title">Meus times</p>
            <p id="text">Classificado por: mais recentes</p>
            </TitlePage>

            <Teams>
              {myTeams.map(team => (
                <>
                  <Names>
                      <p>Nome do Time: {team.name}</p>
                      <p>Tipo de Visualização: {team.isPrivate?'Privado':'Público'}</p>
                  </Names>

                  <Pokemon>
                    {team.pokemons.map(pokemon => (
                     <div>
                        <img src={pokemon.image}/>
                        <img src={pokemon.item}/>
                     </div>
                    ))}
                    </Pokemon>
                </>
              ))}
              
            </Teams>
          </Container>
        </Wrapper>
      </>
    );
  }
  