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
  } from '../../styles/pages/Team';

import Link from 'next/link';

import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Team:React.FC = ()=> {
    const { register, handleSubmit, errors } = useForm();

    return (
    <>
      <Helmet>
        <title>Pokemania - Team</title>
      </Helmet>
      <Header />
    
      <Wrapper>
        <Container>
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
                    <Button>+</Button>
                </Link>

                <Link href="/">
                    <Button>+</Button>
                </Link>

                <Link href="/">
                    <Button>+</Button>
                </Link>

                <Link href="/">
                    <Button>+</Button>
                </Link>

                <Link href="/">
                    <Button>+</Button>
                </Link>

                <Link href="/">
                    <Button>+</Button>
                </Link>
            </TeamSelect>
        </Container>
      </Wrapper> 
    </>
  );
}
export default Team;