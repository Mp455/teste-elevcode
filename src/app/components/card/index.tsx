"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [clima, setClima] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Belem,br&units=metric&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        setClima(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
      }
    };

    fetchWeather();
  }, []);

  const formatarDataHora = (timestamp: number) => {
    const data = new Date(timestamp * 1000);
    return data.toLocaleString("pt-BR");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {clima ? (
        <div className="p-4 border rounded-md shadow-md bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Clima em {clima.name}</h2>
          <p>Última atualização: {formatarDataHora(clima.dt)}</p>
          {clima.weather && clima.weather.length > 0 && (
            <div>
              <img
                src={`http://openweathermap.org/img/w/${clima.weather[0].icon}.png`}
                alt="Condição do tempo"
              />
              <p>Condição: {clima.weather[0].description}</p>
            </div>
          )}
          <p>Temperatura: {Math.round(clima.main.temp)}°C</p>
          <p>Umidade: {clima.main.humidity}%</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Card;
