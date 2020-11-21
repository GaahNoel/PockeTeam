/* eslint-disable camelcase */
import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  PureComponent,
} from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import Select from 'react-select';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Loader from 'react-loader-spinner';
import Router, { useRouter } from 'next/router';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
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
  ItemDetails,
  ItemImage,
  Buttons,
  Voltar,
} from '../../styles/pages/Pokemon';

interface itemTypes {
  name: string;
  effect: string;
  sprite: string;
}

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
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [pokemon, setPokemon] = useState<PokemonTypes>();
  const [pokemonName, setPokemonName] = useState('');
  const [options, setOptions] = useState([]);
  const [movesArray, setMovesArray] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* Seleções de moves */
  const [move1, setMove1] = useState('');
  const [move2, setMove2] = useState('');
  const [move3, setMove3] = useState('');
  const [move4, setMove4] = useState('');

  const [move1Details, setMove1Details] = useState<MoveDetails>();
  const [move2Details, setMove2Details] = useState<MoveDetails>();
  const [move3Details, setMove3Details] = useState<MoveDetails>();
  const [move4Details, setMove4Details] = useState<MoveDetails>();

  const [item, setItem] = useState('');
  const [itemDetails, setItemDetails] = useState<itemTypes>();
  const [stateMove1, setStateMove1] = useState({
    selection: 0,
  });
  const [stateMove2, setStateMove2] = useState({
    selection: 0,
  });
  const [stateMove3, setStateMove3] = useState({
    selection: 0,
  });
  const [stateMove4, setStateMove4] = useState({
    selection: 0,
  });

  const formRef = useRef<HTMLFormElement>();
  const [data, setData] = useState([
    {
      subject: 'hp',
      A: 0,
      fullMark: 150,
    },
    {
      subject: 'attack',
      A: 0,
      fullMark: 400,
    },
    {
      subject: 'defense',
      A: 0,
      fullMark: 1000,
    },
    {
      subject: 'sp.atk',
      A: 0,
      fullMark: 1000,
    },
    {
      subject: 'sp.def',
      A: 0,
      fullMark: 1000,
    },
    {
      subject: 'speed',
      A: 0,
      fullMark: 1000,
    },
  ]);

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      toast.warn('Para acessar esta página é necessário estar logado');
      router.push('/login');
    } else {
      axios
        .get('https://pocketeam.herokuapp.com/pokemon/all-pokemons')
        .then((response) => {
          response.data.list.forEach((pokemons) => {
            setOptions((oldPokemons: any) => [
              ...oldPokemons,
              { value: pokemons, label: pokemons },
            ]);
            setIsLoaded(true);
          });
        });
    }
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    axios
      .post('https://pocketeam.herokuapp.com/pokemon/create/', {
        name: pokemonName,
        image: pokemon.sprites.front_default,
        moves: [move1, move2, move3, move4],
        stats: {
          hp: pokemon.stats[0].base_stat,
          atk: pokemon.stats[1].base_stat,
          def: pokemon.stats[2].base_stat,
          spAtk: pokemon.stats[3].base_stat,
          spDef: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
        },
        item: {
          name: item || '',
          image: itemDetails ? itemDetails.sprite : '',
        },
      })
      .then((response) => {
        console.log(response.data);
        const dataTeam = JSON.parse(localStorage.getItem('team'));
        dataTeam.push({
          id: response.data._id,
          image: response.data.image,
        });
        localStorage.setItem('team', JSON.stringify(dataTeam));
        Router.push('/team/create');
      });
  };

  const reset = () => {
    setStateMove1({
      selection: 0,
    });
    setStateMove2({
      selection: 0,
    });
    setStateMove3({
      selection: 0,
    });
    setStateMove4({
      selection: 0,
    });

    setMove1(null);
    setMove2(null);
    setMove3(null);
    setMove4(null);

    setMove1Details(null);
    setMove2Details(null);
    setMove3Details(null);
    setMove4Details(null);
  };

  const onClickPokemonNotSelected = () => {
    toast.warning('Nenhum pokémon selecionado!');
  };

  const changePokemon = (e: Select) => {
    if (e) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${e.value}`)
        .then((response) => {
          const { types, moves, stats, sprites } = response.data;

          const form = formRef.current;
          form.reset();

          setPokemon({
            types,
            moves,
            stats,
            sprites,
          });
          reset();

          setPokemonName(e.value);
          setMovesArray([]);
          moves.forEach((move: any) => {
            setMovesArray((oldMoves: any) => [
              ...oldMoves,
              { value: move.move.url, label: move.move.name },
            ]);
          });
          setData([]);
          setData((oldStats: any) => [
            ...oldStats,
            {
              subject: stats[0].stat.name,
              A: stats[0].base_stat,
            },
            {
              subject: stats[1].stat.name,
              A: stats[1].base_stat,
            },
            {
              subject: stats[2].stat.name,
              A: stats[2].base_stat,
            },
            {
              subject: 'sp.atk',
              A: stats[3].base_stat,
            },
            {
              subject: 'sp.def',
              A: stats[4].base_stat,
            },
            {
              subject: stats[5].stat.name,
              A: stats[5].base_stat,
            },
          ]);
        });

      axios
        .get(`https://pokeapi.co/api/v2/item-attribute/holdable-active`)
        .then((response) => {
          const { items } = response.data;

          items.forEach((item: any) => {
            setItemsArray((oldItems: any) => [
              ...oldItems,
              { value: item.url, label: item.name },
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

  const requireItemDetails = (e: Select) => {
    if (e) {
      axios.get(e.value).then((response) => {
        const {
          effect_entries,
          category: { name },
          sprites: { default: sprite },
        } = response.data;
        const { effect } = effect_entries[0];
        setItemDetails({ effect, name, sprite });
      });
    }
  };
  const widthChange = {
    container: (provide: any) => ({
      ...provide,
      width: 200,
    }),

    input: (provide: any) => ({
      paddingRight: 15,
    }),
  };

  const widthChangePokeBox = {
    container: (provide: any) => ({
      ...provide,
      width: 100,
    }),
  };

  const widthChangeItemBox = {
    container: (provide: any) => ({
      ...provide,
      width: 300,
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
          <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <PokemonSelect>
              <div>
                <h3>Pokémon</h3>
                {isLoaded ? (
                  <Select
                    options={options}
                    onChange={changePokemon}
                    name="pokemon"
                    className="pokemonSelect"
                    styles={widthChange}
                    inputRef={register({ required: true })}
                    required
                  />
                ) : (
                  <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
                )}
              </div>

              {pokemonName ? (
                <>
                  <img src={pokemon.sprites.front_default} alt="" />
                </>
              ) : (
                <img src={imageInterrogation} alt="" />
              )}
              <div>
                <RadarChart
                  name={pokemonName}
                  cx={150}
                  cy={150}
                  outerRadius={100}
                  width={300}
                  height={300}
                  data={data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 255]} />
                  <Radar
                    dataKey="A"
                    stroke="#000000"
                    fill="#000000"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </div>
            </PokemonSelect>
            <div className="formMoves">
              <Move>
                <h3>MOVE 1</h3>
                <Select
                  value={stateMove1.selection}
                  options={movesArray}
                  name="move1"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    setStateMove1(e.value);
                    requireMoveDetails(e, 1);
                    setMove1(e.label);
                  }}
                  isDisabled={!pokemonName}
                  inputRef={register({ required: true })}
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
                  value={stateMove2.selection}
                  options={movesArray}
                  name="move2"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    setStateMove2(e.value);
                    requireMoveDetails(e, 2);
                    setMove2(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                  inputRef={register({ required: true })}
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
                  value={stateMove3.selection}
                  options={movesArray}
                  name="move3"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    setStateMove3(e.value);
                    requireMoveDetails(e, 3);
                    setMove3(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                  inputRef={register({ required: true })}
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
                  value={stateMove4.selection}
                  options={movesArray}
                  name="move4"
                  styles={widthChange}
                  onChange={(e: Select) => {
                    setStateMove4(e.value);
                    requireMoveDetails(e, 4);
                    setMove4(e.label);
                  }}
                  isDisabled={!pokemonName}
                  required
                  inputRef={register({ required: true })}
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
              <ItemDetails>
                <h3>Item</h3>
                <Select
                  options={itemsArray}
                  name="item"
                  isDisabled={!pokemonName}
                  styles={widthChangeItemBox}
                  onChange={(e: Select) => {
                    setItem(e.label);
                    requireItemDetails(e);
                  }}
                  inputRef={register({ required: true })}
                />
                <p>
                  Descrição: {itemDetails && <span>{itemDetails.effect}</span>}
                </p>
                <p>
                  Classificação:{' '}
                  {itemDetails && <span>{itemDetails.name}</span>}
                </p>
              </ItemDetails>
              <ItemImage>
                {itemDetails && <img src={itemDetails.sprite} alt="" />}
              </ItemImage>
            </Item>
            <Buttons>
              {pokemon ? (
                <button type="submit">SELECIONAR</button>
              ) : (
                <button type="button" onClick={onClickPokemonNotSelected}>
                  SELECIONAR
                </button>
              )}
              <Link href="/team/create">
                <Voltar>VOLTAR</Voltar>
              </Link>
            </Buttons>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

export default Pokemon;
