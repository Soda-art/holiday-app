const API_KEY = '0bdd717f-340a-4739-a5aa-c20741df9bd3'

document.getElementById('languages-list-btn').addEventListener('click', () => {
})
document.getElementById('holidays-btn').addEventListener('click', () => {
})



//Get countries from API
const getCountries = async ()=> {
    try {
        const url =`https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('data', data);
        return data;
    }
    catch(err) {
        console.log(err)
    }
}
// render countries list 
const renderCountries = async ()=> {
    try {
        const data = await getCountries ();
        const countriesList = document.getElementById('countries-list');
        const ulCountriesList = countriesList.children[2];
        console.log(countriesList.children);
        ulCountriesList.innerHTML = "";
        data.countries.forEach((country, index) => {
            const li = document.createElement('li');
        li.innerHTML = `<div class="bullet">${index + 1}</div> 
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div> 
                <div>Code: ${country.code}</div>
            </div>`
        ulCountriesList.appendChild(li)
        })
        console.log(data.countries)
    } catch(err) {
        console.log(err)
    }
}
document.getElementById('countries-list-btn').addEventListener('click', renderCountries)

//Get languages from API
const getLanguages = async () => {
    try {
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('data', data);
        return data;
    }
    catch(err) {
        console.log(err)
    }
}
// render languages list
const renderLanguagesList = async () => {
    try {
        const data = await getLanguages();
        const languagesList = document.getElementById('languages-list');
        const ulLanguagesList = languagesList.children[2];
        ulLanguagesList.innerHTML = "";
        data.languages.forEach((languages,index) => {
            const li = document.createElement('li');
        li.innerHTML = `<div class="bullet"${index + 1}</div>
        <div class="li-wrapper">
            <div class="li-title">${languages.name}</div>
            <div>Code: ${languages.code}</div>
        </div>`
        ulLanguagesList.appendChild(li)
        })
    }
    catch(err) {
        console.log(err)
    }
}
document.getElementById('languages-list-btn').addEventListener('click', renderLanguagesList)


//get API holidays list
const getYear = document.getElementById('year-query')
const getDay = document.getElementById('day-query')
const getCountry = document.getElementById('country-query')
const getLanguage = document.getElementById('language-query')
const getMonth = document.getElementById('month-query')
const getSearch = document.getElementById('search-query')

const holiday = async () => {
    try {
        let queryString = '';
    if (getYear.value) {
        queryString += `&year=${getYear.value}` 
    } else {
        queryString += `&year=2022`;
    }
    if (getDay.value) {
        queryString += `&day=${getDay.value}`
    }
    if(getMonth.value) {
        queryString +=`&month=${getMonth.value}`
    }
    if(getCountry.value) {
        queryString += `&country=${getCountry.value}`
    } else {
        queryString += `&country=VN`;
    }
    if(getLanguage.value) {
        queryString += `&languages=${getLanguage.value}`
    }
    if(getSearch.value) {
        queryString += `&search=${getSearch.value}`
    }
    console.log(queryString)
    console.log(getCountry.value)
    const url =
    `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`
    const res = await fetch(url);
    const data = await res.json();
    return data
    }
    catch (err) {
    console.log(err)
}
}
//Render holidays
const renderHolidays = async () => {
    try {
        const data = await holiday();
        const holidaysList = document.getElementById('holidays-list');
        const ulHolidaysList = holidaysList.children[1];
        ulHolidaysList.innerHTML = '';
        data.holidays.forEach((holiday, index) => {
        //     const h3 = document.createElement('h3');
        // h3.innerHTML= `Holidays of a ${country.name}`
            const li = document.createElement('li');
        li.innerHTML = `<div class="bullet">${index + 1}</div> 
        <div class="li-wrapper">
            <div$ class="li-title">${holiday.name}</div> 
            <div>${holiday.weekday.date.name} - ${holiday.date}</div>
        </div>`    
        ulHolidaysList.appendChild(li);
        })
    } 
    catch (err) {
        console.log(err)
    }
}
document.getElementById('holidays-btn').addEventListener('click', renderHolidays)
