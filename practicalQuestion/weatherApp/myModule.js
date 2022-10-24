const { Country, State, City } = require('country-state-city');
const axios = require('axios');
var colors = require('colors');



const getCountries = async (callback) => {
    const result = await Country.getAllCountries()
    callback(result)

}

const searchCountry = async (sear) => {

    result = await Country.getAllCountries()

    return result.filter((val, ind, arr) => {

        const myRe = new RegExp(sear, 'i')
        return myRe.exec(val.name)

    });

}

const getisobycountry = async (country) => {

    allcountry = await Country.getAllCountries()

    const countryobj = await allcountry.filter((val, ind, arry) => {
        return arry[ind].name.toUpperCase() == country.toUpperCase();
    })

    return countryobj[0].isoCode
}

const searchCity = async (country) => {

    const isocode = await getisobycountry(country);
    console.log(isocode);
    return cities = await City.getCitiesOfCountry(isocode)
}



const getWeather = async (citylatlong,) => {
    console.log(colors.red(citylatlong));

    const myArray = citylatlong.split(',')
    const lat = myArray[0]; const lon = myArray[1];
  
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a81937f4bea29b44d741184503a68021`


    return axios.get(url)
      .then(function (response) {
        console.log(colors.red(response.data));
        return response.data

      })
      .catch(function (error) {
        console.log(error);
      })
}






const testfun = () => {
    let obj = [{ name: "mahi" }, { name: "raazi" }]
    return obj
}

module.exports = { searchCountry, getCountries, searchCity, getWeather }

