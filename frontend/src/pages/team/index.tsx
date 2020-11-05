import React, {
    useState,
    useEffect,
    FormEvent,
    useRef,
    PureComponent,
  } from 'react';

  import {
    Wrapper,
    Container,
    TeamName,
    FieldName,
    TeamSelect,
    Button,
    Buttons,
    Voltar,
    Form,
  } from '../../styles/pages/Team';

import Link from 'next/link';

import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

const Team:React.FC = ()=> {
    const { register, handleSubmit, errors } = useForm();

    const [team, setTeam] = useState([]);

  
    useEffect(() => {
      if(localStorage.getItem('team')){
        //console.log(localStorage.getItem('team'));
        setTeam(JSON.parse(localStorage.getItem('team')));
      }
      else{
        localStorage.setItem('team', JSON.stringify(team));
        
      }
    },[])

    useEffect(() => {
      console.log(team);
    },[team])

    const onSubmit = (data, e) => {
      e.preventDefault();
    }

    const onClick = (pokemon) => {
      axios.delete(`http://localhost:3333/pokemon/${team[pokemon].id}`).then(response =>{
      console.log('Pokémon escolhido anteriormente retirado');  
      });
      team.splice(pokemon,1);
      localStorage.setItem('team',JSON.stringify(team));
      Router.push('/team/pokemon');
    }

    return (
    <>
      <Helmet>
        <title>Pokemania - Team</title>
      </Helmet>
      <Header />
    
      <Wrapper>
        <Container>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <TeamName>
                <p>Nome do time</p>
                <FieldName
                  error={errors.login}
                  label="Team Name"
                  variant="outlined"
                  type="text"
                  inputRef={register({ required: true })}
                  name="TeamName"
                  className="input"
                  helperText={errors.login && '* Campo Obrigatório !'}
                />
            </TeamName>
            <TeamSelect >
              
                {team[0]?(
                      
                        <Button onClick={() => onClick(0)}><img src={team[0].image} alt="pokémon 1"/></Button>

                  ):(
                    <Link href="/team/pokemon">
                        <Button>+</Button>
                    </Link>
                )}
              
                {team[1]?(
                        
                        <Button onClick={() => onClick(1)}><img src={team[1].image} alt="pokémon 2"/></Button>
                  ):(
                    <Link href="/team/pokemon">
                        <Button>+</Button>
                    </Link>
                )}

                {team[2]?(
                      
                      <Button onClick={() => onClick(2)}><img src={team[2].image} alt="pokémon 3"/></Button>
                ):(
                  <Link href="/team/pokemon">
                      <Button>+</Button>
                  </Link>
                )}

                {team[3]?(
                      
                      <Button onClick={() => onClick(3)}><img src={team[3].image} alt="pokémon 4"/></Button>
                ):(
                  <Link href="/team/pokemon">
                      <Button>+</Button>
                  </Link>
                )}

                {team[4]?(
                      
                      <Button onClick={() => onClick(4)}><img src={team[4].image} alt="pokémon 5"/></Button>
                ):(
                  <Link href="/team/pokemon">
                      <Button>+</Button>
                  </Link>
                )}

                {team[5]?(
                      
                      <Button onClick={() => onClick(5)}><img src={team[5].image} alt="pokémon 6"/></Button>
                ):(
                  <Link href="/team/pokemon">
                      <Button>+</Button>
                  </Link>
                )}
                
            </TeamSelect>
            <Buttons>
              <button type="submit">CONFIRMAR</button>
              <Link href="/">
                <Voltar>VOLTAR</Voltar>
              </Link>
            </Buttons>
          </Form>
        </Container>
      </Wrapper> 
    </>
  );
}

export default Team;
