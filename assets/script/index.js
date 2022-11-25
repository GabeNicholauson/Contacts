'use strict';

import Contact from './classes.js';

const contactInfo = document.querySelector('.contact-info');
const addContact = document.querySelector('.add-contact');
const validate = document.querySelector('.validate');
const contactGrid = document.querySelector('.grid-container');
let allContacts = [];


addContact.addEventListener('click', () => {
    validateContact(contactInfo.value);
    deleteContact();
});

/*******************
 *  Functions
*******************/

function validateContact(contact) {
    const newContact = contact.split(',');
    const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;

    if (newContact.length !== 3) 
        return validate.innerHTML = 'Please enter only a name, city, email and separate with commas';
    if (!emailRegex.test(newContact[2].trim())) 
        return validate.innerHTML = 'Please enter a valid email';
        
    validate.innerHTML = '';
    contactInfo.value = '';
    createContact(...newContact);
}

function createContact(...arr) {
    const contact = new Contact(arr[0], arr[1], arr[2]);
    allContacts.push(contact);
    listContacts();
}

function listContacts() {
    const mostRecent = allContacts[allContacts.length - 1];
    contactGrid.innerHTML = `<div class="contact">
        <p>Name: ${mostRecent.name.trim()}</p>
        <p>City: ${mostRecent.city.trim()}</p>
        <p>Email: ${mostRecent.email.trim()}</p>
        </div>` + contactGrid.innerHTML;
}

function deleteContact() {
    const dContact = Array.from(document.querySelectorAll('.contact'));

    dContact.forEach((element) => {
        element.addEventListener('click', () => {
            element.remove();
        });
    });
}