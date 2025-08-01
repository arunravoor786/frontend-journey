document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('team-form');
    const table = document.getElementById('team-table');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('emp-name').value.trim();
        const role = document.getElementById('emp-role').value.trim();
        const email = document.getElementById('emp-email');

        if (!name || !role || !email.value.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        const emails = Array.from(table.querySelectorAll('td:nth-child(3)')).map(td => td.textContent());
        if (emails.includes(email.value.trim())) {
            alert('This email is already in the directory.');
            return;
        }
        
        const newRow = table.insertRow(-1);
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = role;            
        newRow.insertcell(2).textContent = email;

        newRow.classList.add('new-row');
        setTimeout(() => {
            newRow.classList.remove('new-row');
        }, 1000);

        form.reset();
        form.elements[0].focus(); 

        alert('Team member added successfully!');   
    });
       
    });
