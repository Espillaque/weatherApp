const { contextBridge } = require("electron");
const axios = require("axios");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

const getWeather = (code) => {
  const kindWeather = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos intensos",
    95: "Tormenta eléctrica",
    96: "Tormenta con granizo ligera",
    99: "Tormenta con granizo fuerte",
  };

  return kindWeather[code] || "desconocido";
};

contextBridge.exposeInMainWorld("weatherAPI", {
  fetch: async () => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=37.2829&longitude=-5.9209&current=temperature_2m,weather_code";
    const res = await axios.get(url);
    const current = res.data.current;

    return {
      temperature: current.temperature_2m,
      description: getWeather(current.weather_code),
    };
  },
});
