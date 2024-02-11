const countryCards = document.querySelector('.country-container')
function renderData(response) {
    countryCards.innerHTML = ""
    response.forEach((country) => {
        let card = document.createElement("a")
        card.href = `/country.html?name=${country.name.common}`
        card.classList.add('country')
        card.innerHTML = `<img class="country-img" src="${country.flags.svg}" alt="flag">
                            <div class="country-detail">
                                <h2>${country.name.common.length>=10?country.name.common.slice(0,10)+"...":country.name.common}</h2>
                                <p><strong>Population : </strong>${country.population.toLocaleString('en-IN')}</p>
                                <p><strong>Region : </strong>${country.region}</p>
                                <p><strong>Capital : </strong>${country.capital}</p>
                            </div>`
        countryCards.append(card)
    });
}


let allData;
const fetchData = async () => {
    let url = await fetch('https://restcountries.com/v3.1/all')
    let response = await url.json()
    renderData(response)
    allData = response;
}
fetchData()



const darkMode = document.querySelector('.mode')
let mode = true
darkMode.addEventListener("click", () => {
    document.body.classList.toggle('darkMode')
    if (mode) {
        document.querySelector(".modeText").innerHTML = "Light Mode"
        mode = false
    }
    else {
        document.querySelector(".modeText").innerHTML = "Dark Mode"
        mode = true
    }
})


let countryContainer = document.querySelector('.country-container')
let search = document.querySelector(".input input")
search.addEventListener("input", (e) => {
    let countryData = allData.filter((country) => {
            return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    })
    try {
        if (countryData[0].name.common) {
            renderData(countryData)
        }
    } catch (error) {
        countryContainer.classList.add('oops')
        countryContainer.innerHTML = '<h1>Oops!<h1>'
    }
    
})




let filter = document.querySelector('.filter')

filter.addEventListener("change", async (e) => {
    let url = await fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    let response = await url.json()
    renderData(response)
})


