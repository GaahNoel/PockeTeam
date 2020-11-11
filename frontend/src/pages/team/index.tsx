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
    
  } from '../../styles/pages/Team';

export default function Teams() {
    const router = useRouter();
    
    return (
      <>
        <Helmet>
          <title>Pokemania - My Teams</title>
        </Helmet>
        <Header />
        <Wrapper>
          <Container>
            <TitlePage>
            <p></p>
            </TitlePage>
          </Container>
        </Wrapper>
      </>
    );
  }
  