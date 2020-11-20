import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { WiStars } from 'react-icons/wi';
import Axios from 'axios';
import {
  Team,
  Names,
  Pokemon,
  Info,
  Graph,
  Item,
  Empty,
} from '../../styles/components/Team';

// import { Container } from './styles';
type PropTypes = {
  team: {
    name: string;
    user: any;
    isPrivate: boolean;
    pokemon: any;
    stats: any;
    favorite: boolean;
  };
};

const TeamComponent: React.FC<PropTypes> = ({
  team: { name, user, isPrivate, pokemon, stats, favorite },
}) => {
  const router = useRouter();
  const [empty, setEmpty] = useState([]);

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
    const initialQtd = pokemon.length;
    console.log(empty);
    for (let i = 0; i < 6 - initialQtd; i++) {
      setEmpty((element) => [...element, i]);
    }

    if (stats) {
      setRadarData([]);
      setRadarData((oldData: any) => [
        ...oldData,
        {
          subject: 'hp',
          A: stats.hp,
        },
        {
          subject: 'attack',
          A: stats.atk,
        },
        {
          subject: 'defense',
          A: stats.def,
        },
        {
          subject: 'sp.atk',
          A: stats.spAtk,
        },
        {
          subject: 'sp.def',
          A: stats.spDef,
        },
        {
          subject: 'speed',
          A: stats.speed,
        },
      ]);
    }
  }, [pokemon]);

  return (
    <Team>
      <Info>
        <Names>
          {user.username && (
            <span>
              <strong>Username: </strong>
              <Link
                href={{
                  pathname: '/profile',
                  query: { user: user.username },
                }}
              >
                {user.username}
              </Link>
            </span>
          )}

          <span>
            <strong>Nome: </strong>
            {name}
          </span>
          <p>
            <strong>Tipo: </strong>
            {isPrivate ? 'Privado' : 'Público'}
          </p>
          {favorite && <WiStars size="40px" />}
        </Names>

        <Pokemon>
          {pokemon.map((poke) => (
            <div>
              <img src={poke.image} alt="Imagem de pokemon" />
              {poke.item && poke.item.image && (
                <Item>
                  <img src={poke.item.image} alt="Imagem de ítem de Pokemon" />
                </Item>
              )}
            </div>
          ))}
          {empty.map((element) => (
            <Empty>
              <span>-</span>
            </Empty>
          ))}
        </Pokemon>
      </Info>
      <Graph>
        <RadarChart
          name={name}
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
      </Graph>
    </Team>
  );
};

export default TeamComponent;
