/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import cors from 'cors';
import { Form } from '../styles/pages/UpdateList';

const pages: React.FC = () => {
  const pokemonListUpdate = (e) => {
    const pokemonList = [];
    e.preventDefault();
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1200')
      .then((response) => {
        response.data.results.forEach((data) => {
          pokemonList.push(data.name);
        });
        axios.post(
          'https://pocketeam.herokuapp.com/pokemon/update-list',
          pokemonList,
        );
      });
  };

  return (
    <>
      <Form onSubmit={pokemonListUpdate}>
        <button type="submit">Update</button>
      </Form>
    </>
  );
};

export default pages;
