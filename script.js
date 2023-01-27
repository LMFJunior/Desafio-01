const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt-br",
    units: "metric"
}

const search_input = document.querySelector('.search-input');
const search_button = document.querySelector('.search-btn');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');

search_button.addEventListener('click', function() {
    result(search_input.value)
})

function result (city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cidade não encontrada!`)
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
        displayResults(response)
    });
}

function displayResults(weather) {
    console.log(weather)

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date.innerText = dateBuilder(now);

    let temperature = `${Math.round(weather.main.temp)}`
    if (document.querySelector('.celsius').checked){
        temp.innerHTML = `${temperature}°c`;
    }else {
        temp.innerHTML = `${temperature*1.8 + 32}°f`;
    }

}

function dateBuilder(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} de ${year}`;
}
