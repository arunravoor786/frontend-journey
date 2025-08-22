//Using function name and declaring is called function definition
//function changeText() {
//    document.getElementById('para1').innerHTML = 'Naman Bro'
//}

// function expression
//let changeText = function () {
   // document.getElementById('para1').innerHTML = 'Naman Bro'
//}

// Arrow function this is ES6 function Definition
 let changeText = () => {
     document.getElementById('para1').innerHTML = 'Naman Bro'   
 }

document.getElementById('changeBtn').addEventListener('click', function(){
    changeText()
})