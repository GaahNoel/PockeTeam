import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  PureComponent,
} from 'react';

import Link from 'next/link';

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { SentimentSatisfied } from '@material-ui/icons';
import {
  Wrapper,
  Container,
  TeamName,
  FieldName,
  TeamSelect,
  Button,
  Buttons,
  Voltar,
  Form,
  PokemonSelect,
  PokemonStatsRadar,
  RadioDiv,
} from '../../styles/pages/CreateTeam';
import Header from '../../components/header';

const Team: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [userName, setUserName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [value, setValue] = useState('');
  const [team, setTeam] = useState([]);
  const [teamStats, setTeamStats] = useState({});
  const [favoriteTeam, setFavoriteTeam] = useState('false');
  const router = useRouter();
  const [radarData, setRadarData] = useState([
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
      setUserName(localStorage.getItem('username'));
      if (localStorage.getItem('team')) {
        // console.log(localStorage.getItem('team'));
        setTeam(JSON.parse(localStorage.getItem('team')));
      } else {
        localStorage.setItem('team', JSON.stringify(team));
      }
    }
  }, []);

  useEffect(() => {
    const arrayAux = [0, 0, 0, 0, 0, 0];

    if (localStorage.getItem('teamName')) {
      // console.log(localStorage.getItem('team'));
      const nameAux = localStorage.getItem('teamName').replaceAll(`"`, '');
      setTeamName(nameAux);
    }

    if (localStorage.getItem('private')) {
      // console.log(localStorage.getItem('team'));
      const privateAux = localStorage.getItem('private').replaceAll(`"`, '');

      privateAux ? setValue(privateAux) : setValue('public');
    }

    // setValue(privateAux);
    // setValue("public");

    if (team.length !== 0) {
      const test = team.map(async (pokemon) => {
        const response = await axios.get(
          `http://localhost:3333/pokemon/${pokemon.id}`,
        );

        arrayAux[0] += response.data.stats.hp;
        arrayAux[1] += response.data.stats.atk;
        arrayAux[2] += response.data.stats.def;
        arrayAux[3] += response.data.stats.spAtk;
        arrayAux[4] += response.data.stats.spDef;
        arrayAux[5] += response.data.stats.speed;
      });
      Promise.all(test).then(() => {
        arrayAux.forEach((info, index) => {
          arrayAux[index] = info / team.length;
        });
        setRadarData([]);
        setRadarData((oldData: any) => [
          ...oldData,
          {
            subject: 'hp',
            A: arrayAux[0],
          },
          {
            subject: 'attack',
            A: arrayAux[1],
          },
          {
            subject: 'defense',
            A: arrayAux[2],
          },
          {
            subject: 'sp.atk',
            A: arrayAux[3],
          },
          {
            subject: 'sp.def',
            A: arrayAux[4],
          },
          {
            subject: 'speed',
            A: arrayAux[5],
          },
        ]);
        setTeamStats({
          hp: arrayAux[0],
          atk: arrayAux[1],
          def: arrayAux[2],
          spAtk: arrayAux[3],
          spDef: arrayAux[4],
          speed: arrayAux[5],
        });
      });
    }
  }, [team]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    const teamDef = team.map((e) => {
      return e.id;
    });

    axios
      .post(`http://localhost:3333/team/create`, {
        user: userName,
        name: data.TeamName,
        pokemon: teamDef,
        isPrivate: value === 'private',
        stats: teamStats,
        favorite: favoriteTeam !== 'false',
      })
      .then((response) => {
        toast.success('Time cadastrado com sucesso!');
        localStorage.setItem('team', JSON.stringify([]));
        localStorage.setItem('private', 'public');
        localStorage.setItem('teamName', '');
        router.push('/team');
      });
  };

  const onChangeFavorite = () => {
    if (favoriteTeam === 'false') setFavoriteTeam('true');
    else setFavoriteTeam('false');
  };

  const onClick = (pokemon) => {
    axios
      .delete(`http://localhost:3333/pokemon/${team[pokemon].id}`)
      .then((response) => {
        console.log('Pokémon escolhido anteriormente retirado');
      });
    team.splice(pokemon, 1);
    localStorage.setItem('team', JSON.stringify(team));
    onClickInfo();
    router.push('/team/pokemon');
  };

  const onClickInfo = () => {
    localStorage.setItem('teamName', JSON.stringify(teamName));
    localStorage.setItem('private', JSON.stringify(value));
    router.push('/team/pokemon');
  };

  const onClickVoltar = () => {
    localStorage.setItem('teamName', JSON.stringify(''));
    localStorage.setItem('private', JSON.stringify('public'));
    team.forEach(async (e) => {
      await axios.delete(`http://localhost:3333/pokemon/${e.id}`);
    });
    localStorage.setItem('team', JSON.stringify([]));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Pokemania - Team</title>
      </Helmet>
      <Header />

      <Wrapper>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TeamName>
              <p>Nome do time</p>
              <FieldName
                error={errors.login}
                label="Team Name"
                variant="outlined"
                type="text"
                inputRef={register({ required: true })}
                name="TeamName"
                className="input"
                onChange={(e) => setTeamName(e.target.value)}
                helperText={errors.login && '* Campo Obrigatório !'}
                value={teamName}
              />
            </TeamName>

            <TeamSelect>
              <PokemonSelect>
                {team[0] ? (
                  <Button onClick={() => onClick(0)}>
                    <img src={team[0].image} alt="pokémon 1" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}

                {team[1] ? (
                  <Button onClick={() => onClick(1)}>
                    <img src={team[1].image} alt="pokémon 2" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}

                {team[2] ? (
                  <Button onClick={() => onClick(2)}>
                    <img src={team[2].image} alt="pokémon 3" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}

                {team[3] ? (
                  <Button onClick={() => onClick(3)}>
                    <img src={team[3].image} alt="pokémon 4" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}

                {team[4] ? (
                  <Button onClick={() => onClick(4)}>
                    <img src={team[4].image} alt="pokémon 5" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}

                {team[5] ? (
                  <Button onClick={() => onClick(5)}>
                    <img src={team[5].image} alt="pokémon 6" />
                  </Button>
                ) : (
                  <Link href="/team/pokemon">
                    <Button onClick={onClickInfo}>+</Button>
                  </Link>
                )}
              </PokemonSelect>
              <PokemonStatsRadar>
                <RadarChart
                  name={teamName}
                  cx={150}
                  cy={150}
                  outerRadius={100}
                  width={300}
                  height={300}
                  data={radarData}
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
              </PokemonStatsRadar>
            </TeamSelect>

            <RadioDiv>
              <FormLabel component="legend">Tipo de Visualização</FormLabel>
              <RadioGroup
                aria-label="ViewType"
                name="viewType"
                defaultValue="public"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Público"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Privado"
                />
              </RadioGroup>
            </RadioDiv>

            <p>
              <input
                type="checkbox"
                id="favoriteTeam"
                onChange={onChangeFavorite}
                value={favoriteTeam}
              />{' '}
              Time Favorito
            </p>
            <Buttons>
              <button type="submit">CONFIRMAR</button>
              <Link href="/team">
                <Voltar onClick={onClickVoltar}>VOLTAR</Voltar>
              </Link>
            </Buttons>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

export default Team;
