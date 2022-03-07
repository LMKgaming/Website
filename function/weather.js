var weatherSearch = document.querySelector(".weather__search")
var city = document.querySelector(".city")
var country = document.querySelector(".country")
var value = document.querySelector(".value")
var shortDesc = document.querySelector(".short-desc")
var visibility = document.querySelector(".visibility span")
var wind = document.querySelector(".wind span")
var sun = document.querySelector(".sun span")
var time = document.querySelector(".time")
var descInfo = document.querySelector(".desc-info")
var weatherContent = document.querySelector(".weather__content")
var bodyContent = document.querySelector(".content")
var idWeather = document.querySelector("#weather")

setInterval(() => {
    time.innerText = new Date().toLocaleString('vi')
}, 1000);

async function changeWeather(capitalSearch) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=197deba011f3f1920baf9fc6ba8864fc&lang=vi`
    let data = await fetch(apiURL).then(res=> res.json())
    console.log(data)
    if (data.cod === 200) {
        weatherContent.classList.remove("hide")
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + "m"
        wind.innerText = data.wind.speed + "m/s"
        sun.innerText = data.main.humidity + "%"
        descInfo.innerText = data.weather[0].description
        let temp = Math.round((data.main.temp-273.15))
        value.innerHTML = `${temp}<sup>o</sup>C`
        shortDesc.innerText = data.weather[0].main
        // time.innerText = new Date().toLocaleString('vi')
        if (temp > 25) {
            // hot
            //On local
            // bodyContent.style.background = `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.6)), url(../img/hot.png) no-repeat center/cover`
            // idWeather.style.background =  `linear-gradient(to top,rgba(0,0,0,0.2),rgba(0,0,0,0.1)), url(../img/hot.png) no-repeat center/cover`
            //On github
            bodyContent.style.background = `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.6)), url(../Website/img/hot.png) no-repeat center/cover`
            idWeather.style.background =  `linear-gradient(to top,rgba(0,0,0,0.2),rgba(0,0,0,0.1)), url(../Website/img/hot.png) no-repeat center/cover`
        } else {
            // freeze
            //On local
            // bodyContent.style.background = `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.6)), url(../img/cold.png) no-repeat center/cover`
            // idWeather.style.background =  `linear-gradient(to top,rgba(0,0,0,0.2),rgba(0,0,0,0.1)), url(../img/cold.png) no-repeat center/cover`
            //On github
            bodyContent.style.background = `linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.6)), url(../Website/img/cold.png) no-repeat center/cover`
            idWeather.style.background =  `linear-gradient(to top,rgba(0,0,0,0.2),rgba(0,0,0,0.1)), url(../Website/img/cold.png) no-repeat center/cover`
        }
    } else {
        weatherContent.classList.add("hide")
    }
    
    
}

weatherSearch.addEventListener("focusout",()=>{
    let capitalSearch = weatherSearch.value.trim()
    changeWeather(capitalSearch)
})

weatherSearch.onkeypress = (e) => {
    // console.log(e.code == 'Enter')
    if (e.code == "Enter") {
        let capitalSearch = weatherSearch.value.trim()
        changeWeather(capitalSearch)
    }
}