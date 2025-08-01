document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('emp-email');
    const messageInput = document.getElementById('emp-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if(!validEmail) {
            alert('please enter a valid email address');
            emailInput.focus();
            return; 
        }

        if(message.length < 5) {
            alert('Message must be at least 5 characters long');
            messageInput.focus();
            return; 
        }
        
        alert('Message sent! Thank you for your feedback.');
        form.reset();   
       
    });
});