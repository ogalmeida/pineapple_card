import React, { createContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/api';
import { useToasts } from 'react-toast-notifications';

import Loading from '../components/Loading';
import Header from '../components/Header';

export const AuthContext = createContext();

const AuthContextProvider = ({ children })  => {

    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState({});

    const { addToast } = useToasts();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            api.get('auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(response => {
                setAuthenticated(true);
                setToken(token);
                setLoading(false);
                setCard(response.data.card);
            }).catch(error => {
                console.log(error.response);
                if(error.response.status == 401){
                    localStorage.removeItem('token');
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if(loading){
        return <Loading />;
    }

    if(!authenticated){
        addToast('Seu token expirou ou não foi encontrado. Faça login novamente para continuar!', { appearance: 'warning' });
        return <Redirect to="/login" />
    }

    return (
        <AuthContext.Provider value={{ authenticated, token, card }}>
            <Header />
            { children }
        </AuthContext.Provider>
    );
}

    export default AuthContextProvider;
