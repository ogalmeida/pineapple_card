import React, { useContext, useCallback } from 'react';

import { AuthContext } from '../../context/auth';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import api from '../../services/api';

import Logo from '../../../img/logo.svg';

import { Container } from './styles';

const Header = () => {

    const hasContext = useContext(AuthContext);
    const { addToast } = useToasts();
    const history = useHistory();

    const handleLogout = useCallback(() => {
        api.get('/auth/logout', { headers: { Authorization: `Bearer ${hasContext.token}` } }).then(response => {
            addToast(response.data.message, { appearance: 'success' });
            return history.push('/login');
        }).catch(error => {
            addToast('Não foi possível fazer logout, tente novamente mais tarde!', { appearance: 'error' });
            console.log(error.response);
        })
    }, []);

    return (
        <Container>
            <div>
                <img src={Logo} alt="Pineapple Card"/>
                {!!hasContext && hasContext.authenticated && (
                    <span onClick={handleLogout}>Sair</span>
                )}
            </div>
        </Container>
    );
}

export default Header;
