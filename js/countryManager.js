import CountryClass from "./countryClass.js";

export const UI_countryCodes_arr = ["ISR", "USA", "FRA", "GBR", "THA"];
const UI_countries_arr = [];
const countries_arr = [];

//initializes the countries and UI country arrays
export const initCountires = (_input) => {
    _.sortBy(_input, "name.common").forEach((item) => {
        countries_arr.push(item);
    });
    initUICountries();
}

//sets UI countries array, to the default values
export const initUICountries=()=>{
    UI_countries_arr.splice(0,UI_countries_arr.length);
    countries_arr.filter(c => UI_countryCodes_arr.includes(c.cca3)).forEach((item) => {
        UI_countries_arr.push(item);
    });
}

export const fillSelectBox = () => {
    let id_select_box = document.querySelector("#id_slctBx_countries");
    countries_arr.forEach(item => {
        id_select_box.innerHTML += `<option value="${item.cca3}">${item.name.common}</option>`
    })
}

//finds the country with the given country id
export const getCountryById = (_countryID) => {
    let countryItem = countries_arr.filter(c => c.cca3 === _countryID)[0];
    return countryItem;
}

//creates and displays a single country, given an id
export const doSingleCountryUI = (_countryID) => {

    document.querySelector("#id_row").innerHTML = "";
    let countryItem = getCountryById(_countryID);
    let country = new CountryClass("#id_row", countryItem, doSingleCountryUI, getCountryById);
    country.detailedRender();
}

//finds the countries whos name/official name contains the search val
export const setUICountriesBySearchVal = (_search_val) => {
    UI_countries_arr.splice(0, UI_countries_arr.length);
    countries_arr.filter(c =>
        c.name.official.toLowerCase().includes(_search_val.toLowerCase()) ||
        c.name.common.toLowerCase().includes(_search_val.toLowerCase())).forEach((item) => {
            UI_countries_arr.push(item);
        });
}


//displays multiple countries
export const doMultCountriesUI = () => {

    if (UI_countries_arr.length != 0) {
        document.querySelector("#id_row").innerHTML = "";
        UI_countries_arr.forEach(item => {
            let country = new CountryClass("#id_row", item, doSingleCountryUI);
            country.render();
        });
    }
    else {
        alert("no results found!");
    }

}