document.getElementById('startBtn').addEventListener('click', function () {
   document.getElementById('result').innerHTML = ''
   //parseInt is used to convert the Got string value in to the number.
   // This is called TypeCasting. 
   let totalLap = parseInt(document.getElementById('nlip').value)
   let currentLap = 1
   //Whileloop
   while (currentLap <= totalLap) {
      document.getElementById('result').innerHTML += `Naman completed Lap ${currentLap}`
      currentLap++
   }
    console.log(document.getElementById('dres').innerHTML)
})