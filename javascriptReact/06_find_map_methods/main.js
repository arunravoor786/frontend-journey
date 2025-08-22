let emails = ["arun@gmail.com", "naman@gmail.com", "test@gmail.com"]

document.getElementById('checkBtn').addEventListener('click', () => { 
let currentEmai = document.getElementById('input').value
let email = emails.find(item => {
       return currentEmai === item
    })
    if (email === undefined) {
        document.getElementById('result').innerHTML = "Email is not found"
    } else {
        document.getElementById('result').innerHTML = "Email is found"
    }
})
