import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

// import { Container } from './styles';

const Email: React.FC = () => {
  const router = useRouter();
  const token = router.query.token;
  
    useEffect(()=>{
        if(token){
            console.log(token);
            axios.get(`http://localhost:3333/email/${router.query.token}`).then(() => {
                toast.success('Usuário validado com sucesso!');
            }).catch(error => {
                toast.error(error.response.data.message);
            })
        }
    }, [token])
    

  return (
    <>
        <span>teste</span>
    </>
  );
}

export default Email;