const axios = require("axios");
const { Country, State, City } = require('country-state-city');
const getAllCities= City.getAllCities()




//const wheather = require("./wheather");

const geocode = (city, callback) => {


    // const city = "surat,gujarat"
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=725b1290c1344ab4b72341d421e6c994`;
    axios.get(url).then((result) => {

        console.log(result);
        //#
    }).catch((err) => {
        if (err) {
            console.log('city name not match');
        }
    })

}

const allCountry =   () => {

}


const testfun = ()=>{
    let obj=[{name:"mahi"},{name:"raazi"}]
    return obj
}
module.exports = { allCountry, geocode,testfun }

