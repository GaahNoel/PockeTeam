import React, {
    useState,
    useEffect,
    FormEvent,
    useRef,
    PureComponent,
  } from 'react';

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

import Link from 'next/link';

import { Helmet } from 'react-helmet';
import Header from '../../components/header';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { SentimentSatisfied } from '@material-ui/icons';

const Team:React.FC = ()=> {
    const { register, handleSubmit, errors } = useForm();
    const [ teamName, setTeamName ] = useState('');
    const [ value, setValue ] = useState('');
    const [team, setTeam] = useState([]);
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
      if(localStorage.getItem('team')){
        //console.log(localStorage.getItem('team'));
        setTeam(JSON.parse(localStorage.getItem('team')));
      }
      else{
        localStorage.setItem('team', JSON.stringify(team));
        
      }
    },[])

    useEffect(() => {
      const arrayAux = [0, 0, 0, 0, 0, 0];
  
      const nameAux = localStorage.getItem('teamName').replaceAll(`"`,"");
      const privateAux = localStorage.getItem('private').replaceAll(`"`,"");

      setTeamName(nameAux);

      {privateAux? setValue(privateAux): setValue('public')}
      //setValue(privateAux);
      console.log('AUX: '+ value);
      //setValue("public");

      if(team.length !== 0){
          const test = team.map(async(pokemon) =>{
          const response = await axios.get(`http://localhost:3333/pokemon/${pokemon.id}`)
      
            arrayAux[0]+=response.data.stats.hp;
            arrayAux[1]+=response.data.stats.atk;
            arrayAux[2]+=response.data.stats.def;
            arrayAux[3]+=response.data.stats.spAtk;
            arrayAux[4]+=response.data.stats.spDef;
            arrayAux[5]+=response.data.stats.speed;
        })
         Promise.all(test).then(() => {
          arrayAux.forEach((info, index) =>{
            arrayAux[index] = info/team.length;
          })
          setData([]);
          setData((oldData:any) => [
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
          ])
          console.log(arrayAux[0]);
          console.log(arrayAux[1]);
          console.log(arrayAux[2]);
          console.log(arrayAux[3]);
          console.log(arrayAux[4]);
          console.log(arrayAux[5]);
         });

        

      }
      
    },[team])

    const onSubmit = (data, e) => {
      e.preventDefault();
      const teamDef = team.map(e =>{
        return e.id;
      })
      console.log(data);
      console.log(value);
      console.log(teamDef);

      axios.post(`http://localhost:3333/team/create`,{
        name: data.TeamName,
        pokemons: teamDef,
        private: value==='private'?true:false,
      }).then(response => {
        alert("Time cadastrado com sucesso!");
        localStorage.setItem('team',JSON.stringify([]));
        Router.push("/");
      })
    }

    const onClick = (pokemon) => {
      axios.delete(`http://localhost:3333/pokemon/${team[pokemon].id}`).then(response =>{
      console.log('Pokémon escolhido anteriormente retirado');  
      });
      team.splice(pokemon,1);
      localStorage.setItem('team',JSON.stringify(team));
      onClickInfo();
      Router.push('/team/pokemon');
    }

    const onClickInfo = () => {
      localStorage.setItem('teamName',JSON.stringify(teamName));
      localStorage.setItem('private',JSON.stringify(value));
      Router.push('/team/pokemon');
    }

    const onClickVoltar = () => {
      localStorage.setItem('teamName',JSON.stringify(''));
      localStorage.setItem('private',JSON.stringify(''));
      team.forEach(async e => {
        await axios.delete(`http://localhost:3333/pokemon/${e.id}`)
      })
      localStorage.setItem('team',JSON.stringify([]));
    }

    const handleChange = (e) => {
      setValue(e.target.value);
    }

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
                  onChange={e => setTeamName(e.target.value)}
                  helperText={errors.login && '* Campo Obrigatório !'}
                  value={teamName}
                />
            </TeamName>

            <TeamSelect>
                  <PokemonSelect>
                      {team[0]?(
                            
                              <Button onClick={() => onClick(0)}><img src={team[0].image} alt="pokémon 1"/></Button>

                        ):(
                          <Link href="/team/pokemon">
                              <Button onClick={onClickInfo} >+</Button>
                          </Link>
                      )}
                    
                      {team[1]?(
                              
                              <Button onClick={() => onClick(1)}><img src={team[1].image} alt="pokémon 2"/></Button>
                        ):(
                          <Link href="/team/pokemon">
                              <Button onClick={onClickInfo}>+</Button>
                          </Link>
                      )}

                      {team[2]?(
                            
                            <Button onClick={() => onClick(2)}><img src={team[2].image} alt="pokémon 3"/></Button>
                      ):(
                        <Link href="/team/pokemon">
                            <Button onClick={onClickInfo}>+</Button>
                        </Link>
                      )}

                      {team[3]?(
                            
                            <Button onClick={() => onClick(3)}><img src={team[3].image} alt="pokémon 4"/></Button>
                      ):(
                        <Link href="/team/pokemon">
                            <Button onClick={onClickInfo}>+</Button>
                        </Link>
                      )}

                      {team[4]?(
                            
                            <Button onClick={() => onClick(4)}><img src={team[4].image} alt="pokémon 5"/></Button>
                      ):(
                        <Link href="/team/pokemon">
                            <Button onClick={onClickInfo}>+</Button>
                        </Link>
                      )}

                      {team[5]?(
                            
                            <Button onClick={() => onClick(5)}><img src={team[5].image} alt="pokémon 6"/></Button>
                      ):(
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
                  </PokemonStatsRadar>                
            </TeamSelect>

            <RadioDiv>
                  <FormLabel component="legend">Tipo de Visualização</FormLabel>
                  <RadioGroup aria-label="ViewType" name="viewType" defaultValue="public" value={value} onChange={handleChange}>
                    <FormControlLabel value="public" control={<Radio />} label="Público" />
                    <FormControlLabel value="private" control={<Radio />} label="Privado" />
                  </RadioGroup>
            </RadioDiv>

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
}

export default Team;
