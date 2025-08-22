// This is getting the values using from the input field and calling using the "let"
/*document.getElementById('joinBtn').addEventListener('click', function () {
    let fstName = document.getElementById('firstName').value
    let lstName = document.getElementById('lastName').value
    
    document.getElementById('joinedNames').innerHTML = fstName + " " + lstName
})*/

// This is getting the values using the Template Literals
document.getElementById('joinBtn').addEventListener('click', function () {
    let fstName = document.getElementById('firstName').value
    let lstName = document.getElementById('lastName').value

    // Using if condition and or operator
    if (fstName === '' || lstName === '') {
      document.getElementById('joinedNames').innerHTML = 'Please check firstName and lastName fields are filled!'  
    }else{    
    document.getElementById('joinedNames').innerHTML = `${fstName} ${lstName}`
}
})