import React, { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Header from '../components/header';
import Router, { useRouter } from 'next/router';
import {
  Button,
  Wrapper,
  Container,
  Form,
  Desktop,
  Mobile,
  InputField,
  InfoField,
} from '../styles/pages/Register';

interface RegisterTypes {
  login: string;
  username: string;
  email: string;
  password: string;
  info: string;
}

export default function Register() {
  const { register, handleSubmit, errors } = useForm();
  const [ starter, setStarter ] = useState('');
  const options = [
   {label:"bulbasaur", value:"bulbasaur"},
   {label:"charmander", value:"charmander"},
   {label:"squirtle", value: "squirtle"},
   {label: "chikorita", value: "chikorita"},
   {label:"cyndaquil", value:"cyndaquil"}, 
   {label:"totodile", value:"totodile"},
   {label:"treecko", value:"treecko"},
   {label:"torchic", value: "torchic"},
   {label: "mudkip", value: "mudkip"},
   {label: "turtwig", value: "turtwig"},
   {label: "chimchar", value: "chimchar"},
   {label: "piplup", value: "piplup"},
   {label: "snivy", value: "snivy"},
   {label: "tepig", value: "tepig"},
   {label: "oshawott", value: "oshawott"},
   {label: "chespin", value: "chespin"},
   {label: "fennekin", value: "fennekin"},
   {label: "froakie", value: "froakie"},
   {label: "rowlet", value: "rowlet"}, 
   {label: "litten", value: "litten"},
   {label: "popplio", value: "popplio"}]

  const onSubmit = (data: RegisterTypes, e: FormEvent) => {
    const { login, username, email, password, info } = data;
    console.log(data);
    e.preventDefault();
    axios
      .post('http://localhost:3333/users/create', {
        login,
        username,
        email,
        password,
        info,
        favoritePokemon: starter,
      })
      .then(() => {
        alert('Enviado com sucesso');
        Router.push('/');
      });
  };

  const changePokemon = (e: Select) => {
    setStarter(e.value);
  };

  const widthChange = {
    container: (provide: any) => ({
      ...provide,
      width: 430,
     
    }),

    input: (provide: any) => ({
      paddingRight: 15,
    }),
  };

  return (
    <>
      <Helmet>
        <title>Pokemania - Registro</title>
      </Helmet>

      <Header />
      <Wrapper>
        <Container>
          <Mobile>CADASTRO</Mobile>
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                error={errors.login}
                label="Login"
                variant="outlined"
                inputRef={register({ required: true })}
                name="login"
                className="input"
                helperText={errors.login && '* Campo Obrigatório !'}
              />
              <InputField
                error={errors.username}
                label="Username"
                variant="outlined"
                inputRef={register({ required: true })}
                name="username"
                className="input"
                helperText={errors.username && '* Campo Obrigatório !'}
              />
              <InputField
                error={errors.email}
                label="Email"
                variant="outlined"
                inputRef={register({ required: true })}
                name="email"
                className="input"
                helperText={errors.email && '* Campo Obrigatório !'}
              />
              <InputField
                error={errors.password}
                label="Senha"
                type="password"
                variant="outlined"
                inputRef={register({ required: true })}
                name="password"
                className="input"
                helperText={errors.password && '* Campo Obrigatório !'}
              />
              <InputField
                error={errors.confirmPassword}
                label="Confirmar Senha"
                type="password"
                variant="outlined"
                inputRef={register({ required: true })}
                name="confirmPassword"
                className="input"
                helperText={errors.confirmPassword && '* Campo Obrigatório !'}
              />
              <InfoField
                error={errors.info}
                label="Informações"
                variant="outlined"
                inputRef={register({ required: true })}
                name="info"
                className="input"
                helperText={errors.info && '* Campo Obrigatório !'}
                multiline
              />
              <Select
                    options={options}
                    onChange={changePokemon}
                    name="favoritePokemon"
                    className="pokemonSelect"
                    styles={widthChange}
                    inputRef={register({ required: true })}
                    required
                    placeholder="Starter Favorito"
                  />
              <div>
                <button type="submit">CRIAR</button>
                <Link href="/">
                  <Button>VOLTAR</Button>
                </Link>
              </div>
            </form>
          </Form>

          <Desktop>
            <h3>CADASTRO</h3>
            <h4>
              Realize o cadastro e faça parte do PockeTeam,
              <p>o site desenvolvido de fãs para fãs.</p>
            </h4>
          </Desktop>
        </Container>
      </Wrapper>
    </>
  );
}
