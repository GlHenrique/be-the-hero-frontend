import React, { useState } from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();
        await api.post('/session', {id}).then((res) => {
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);
            history.push('/profile')
        }, error => {
            alert('Ocorreu um erro ao logar');
        })
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        name="id"
                        placeholder="Sua ID"/>
                    <button className="button" type="submit">
                        Entrar
                    </button>
                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho registro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}
