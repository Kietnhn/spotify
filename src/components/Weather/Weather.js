import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Weather.module.scss';

const cx = classNames.bind(styles);

function Weather() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [searching, setSearching] = useState(false);
    const [weather, setWeather] = useState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
    });
    useEffect(() => {
        const key = '3b0b3bd7f75ad5d38643a74b35d41fd4';
        if (searching && city) {
            axios
                .request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
                .then((response) => response.data)
                .then((response) => {
                    console.log(response);
                    setWeather({
                        temperature: response.main.temp,
                        city: response.name,
                        country: response.sys.country,
                        humidity: response.main.humidity,
                        description: response.weather[0].description,
                    });
                    setCountry(response.sys.country);
                    setSearching(false);
                })
                .catch((error) => {
                    setSearching(false);
                    console.log('invalid city');
                    console.error(error);
                });
        }
    }, [city, searching]);

    return (
        <div className={cx('weather')}>
            <header className={cx('header')}>
                <h1>Weather Clone</h1>
                <input value={city} onChange={(e) => setCity(e.target.value)} />
                <button onClick={() => setSearching(true)}>Search</button>
            </header>
            <div className={cx('content')}>
                <div>{country && <img src={`https://countryflagsapi.com/png/${country}`} alt={country} />}</div>
                <div className={cx('weather-info')}>
                    <h2>city: {weather.city}</h2>
                    <h3>country: {weather.country}</h3>
                    <div>
                        temp {'( F )'}: {weather.temperature}
                        <p> hum: {weather.humidity}</p>
                    </div>
                    <p> Des: {weather.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Weather;
