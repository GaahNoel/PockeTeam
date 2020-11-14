import React, { FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';

import { Wrapper, Container, Title } from '../styles/pages/Profile';

export default function Profile() {
  const router = useRouter();

  return (
    <>
      <Helmet>
        <title>Pokemania - Profile</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <Title>Profile - </Title>
        </Container>
      </Wrapper>
    </>
  );
}
