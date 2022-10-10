const fs = require('fs');
const path = require('path');
let file = path.resolve(__dirname + '/fruit.json');

const loadfruit = () => {

  if (!fs.existsSync(file)) {
    return []
  } else {
    try {
      load = fs.readFileSync(file, 'utf-8');
      return JSON.parse(load)
    } catch (error) {
      return 'error read file'
    }
  }
}


const repeated = (data) => {

  let load = loadfruit();
  let repeated = load.filter((val, ind, arr) => {
    return arr[ind].name == data;
  });
  return repeated;
}


const savenote = (data) => {

  let repeatedData = repeated(data);

  if (!repeatedData.length >= 1) {
    let newdata = loadfruit();
    newdata.push({ name: data });
    fs.writeFile(file, JSON.stringify(newdata), (err) => {
      if (err) { console.log('file write error') } else { console.log('name addded sucess'.green); }
    })

  } else {
    console.log('name is already registered'.red);
  }
}


const deletenote = (name) => {

  chkMatch = repeated(name);
  console.log(chkMatch.length);

  if (chkMatch.length == 0) {
    console.log('there is no record to delete'.red);
  } else {
    let load = loadfruit();
    let newData = load.filter((val, ind, arr) => {
      return arr[ind].name != name;
    });
    fs.writeFile(file,JSON.stringify(newData),(err)=>{
      if(!err){console.log('data delete success'.green);}
    });

    }
}


const updatenote=(oldVal,newVal)=>{

  let p1= new Promise((res,rej)=>{
    let repeted = repeated(oldVal);
    if(repeted.length>=1){
      res(true)
    }else{
      rej('this value is not available to update');
    }
  })

  let p2= new Promise((res,rej)=>{
    chkMatch = repeated(newVal);
    if(chkMatch.length>=1){
      rej('this name is alredy registered');
    }else{
      res(true)
    }
  })

  let onfullfill=(data)=>{
    //console.log(oldVal);console.log(newVal);
    let load=loadfruit();
    let newdata= load.filter((val,ind,arr)=>{
      return arr[ind].name != oldVal;
    })
    newdata.push({ name: newVal });

    fs.writeFile(file,JSON.stringify(newdata),(err)=>{
      if(!err){console.log('Update success'.green)}else{console.log('file write error:update>onfullfill'.red);}
    });


  }
  
  Promise.all([p1,p2]).then(onfullfill).catch((err)=>{
    console.log(err.red);
  });

}


module.exports = { loadfruit, repeated, savenote, deletenote,updatenote }
