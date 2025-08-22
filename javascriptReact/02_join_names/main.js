document.getElementById('joinBtn').addEventListener('click', function () {
    document.getElementById('joinedNames').innerHTML = document.getElementById('firstName').value + " " + document.getElementById('lastName').value
})