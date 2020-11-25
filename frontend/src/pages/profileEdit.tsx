import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Header from '../components/header';
import {
  Button,
  Wrapper,
  Container,
  Form,
  Desktop,
  Mobile,
  InputField,
  InfoField,
  InfosNotChange,
} from '../styles/pages/ProfileEdit';

interface RegisterTypes {
  login: string;
  username: string;
  email: string;
  password: string;
  info: string;
}

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [userName, setUserName] = useState('');
  const [starter, setStarter] = useState('');
  const [info, setInfo] = useState('');
  const [starterPokemon, setStarterPokemon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const options = [
    { label: 'bulbasaur', value: 'bulbasaur' },
    { label: 'charmander', value: 'charmander' },
    { label: 'squirtle', value: 'squirtle' },
    { label: 'chikorita', value: 'chikorita' },
    { label: 'cyndaquil', value: 'cyndaquil' },
    { label: 'totodile', value: 'totodile' },
    { label: 'treecko', value: 'treecko' },
    { label: 'torchic', value: 'torchic' },
    { label: 'mudkip', value: 'mudkip' },
    { label: 'turtwig', value: 'turtwig' },
    { label: 'chimchar', value: 'chimchar' },
    { label: 'piplup', value: 'piplup' },
    { label: 'snivy', value: 'snivy' },
    { label: 'tepig', value: 'tepig' },
    { label: 'oshawott', value: 'oshawott' },
    { label: 'chespin', value: 'chespin' },
    { label: 'fennekin', value: 'fennekin' },
    { label: 'froakie', value: 'froakie' },
    { label: 'rowlet', value: 'rowlet' },
    { label: 'litten', value: 'litten' },
    { label: 'popplio', value: 'popplio' },
  ];

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      toast.warn('Para acessar esta página é necessário estar logado');
      router.push('/login');
    }
    const userNameAux = localStorage.getItem('username');
    setUserName(userNameAux);

    axios
      .post('https://pocketeam.herokuapp.com/users/search', {
        username: userNameAux,
      })
      .then((response) => {
        setId(response.data._id);
        setInfo(response.data.info);
        setStarterPokemon(response.data.favoritePokemon);
        setEmail(response.data.email);
        setPassword(response.data.password);
      });
  }, []);

  const onSubmit = (data: RegisterTypes, e: FormEvent) => {
    const { login, username, email, password, info } = data;
    e.preventDefault();
    if(password){
      axios
      .put(`https://pocketeam.herokuapp.com/users/${id}`, {
        password,
        info,
        favoritePokemon: starterPokemon,
      })
      .then(() => {
        toast.success('Alterado com sucesso');
        Router.push('/profile');
      });
    }else{
      axios
      .put(`https://pocketeam.herokuapp.com/users/${id}`, {
        info,
        favoritePokemon: starterPokemon,
      })
      .then(() => {
        toast.success('Alterado com sucesso');
        Router.push('/profile');
      });
    }
    
  };

  const changePokemon = (e: Select) => {
    setStarterPokemon(e.value);
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
          <Mobile>EDITAR PERFIL</Mobile>

          <Form>
            <InfosNotChange>
              <span>UserName: @{userName}</span>
              <span>Email: {email}</span>
            </InfosNotChange>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                error={errors.password}
                label="Senha"
                type="password"
                variant="outlined"
                inputRef={register({ required: false })}
                name="password"
                className="input"
                helperText={errors.password && '* Campo Obrigatório !'}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
              {starterPokemon && (
                <Select
                  options={options}
                  onChange={changePokemon}
                  name="favoritePokemon"
                  className="pokemonSelect"
                  styles={widthChange}
                  inputRef={register({ required: true })}
                  required
                  placeholder="Starter Favorito"
                  defaultValue={{
                    label: starterPokemon,
                    value: starterPokemon,
                  }}
                />
              )}

              <div>
                <button type="submit">ALTERAR</button>
                <Link href="/profile">
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
