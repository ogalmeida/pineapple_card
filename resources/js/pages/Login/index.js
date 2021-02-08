import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';
import { FiMail, FiLock } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/Input';
import Header from '../../components/Header';

import { Container } from './styles';

const Login = () => {

    const history = useHistory();
    const { addToast } = useToasts();

    const handleSubmit = (data) => {

        const { email, password } = data;

        api.post('login', { email, password }).then(response => {
            addToast('Login efetuado com sucesso!', { appearance: 'success' });
            localStorage.setItem('token', response.data.access_token);

            return history.push('/invoices');
        }).catch(error => {
            if(error.response.status == 401){
                addToast('Suas credenciais estão incorretas, tente novamente!', { appearance: 'warning' });
            } else {
                addToast('Ocorreu um erro interno no servidor, reporte aos adminstradores.', { appearance: 'error' });
            }
        });
    }

    return (
        <>
            <Header />
            <Container>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <h1>Faça seu login</h1>
                    <Input type="text" placeholder="E-mail" icon={FiMail} name="email" />
                    <Input type="password" placeholder="Senha" icon={FiLock} name="password" />
                    <button type="submit">Entrar</button>
                </Form>
            </Container>
        </>
        );
    }

    export default Login;
