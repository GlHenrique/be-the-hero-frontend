import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import formatCurrency from '../../utils/FormatCurrency';

export default function Profile() {

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleDeleteInicident(incidentId) {
        await api.delete(`/incidents/${incidentId}`, {
            headers: {
                Authorization: ongId
            }
        }).then(() => {
            setIncidents(incidents.filter(incident => incident.id !== incidentId));
        })
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} title="Logout" type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{formatCurrency(incident.value)}</p>

                        <button onClick={() => handleDeleteInicident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
