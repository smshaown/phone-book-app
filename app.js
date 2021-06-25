// Local Storage Class
function Contact(name, email, phone, birthday) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthday = birthday;
}

// Main UI function
function UI() {}

// Add New Contact
UI.prototype.addContactToList = function(contact) {
const list = document.getElementById('contact-list');
// Create tr Element
const row = document.createElement('tr');
// Insert Column
row.innerHTML = `
    <td>${contact.name}</td>
    <td>${contact.email}</td>
    <td>${contact.phone}</td>
    <td>${contact.birthday}</td>
    <td><a class="btn btn-floating delete">x</a></td>
`;
list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(getMsg, getClass) {

    // Create div
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert alert-${getClass}`;
    // Add Text
    div.appendChild(document.createTextNode(getMsg));
    // Get Parent
    const card = document.querySelector('.card');
    // Get Form
    const cardAction = document.querySelector('.card-action');
    // Insert Alert
    card.insertBefore(div, cardAction);
    // Timeout 3 Seconds for alert dismiss
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2000);

}

//Delete
UI.prototype.deleteContact = function(target) {

const ui = new UI();

if(target.classList.contains('delete')){
    if(confirm('Are you sure?')){
        // Show Progress
        document.querySelector('.progress').style.display = 'block';
        // Timeout 1 Second
        setTimeout(function(){
        document.querySelector('.progress').style.display = 'none';
            target.parentElement.parentElement.remove();
            return true;
        },1000);
    }
}else{
    return false;
}
}

//Clear
UI.prototype.clearFields = function() {

document.getElementById('name').value = '';
document.getElementById('phone').value = '';
document.getElementById('email').value = '';
document.getElementById('birthday').value = '';

}

//Search
UI.prototype.searchName = function(text){
const rows = document.querySelectorAll('#contact-list tr');
rows.forEach(function(row){
    if(row.children[0].textContent.indexOf(text) != -1){
        row.style.display = 'table-row';                
    }else{
        row.style.display = 'none';
    };
});

}


// Submit Event Listener
document.getElementById('contact-form').addEventListener('submit', function(e){
e.preventDefault();
// Get Form Values
const name = document.getElementById('name').value,
    email = document.getElementById('email').value,
    phone = document.getElementById('phone').value;
    birthday = document.getElementById('birthday').value;
    // Instantiate Contact
    const contact = new Contact(name, email, phone, birthday);
    // Instantiate UI
    const ui = new UI();
    // Validate
    if(name === '' || phone === ''){
        // Show Progress
        document.querySelector('.progress').style.display = 'block';
        setTimeout(function(){
            // hide Progress
            document.querySelector('.progress').style.display = 'none';
            // Error Alert
            ui.showAlert('Please fill Name & Phone Fields at least', 'danger');
        },500);
    }else{
        // Show Progress
        document.querySelector('.progress').style.display = 'block';
        setTimeout(function(){
            // hide Progress
            document.querySelector('.progress').style.display = 'none';
            //Add contact to list
            ui.addContactToList(contact);
            // Show Success
            ui.showAlert('New Contact Added!', 'success');
            // Clear Fields
            ui.clearFields();  
        },1000);
    }
});

// X Button Event
document.getElementById('contact-list').addEventListener('click', function(e){
// Instantiate UI
const ui = new UI();
    if(ui.deleteContact(e.target)){
        // Show message
        ui.showAlert('Contact Removed!', 'danger');
    }
e.preventDefault();
});

// Search / Filter 
document.getElementById('search').addEventListener('keyup', function(e){
const ui = new UI();
ui.searchName(e.target.value);
});