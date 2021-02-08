import React, { useState, useEffect, useContext, useCallback } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FiCheckCircle, FiCornerUpRight, FiMapPin, FiCircle, FiChevronLeft, FiChevronRight, FiCreditCard } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import api from '../../services/api';

import { AuthContext } from '../../context/auth';

import { Margin } from '../../styles/global';

import { Container, Status, Transaction, IconText } from './styles';

const Invoice = () => {

    const { token, card } = useContext(AuthContext);

    const [date, setDate] = useState('08/2020');
    const [transactions, setTransactions] = useState([]);
    const [transactionInfo, setTransactionInfo] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [activeMap, setActiveMap] = useState(0);

    const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1Ijoib2dhbG1laWRhIiwiYSI6ImNra3Zlb2R1ZDEyNDMydm4weGZqbThtbnkifQ.8HKiCi3lRKm2ZahFd23GrA'
    });

    useEffect(() => {
        api.get('/transactions/info', { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            setTransactionInfo(response.data);
            setDate(response.data.last);
            setHasNext(false);
            setHasPrevious(true);
        }).catch(error => {
            console.log(error.response);
        });
    }, []);

    useEffect(() => {
        api.get(`/transactions?date=${date}`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            setTransactions(response.data.transactions);
            const invoice = response.data.invoice;

            switch(invoice.status){
                case 'open':
                    invoice.status = 'Em aberto';
                    invoice.color = '#f8b600';
                break;
                case 'closed':
                    invoice.status = 'Fechada';
                    invoice.color = '#c53030';
                break;
                case 'payd':
                    invoice.status = 'Pago';
                    invoice.color = '#5af27d';
                break;
            }
            setInvoice(invoice);
        }).catch(error => {
            console.log(error.response);
        });
    }, [date]);

    const handlePreviousDate = useCallback(() => {
        var month = parseInt(date.split('/')[0]);
        var year = parseInt(date.split('/')[1]);

        if(month == 1){
            month = 12;
            year -= 1;
        } else {
            month -= 1;
        }

        const minMonth = parseInt(transactionInfo.first.split('/')[0]);
        const minYear = parseInt(transactionInfo.first.split('/')[1]);

        if(month <= minMonth && year <= minYear){
            setHasPrevious(false);
        }

        month = month < 10 ? `0${month}` : `${month}`;

        setDate(`${month}/${year}`);
        setHasNext(true);
    }, [date]);

    const handleNextDate = useCallback(() => {
        var month = parseInt(date.split('/')[0]);
        var year = parseInt(date.split('/')[1]);
        if(month == 12){
            month = 1;
            year += 1;
        } else {
            month += 1;
        }

        const maxMonth = parseInt(transactionInfo.last.split('/')[0]);
        const maxYear = parseInt(transactionInfo.last.split('/')[1]);

        if(month >= maxMonth && year >= maxYear){
            setHasNext(false);
        }

        month = month < 10 ? `0${month}` : `${month}`;
        setDate(`${month}/${year}`);
        setHasPrevious(true);
    }, [date]);

    const formatDate = useCallback(date => {
        const fullDate = date.split('-');
        const day = fullDate[2];
        const month = fullDate[1];
        return `${day}/${month}`;
    }, []);

    const getHour = useCallback(() => {
        const date = new Date();
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${minute}`;
    }, []);

    return (
        <Margin>
            <Container>
                <Status color={invoice.color}>
                    {hasPrevious && <FiChevronLeft size="40" style={{ left: '10px' }} onClick={handlePreviousDate} />}
                    <div>
                        {invoice.status} - {date}
                        <span>
                            {invoice.status == 'Em aberto' && `Disponível: R$ ${(parseFloat(card.limit) - parseFloat(invoice.value)).toFixed(2)}`} <br/>
                            Pontos: {card.score}
                        </span>
                    </div>
                    {hasNext && <FiChevronRight size="40" style={{ right: '10px' }} onClick={handleNextDate} />}
                </Status>
                <Transaction>
                    <li>
                        <div>
                            <div>
                                <IconText><FiCircle color={invoice.color} size="20"/> {invoice.status} </IconText>
                                <IconText>
                                    <FaRegMoneyBillAlt size="20"/>R$ {invoice?.value?.toFixed(2)}
                                </IconText>
                            </div>
                            {/* <IconText>
                                <FiCreditCard size="20"/>Limite disponível: <br />R$ {}
                            </IconText> */}
                            <span>
                                {getHour()}
                            </span>
                        </div>
                    </li>
                    {transactions.map(transaction => (
                        <li key={transaction.id} onClick={() => setActiveMap(transaction.id)}>
                            <div>
                                <div>
                                    {parseFloat(transaction.release_value) > 0 ?
                                        (<IconText><FiCheckCircle color="#3aea63" size="20"/> Pagamento aprovado </IconText>):
                                        (<IconText style={{minWidth: 182}}><FiCornerUpRight color="#f42c2c" size="20" /> Estorno </IconText>)
                                    }
                                    <IconText>
                                        <FaRegMoneyBillAlt size="20"/>R$ {transaction.release_value}
                                    </IconText>
                                </div>
                                <IconText>
                                    <FiMapPin size="20" /> {transaction.establishment.split('/').length > 1 ? transaction.establishment.split('/')[1] : transaction.establishment}
                                </IconText>
                                <span>
                                    {formatDate(transaction.release_date)}
                                </span>
                            </div>
                            {activeMap === transaction.id && <section>
                                <Map
                                    style="mapbox://styles/mapbox/streets-v9"
                                    containerStyle={{
                                        height: '200px',
                                        width: '100%'
                                    }}
                                    zoom={[15]}
                                    center={{lng: transaction.longitude_establishment, lat: transaction.latitude_establishment}}
                                >
                                    <Marker coordinates={{lng: transaction.longitude_establishment, lat: transaction.latitude_establishment}}>
                                        <img src=" https://img.icons8.com/color/48/000000/marker.png" />
                                    </Marker>
                                </Map>
                            </section>}
                        </li>
                    ))}
                </Transaction>
            </Container>
        </Margin>
    );
}

export default Invoice;
