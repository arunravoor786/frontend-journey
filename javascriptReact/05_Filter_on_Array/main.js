let fruits = ["apple", "orange", "banana", "grapes"]
//This is done by using the static method for input gathering.
/*let filteredFruits = fruits.filter(item => {
       return item.includes("r")
})


filteredFruits.forEach( item => {
  document.getElementById('filterOutput').innerHTML += `<h1>${item}</h1>`   
})*/

//To dynamically get the input here we are using the .addEventListener with 'Keyup'
document.getElementById('search').addEventListener('keyup', () => {
    document.getElementById('filterOutput').innerHTML = ''
    let searchKey = document.getElementById('search').value
    
    let filteredFruits = fruits.filter(item => {
       return item.includes(searchKey)
})
    filteredFruits.forEach( item => {
  document.getElementById('filterOutput').innerHTML += `<h1>${item}</h1>`   
})

})