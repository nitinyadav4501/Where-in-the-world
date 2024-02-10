const countryName = new URLSearchParams(location.search).get('name')
console.log(countryName)
let container = document.querySelector('.container')

const countryData = async () => {
    let url = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    let response = await url.json()
    console.log(response)
    let countryDetail = document.createElement('main')
    countryDetail.classList.add('main')
    countryDetail.innerHTML = `<div class="logo">
            <img src="${response[0].flags.svg}" alt="flags">
            </div>
                <div class="country-full-dt">
                    <div class="country-detail">
                        <h1>${response[0].name.common}</h1>
                        <p><strong>Native Name : </strong>${response[0].name.nativeName?Object.values(response[0].name.nativeName)[0].common:''}</p>
                        <p><strong>Population : </strong>${response[0].population.toLocaleString('en-IN')}</p>
                        <p><strong>Region : </strong>${response[0].region}</p>
                        <p><strong>Sub Region : </strong>${response[0].subregion}</p>
                        <p><strong>Capital : </strong>${response[0].capital}</p>
                    </div>
                    <div class="country-detail">
                        <p><strong>Top Level Domain : </strong>${response[0].tld?response[0].tld[0]:""}</p>
                        <p><strong>Currencies : </strong>${response[0].currencies?Object.values(response[0].currencies).map((currency)=> currency.name).join(', '):""}</p>
                        <p><strong>Languages : </strong>${response[0].languages?Object.values(response[0].languages).map((language)=> language).join(', '):""}</p>
                    </div>
            </div>`
            container.append(countryDetail)
}
countryData()

const darkMode = document.querySelector('.mode')
let mode = true
darkMode.addEventListener("click",()=>{
        document.body.classList.toggle('lightMode')
        if (mode) {
            document.querySelector(".modeText").innerHTML="Light Mode"
            mode=false
        }
        else{
            document.querySelector(".modeText").innerHTML="Dark Mode"
            mode = true
        }
})