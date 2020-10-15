import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

export default function Login() {
  const [login, setLogin] = useState('');
  const [username, setUsername] = useState('');
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <Helmet>
        <title>Pokemania - Login</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Mobile>LOGIN</Mobile>
          <Form>
            <form>
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
                name="login"
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
