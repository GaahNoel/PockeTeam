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

    const onSubmit = (data, e) => {
      e.preventDefault();
    }

    const handleClick = () =>{
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
            <TeamSelect>
                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>

                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>

                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>

                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>

                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>

                <Link href="/">
                    <Button onClick={handleClick}>+</Button>
                </Link>
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
