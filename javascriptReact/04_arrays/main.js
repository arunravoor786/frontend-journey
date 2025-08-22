//In Arrays Push and Pop methods are there 
//Push is used to Push any string to an Array
//Pop is used to pop out any string out of an Array
//Foreach is used to Get the array value 1-by-1. here freshFruits denots param.
//In Array method how "filtering works"
let fruitsStall = ["apple", "orange", "grapes", "banana"]

//fruitsStall.forEach(function (freshFruits) {
//    document.getElementById('result').innerHTML += `<h1>${freshFruits}</h1>`
//})

//writing forEach method using Arrow function (i.e) that is the preferrable one.
 fruitsStall.forEach( freshFruits => {
  document.getElementById('result').innerHTML += `<h1>${freshFruits}</h1>`  
 })
