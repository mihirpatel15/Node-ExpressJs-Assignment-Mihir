
async function  getCookiebyName (cookiename) {
    console.log(document.cookie);
   //document.cookie=`CountryNzoneName=India**Asia/Calcutta`
    var variable;
    try {

        if (document.cookie.length != 0) {
            const newArr = document.cookie.split(';');

            for (const iterator of newArr) {
                const Arr = iterator.split('=')
                
                if (Arr[0].trim() == cookiename && Arr[1]!='' && Arr[1]!==undefined) {
                    variable = Arr[1]
                }
            }
            
            if(typeof variable!=='undefined' ){
                return variable
            }else{return false}

        } else {
            return false;
        }


    } catch (error) {
        return false
    }
}