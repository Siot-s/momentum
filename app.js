const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const time = document.getElementById("time");
const name =document.getElementById("name");
const input =document.getElementById("input_name");

function showTime(){
    const now = new Date();
    time.innerText=now.toLocaleTimeString().slice(3);
}
setInterval(showTime,1000);



input.onchange=function(){
console.log(input.value)
localStorage.setItem("name",input.value);
showName();
}



name.onclick=function(){
    input.style.display='inline-block';
    input.value=name.innerText;
    name.style.display='none';
}

function showName(){
    name.style.display="inline-block";  
    name.innerText = localStorage.getItem("name");
    input.style.display ='none';
    
}


navigator.geolocation.getCurrentPosition(position=>getWeather(position.coords),e=>console.log(e.message))

async function getWeather({latitude,longitude}){
    console.log(latitude,longitude)
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2313f72f528ba9b181f713691469a1df&units=metric`);
   
   .then(result => result.json())
    .then(json => {
        weather.children[0].children[1].innerHTML += `<div>${json.main.temp}℃</div>`;
        weather.children[1].innerHTML += `<div>${json.name}</div>`;
        return json.weather.pop().main;
    })
    .then(icon => {
        let icon_class;
        switch(icon){
            case 'Thunderstorm' : icon_class = 'mdi-weather-lightning'; break;
            case 'Rain' :
            case 'Drizzle' : icon_class = 'mdi-weather-pouring'; break;
            case 'Snow': icon_class = 'mdi-weather-snowy'; break;
            case 'Clear': icon_class = 'mdi-weather-sunny'; break;
            case 'Clouds': icon_class = 'mdi-weather-cloudy'; break;
            case 'Mist': 
            default: icon_class = 'mdi-weather-fog'; break;
        }
        weather.children[0].children[0].classList.add(icon_class);
    })
    .catch(e => console.log(e));
}



    /*temp.innerText = data.main.temp + "℃";
    city.innerText = data.name;
    icon.innerText = data.weather[0].main;
    Mist: icon.classList.add("mdi-wether-fog")
    */


}


