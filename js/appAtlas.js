
import { declareEvents } from "./viewEvents.js";
import { initCountires,fillSelectBox,doMultCountriesUI} from "./countryManager.js";


const init = () => {
    doApi();
};

const doApi = async () => {

    let url = `https://restcountries.com/v3.1/all`;
    let resp = await fetch(url);
    let data = await resp.json();
    initCountires(data);
    fillSelectBox();
    declareEvents();
    doMultCountriesUI();

};











init();

