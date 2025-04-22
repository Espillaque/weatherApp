window.weatherAPI.fetch().then(({ temperature, description }) => {
  const div = document.getElementById("climate");
  div.innerHTML = `${description}`;

  const div1 = document.getElementById("temp");
  div1.innerHTML = `${temperature}°C`;
});