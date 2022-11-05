const { Country, State, City } = require('country-state-city');
const axios = require("axios");
const colors = require("colors");
const { hrtime } = require('process');


exports.getCountries = async () => {
    return await Country.getAllCountries()
}

//
exports.getisobycountry = async (country) => {

    allcountry = await Country.getAllCountries()

    const countryobj = await allcountry.filter((val, ind, arry) => {
        return arry[ind].name.toUpperCase() == country.toUpperCase();
    })

    return countryobj[0].isoCode
}

//
exports.searchCity = async (country) => {

    const isocode = await exports.getisobycountry(country);

    return cities = await City.getCitiesOfCountry(isocode)
}


exports.getGeolocation = async () => {

    try {

        const localIpv6 = '2405:204:840b:2318:104e:3a60:2dbf:13ba';//here use manually because "res.ip" not work in local

        const options = {
            method: 'GET',
            url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
            params: { ip: localIpv6 },
            headers: {
                'X-RapidAPI-Key': 'bb57fa4437mshe8f4525a0762566p1bb9cdjsn8a260e2d634c',
                'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
            }
        };

        return axios.request(options).then(function (response) {
            return response.data //console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

    } catch (error) {

        if (err) throw err

    }

}


exports.getTimeNdatabyTz = async (geolocation) => {


    url = `https://timeapi.io/api/Time/current/zone?timeZone=${geolocation.timezone}`;

    return axios.request(url).then(function (response) {


        let databyTimezone = { ...geolocation, ...response.data };//merge two object
        return databyTimezone


    }).catch(function (error) {
        console.error(error);
    });


}

exports.getTimebyTz = async (country,TZ) => {

    try {
        // Date object initialized as per New Zealand timezone. Returns a datetime string
        let date_string = new Date().toLocaleString("en-US", { timeZone: TZ });
        

        

        // Date object initialized from the above datetime string
        let DATE = new Date(date_string);
       

        // year as (YYYY) format
        let year = DATE.getFullYear();

        // month as (MM) format
        let month = ("0" + (DATE.getMonth() + 1)).slice(-2);

        // date as (DD) format
        let date = ("0" + DATE.getDate()).slice(-2);

        // hours as (HH) format
        let hours = ("0" + DATE.getHours()).slice(-2);
        

        // minutes as (mm) format
        let minutes = ("0" + DATE.getMinutes()).slice(-2);

        // seconds as (ss) format
        let seconds = ("0" + DATE.getSeconds()).slice(-2);

        // curWeekDay 
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var curWeekDay = days[DATE.getDay()];

        //current month in String
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let MONTH = months[Number(month) - 1]

        // date as YYYY-MM-DD format
        let date_yyyy_mm_dd = year + "-" + month + "-" + date;

        // date as DD-MM-YYYY format
        let date_dd_mm_yyyy = date + "-" + month + "-" + year;

        // time as hh:mm:ss format
        let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;

        // date and time as YYYY-MM-DD hh:mm:ss format
        let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        //AM or  PM

        ap = (hours < 12) ? "<span>AM</span>" : "<span>PM</span>";

        // HOUR = (hours == 00) ? 12 : hours;
        // HOUR = (hours > 12) ? hours - 12 : hours;

        if (hours == 0) {
            HOUR =12
          } else if (hours > 12) {
            HOUR =hours - 12
          } else {
            HOUR =hours 
          }


        
        return { date, month, year, hours, minutes, seconds, date_yyyy_mm_dd, date_dd_mm_yyyy, time_hh_mm_ss, date_time, curWeekDay, MONTH, ap, HOUR,country,TZ }
        

    } catch (err) {
        console.log(err);
    }

}

exports.getTimeandDate = async (CountryNzoneName) => {

                   
   

    try {

        if(typeof CountryNzoneName!=='undefined') {

            dummyString = CountryNzoneName.replace(/(^'|'$)/g, "")

           
            const STR = dummyString.split("**");
            
            const country = STR[0];
            const TZ = STR[1]

            
            return await exports.getTimebyTz(country,TZ);
            
 

        } else {

            try {
                //system time zone - ex:Asia/Calcutta
                const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone
                const country =Intl.DateTimeFormat().resolvedOptions().locale
                console.log(ntl.DateTimeFormat().resolvedOptions());
                return await exports.getTimebyTz(country,TZ);

            } catch (error) {
                
                const country ='India'
                const TZ = 'Asia/Calcutta' //default if not get system TZ
                
                return await exports.getTimebyTz(country,TZ);
            }

        }


        



        


    } catch (error) {
        console.log(error);
    }


}



exports.test = function (res) {
    // let aa=11
    // let bb=22
    // let c=5
    // res.send('hello world')

}

