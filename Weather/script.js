document.addEventListener("DOMContentLoaded",()=>{
  const cityInput = document.getElementById("city-input");
  const getWeather = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables
  
  getWeather.addEventListener("click",async ()=>{
    const city = cityInput.value.trim();
    if(!city) return;
    try {
       const weatherData = await fetchData(city)
       displayData(weatherData);
    } catch (error) {
        showError();
    }
  })

  async function fetchData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    console.log(response); 
    if(!response.ok){
      throw new Error(" City Not found");
    }
    const data = await response.json();
    console.log(data); 
    return data;
  }

  function displayData(data){
    errorMessage.classList.add("hidden");
    weatherInfo.classList.remove("hidden")
    const{name, main, weather} = data;   //extracting or destructuring data
    cityName.textContent = name;
    temperature.textContent = `Temperature : ${main.temp} ` ;
    description.textContent = `Weather : ${weather[0].description} `;
  }

  function showError(){
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
})