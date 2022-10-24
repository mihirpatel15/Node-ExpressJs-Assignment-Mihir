try {
    let a= decodeURI("https://www.w3schools.com\js/js_errors.asp");
    console.log(a);
  }
  catch(err) {
    document.getElementById("demo").innerHTML = err.name;
  }


