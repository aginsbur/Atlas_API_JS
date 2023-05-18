export default class CountryClass {

    constructor(_parent, _item, doSingleCountry, getCountryById) {
        this.parent = _parent;
        this.id = _item.cca3;
        this.name = _item.name.common;
        this.officialName = _item.name.official;
        this.flag = _item.flags.svg;
        this.region = _item.region;
        this.map = _item.maps.googleMaps;
        this.borderCountries = _item.borders;
        this.population = _item.population.toLocaleString();
        this.capital = _item.capital;
        if (!_item.languages) {
            this.languages = "unknown"
        }
        else {
            this.languages = Object.keys(_item.languages);
        }
        this.lat = _item.latlng[0];
        this.lng = _item.latlng[1];
        if (!_item.currencies) {
            this.coin = "unknown";
            this.coinDescription = " ";
        }
        else {
            this.coin = Object.keys(_item.currencies);
            this.coinDescription = Object.values(_item.currencies)[0].symbol;

        }
        this.doSingleCountry = doSingleCountry;
        this.getCountryById = getCountryById;
    }

    render() {
        let div = document.createElement("div");
        div.className = "d-flex col-lg-4 justify-content-center m-1 p-2 text-center shadow overflow-hidden articleWrapper";
        document.querySelector(this.parent).append(div);

        div.innerHTML +=
            `<article class="p-2 shadow overflow-hidden align-items-center d-flex flex-column justify-content-between">
              <img src="${this.flag}" alt="${this.name}" style="object-fit:cover; height:350px;">
             <h2 style="font-size:2em;">${this.name}</h2>
             <Button class="btn btn-secondary btn-info col-lg-6">More info</Button>
             </article>`

        let btn = div.querySelector(".btn-info");
        btn.addEventListener("click", () => {
            this.doSingleCountry(this.id);
        });

    }

    detailedRender() {

        let div = document.createElement("div");
        div.className = "articleWrapper m-1 p-2 shadow-lg overflow-hidden";
        document.querySelector(this.parent).append(div);
        div.innerHTML +=
            `<article class="p-2 shadow-lg overflow-hidden h-100 d-flex flex-wrap justify-content-around">
             <div class="col-12 col-lg-6 float-start" style="height:350px;">
               <img src="${this.flag}" alt="${this.name}" class="w-100" style="height:350px; object-fit:cover;">
            </div>
            <div class="d-flex flex-column justify-content-between col-12 col-lg-5 pt-2 pt-lg-0 ">
             <h2 class="display-3">${this.name}</h2>
             <h5>${this.officialName}</h5>
             <div><strong>Region:</strong> ${this.region}</div>
             <div><strong>Capital:</strong> ${this.capital}</div>
             <div><strong>Population:</strong> ${this.population} </div>
             <div><strong>Languages:</strong> ${this.languages}</div>
             <div><strong>Currency:</strong> ${this.coin}, ${this.coinDescription}</div>
             <div><strong>Bordering countries:</strong> <span id="id_borders"></span></div>
             </div>
             <iframe class="mt-4 col-12" height="400" src="https://maps.google.com/maps?q=${this.lat},${this.lng}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
             </article>`

        this.renderBorders();
    };

    async renderBorders() {

        let borders_span = document.querySelector("#id_borders");
        if (!this.borderCountries) {
            borders_span.innerHTML = "No bordering countries"
        }
        else {
            this.borderCountries.forEach((item) => {
                let a = document.createElement("a");
                borders_span.append(a);
                let country = this.getCountryById(item);
                a.innerHTML = country.name.common + " ";
                a.style = "color: Blue; cursor: pointer; "
                a.addEventListener("click", () => {
                    this.doSingleCountry(country.cca3);
                })
            })
        }
    }

}
