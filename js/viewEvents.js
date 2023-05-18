import { setUICountriesBySearchVal, doSingleCountryUI, doMultCountriesUI, UI_countryCodes_arr, initUICountries } from "./countryManager.js";

export const declareEvents = () => {

  let search_input = document.querySelector("#id_input");
  let btn_search = document.querySelector("#id_btn_search");
  let select_bx = document.querySelector("#id_slctBx_countries");
  let nav_home = document.querySelector("#id_home");
  let nav_israel = document.querySelector("#id_li_israel");
  let nav_usa = document.querySelector("#id_li_usa");
  let nav_france = document.querySelector("#id_li_france");
  let nav_uk = document.querySelector("#id_li_uk");
  let nav_thailand = document.querySelector("#id_li_thailand");

  search_input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      let search_val = search_input.value;
      setUICountriesBySearchVal(search_val);
      doMultCountriesUI();
    }
  });

  btn_search.addEventListener("click", () => {
    let search_val = search_input.value;
    if (search_val != "") {
      setUICountriesBySearchVal(search_val);
      doMultCountriesUI();
    }
    else{
      alert("Enter a value to search!");
    }

  });

  select_bx.addEventListener("change", () => {
    let selected_val = select_bx.value;
    doSingleCountryUI(selected_val);
  });

  nav_home.addEventListener("click", () => {
    initUICountries();
    doMultCountriesUI();
  });

  nav_israel.addEventListener("click", () => {
    doSingleCountryUI(UI_countryCodes_arr[0]);
  });

  nav_usa.addEventListener("click", () => {
    doSingleCountryUI(UI_countryCodes_arr[1]);
  });

  nav_france.addEventListener("click", () => {
    doSingleCountryUI(UI_countryCodes_arr[2]);
  });

  nav_uk.addEventListener("click", () => {
    doSingleCountryUI(UI_countryCodes_arr[3]);
  });

  nav_thailand.addEventListener("click", () => {
    doSingleCountryUI(UI_countryCodes_arr[4]);
  });

};