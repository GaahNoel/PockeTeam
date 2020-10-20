/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { SportsCricketSharp } from '@material-ui/icons';
import { string } from 'yup';
import Header from '../../components/header';

import imageInterrogation from '../../assets/interrogation.png';
import {
  Wrapper,
  Container,
  Form,
  Item,
  PokemonSelect,
  MoveDetails,
  Move,
} from '../../styles/pages/Pokemon';

interface moveTypes {
  name: string;
  url: string;
}
interface PokemonTypes {
  types: Array<{
    name: string;
    url: string;
  }>;
  moves: moveTypes[];
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string;
  };
}
interface MoveDetails {
  type_name: string;

  damage_type: string;

  power: string;

  effect_name: string;

  accuracy: number;

  pp: number;
}

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonTypes>();
  const [pokemonName, setPokemonName] = useState('');

  const options = [
    { value: 'charmander', label: 'Charmander' },
    { value: 'charmeleon', label: 'Charmeleon' },
    { value: 'eevee', label: 'Eevee' },
  ];

  const [movesArray, setMovesArray] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);

  /* Seleções de moves */
  const [move1, setMove1] = useState('');
  const [move2, setMove2] = useState('');
  const [move3, setMove3] = useState('');
  const [move4, setMove4] = useState('');

  const [move1Details, setMove1Details] = useState<MoveDetails>();
  const [move2Details, setMove2Details] = useState<MoveDetails>();
  const [move3Details, setMove3Details] = useState<MoveDetails>();
  const [move4Details, setMove4Details] = useState<MoveDetails>();

  const changePokemon = (e: Select) => {
    if (e) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${e.value}`)
        .then((response) => {
          const { types, moves, stats, sprites } = response.data;

          setMove1('');
          setMove2('');
          setMove3('');
          setMove4('');

          setPokemon({
            types,
            moves,
            stats,
            sprites,
          });

          setPokemonName(e.value);
          setMovesArray([]);
          moves.forEach((move: any) => {
            setMovesArray((oldMoves: any) => [
              ...oldMoves,
              { value: move.move.url, label: move.move.name },
            ]);
          });
        });

      axios
        .get(`https://pokeapi.co/api/v2/item-attribute/holdable-active`)
        .then((response) => {
          const { items } = response.data;

          items.forEach((item: any) => {
            setItemsArray((oldItems: any) => [
              ...oldItems,
              { value: item.name, label: item.name },
            ]);
          });
        });
    }
  };

  // const requireItemDetails = (e: any, move: number) => {
  //   if (e) {
  //     axios.get(e.value).then((response) => {});
  //   }
  // };

  const requireMoveDetails = (e: Select, move: number) => {
    if (e) {
      axios.get(e.value).then((response) => {
        const {
          accuracy,
          damage_class: { name: damage_type },
          effect_chance,
          effect_entries,
          type: { name: type_name },
          pp,
          power,
        } = response.data;
        const effect_name = effect_entries[0].short_effect.replace(
          '$effect_chance%',
          effect_chance,
        );

        if (move === 1)
          setMove1Details({
            type_name,
            damage_type,
            power,
            effect_name,
            accuracy,
            pp,
          });
        else if (move === 2)
          setMove2Details({
            type_name,
            damage_type,
            power,
            effect_name,
            accuracy,
            pp,
          });
        else if (move === 3)
          setMove3Details({
            type_name,
            damage_type,
            power,
            effect_name,
            accuracy,
            pp,
          });
        else
          setMove4Details({
            type_name,
            damage_type,
            power,
            effect_name,
            accuracy,
            pp,
          });
      });
    }
  };

  const widthChange = {
    container: (provide: any, state: any) => ({
      ...provide,
      width: 170,
    }),

    input: (provide: any, state: any) => ({
      paddingRight: 25,
    }),
  };

  return (
    <>
      <Helmet>
        <title>Pokemania - Select Pokémon</title>
      </Helmet>
      <Header />
      <Wrapper>
        <Container>
          <h2>SELEÇÃO DE POKÉMON</h2>
          <Form>
            <PokemonSelect>
              <div>
                <h3>Pokémon</h3>
                <Select
                  options={options}
                  onChange={changePokemon}
                  name="pokemon"
                  className="pokemonSelect"
                />
              </div>
              {pokemonName ? (
                <img src={pokemon.sprites.front_default} alt="" />
              ) : (
                <img src={imageInterrogation} alt="" />
              )}
            </PokemonSelect>
            <div className="formMoves">
              <Move>
                <h3>MOVE 1</h3>
                <Select
                  options={movesArray}
                  name="move1"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    requireMoveDetails(e, 1);
                    setMove1(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                />
                <MoveDetails>
                  <p>
                    Tipo:{' '}
                    {move1Details && <span>{move1Details.type_name}</span>}
                  </p>
                  <p>
                    Tipo do dano:{' '}
                    {move1Details && <span>{move1Details.damage_type}</span>}
                  </p>
                  <p>
                    Poder: {move1Details && <span>{move1Details.power}</span>}
                  </p>
                  <p>
                    Precisão:{' '}
                    {move1Details && <span>{move1Details.accuracy}%</span>}
                  </p>
                  <p>PP: {move1Details && <span>{move1Details.pp}</span>}</p>
                  <p>
                    Efeito:{' '}
                    {move1Details && <span>{move1Details.effect_name}</span>}
                  </p>
                </MoveDetails>
              </Move>
              <Move>
                <h3>MOVE 2</h3>
                <Select
                  options={movesArray}
                  name="move2"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    requireMoveDetails(e, 2);
                    setMove2(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                />
                <MoveDetails>
                  <p>
                    Tipo:{' '}
                    {move2Details && <span>{move2Details.type_name}</span>}
                  </p>
                  <p>
                    Tipo do dano:{' '}
                    {move2Details && <span>{move2Details.damage_type}</span>}
                  </p>
                  <p>
                    Poder: {move2Details && <span>{move2Details.power}</span>}
                  </p>
                  <p>
                    Precisão:{' '}
                    {move2Details && <span>{move2Details.accuracy}%</span>}
                  </p>
                  <p>PP: {move2Details && <span>{move2Details.pp}</span>}</p>
                  <p>
                    Efeito:{' '}
                    {move2Details && <span>{move2Details.effect_name}</span>}
                  </p>
                </MoveDetails>
              </Move>
              <Move>
                <h3>MOVE 3</h3>
                <Select
                  options={movesArray}
                  name="move3"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    requireMoveDetails(e, 3);
                    setMove3(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                />
                <MoveDetails>
                  <p>
                    Tipo:{' '}
                    {move3Details && <span>{move3Details.type_name}</span>}
                  </p>
                  <p>
                    Tipo do dano:{' '}
                    {move3Details && <span>{move3Details.damage_type}</span>}
                  </p>
                  <p>
                    Poder: {move3Details && <span>{move3Details.power}</span>}
                  </p>
                  <p>
                    Precisão:{' '}
                    {move3Details && <span>{move3Details.accuracy}%</span>}
                  </p>
                  <p>PP: {move3Details && <span>{move3Details.pp}</span>}</p>
                  <p>
                    Efeito:{' '}
                    {move3Details && <span>{move3Details.effect_name}</span>}
                  </p>
                </MoveDetails>
              </Move>
              <Move>
                <h3>MOVE 4</h3>
                <Select
                  options={movesArray}
                  name="move4"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    requireMoveDetails(e, 4);
                    setMove4(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                />
                <MoveDetails>
                  <p>
                    Tipo:{' '}
                    {move4Details && <span>{move4Details.type_name}</span>}
                  </p>
                  <p>
                    Tipo do dano:{' '}
                    {move4Details && <span>{move4Details.damage_type}</span>}
                  </p>
                  <p>
                    Poder: {move4Details && <span>{move4Details.power}</span>}
                  </p>
                  <p>
                    Precisão:{' '}
                    {move4Details && <span>{move4Details.accuracy}%</span>}
                  </p>
                  <p>PP: {move4Details && <span>{move4Details.pp}</span>}</p>
                  <p>
                    Efeito:{' '}
                    {move4Details && <span>{move4Details.effect_name}</span>}
                  </p>
                </MoveDetails>
              </Move>
            </div>

            <Item>
              <h3>Item</h3>
              <Select
                options={itemsArray}
                name="item"
                isDisabled={!pokemonName}
              />
            </Item>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

export default Pokemon;