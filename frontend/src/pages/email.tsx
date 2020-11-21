import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Wrapper, Container, Button } from '../styles/pages/Email';
import Header from '../components/header';

// import { Container } from './styles';

const Email: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      axios
        .get(`https://pocketeam.herokuapp.com/email/${router.query.token}`)
        .then(() => {
          toast.success('Usuário validado com sucesso!');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }, [token]);

  return (
    <>
      <>
        <Helmet>
          <title>PockeTeam - Home</title>
        </Helmet>
        <Header />
        <Wrapper>
          <Container>
            <h2> Email Confirmado com Sucesso !</h2>
            <h3>
              {' '}
              Utilize o botão de perfil no Header para logar e continuar ou
              clique no botão abaixo !
            </h3>
            <Link href="/login">
              <Button>Ir para Login</Button>
            </Link>
          </Container>
        </Wrapper>
      </>
    </>
  );
};

export default Email;
