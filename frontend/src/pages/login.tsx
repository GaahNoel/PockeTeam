import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';

import {
  Wrapper,
  Container,
  Form,
  Desktop,
  Mobile,
  Button,
  Input,
} from '../styles/pages/Login';

interface LoginTypes {
  login: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const [username, setUsername] = useState('');
  // const teamName = localStorage.getItem('teamName');
  const router = useRouter();
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);
  const onSubmit = (data: LoginTypes, e: FormEvent) => {
    const { login, password } = data;

    e.preventDefault();
    axios
      .post('http://localhost:3333/users/login', {
        login,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('username', response.data.username);
          alert('Logado com Sucesso!');
          router.push('/');
        } else alert('Usuário Inválido');
      });
  };
  const load = () => {
    setUsername(localStorage.getItem('username'));
  };
  return (
    <>
      <Helmet>
        <title>Pokemania - Login</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Mobile>LOGIN</Mobile>
          {!username && (
            <Form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  error={errors.login}
                  label="Login"
                  variant="outlined"
                  type="text"
                  inputRef={register({ required: true })}
                  name="login"
                  className="input"
                  helperText={errors.login && '* Campo Obrigatório !'}
                />
                <Input
                  error={errors.login}
                  label="Password"
                  type="password"
                  variant="outlined"
                  inputRef={register({ required: true })}
                  name="password"
                  className="input"
                  helperText={errors.login && '* Campo Obrigatório !'}
                />

                <div>
                  <button type="submit">ENTRAR</button>
                  <Link href="/">
                    <Button>VOLTAR</Button>
                  </Link>
                </div>
              </form>
            </Form>
          )}

          <Desktop>
            <h3>LOGIN</h3>
            <h4>
              Fique por dentro dos times <p>preferidos e das principais</p>
              <p>estratégias de outros jogadores</p>
              <p> e fãs de pokémon.</p>
            </h4>
          </Desktop>
        </Container>
      </Wrapper>
    </>
  );
}
