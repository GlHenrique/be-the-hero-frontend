import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleCreateIncident(event) {
        event.preventDefault();
        await api.post('/incidents', {
            title,
            description,
            value
        }, {
            headers: {
                Authorization: ongId
            }
        }).then(() => {
            history.push('/profile')
        })
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver!</p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>
                    <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Título do caso"/>
                    <textarea value={description} onChange={event => setDescription(event.target.value)}
                              placeholder="Descrição"/>
                    <input value={value} onChange={event => setValue(event.target.value)} type="tel"
                           placeholder="Valor R$"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
