import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(event) {
        event.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        await api.post('/ongs', data).then(() => {
            history.push('/')
        })
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Tenho registro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        value={name}
                        name="name"
                        placeholder="Nome da ONG"
                        onChange={(event) => setName(event.target.value)}/>
                    <input
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}/>
                    <input
                        value={whatsapp}
                        name="whatsapp"
                        type="tel"
                        placeholder="Whatsapp"
                        onChange={(event) => setWhatsapp(event.target.value)}/>

                    <div className="input-group">
                        <input
                            value={city}
                            name="city"
                            placeholder="Cidade"
                            onChange={(event) => setCity(event.target.value)}/>
                        <input
                            value={uf}
                            name="uf"
                            placeholder="UF"
                            onChange={(event) => setUf(event.target.value)}
                            style={{width: 80}}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
