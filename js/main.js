


'use strict';

const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const loginTytle = document.querySelector('.login-title')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignup= document.querySelector('.login-signup')

const listUsers = [
    {
        email: 'max@mail.com',
        password: '12345',
        displayName: 'Max'
    },
    {
        email: 'Anya@mail.com',
        password: '12345678',
        displayName: 'Anya'
    },

];

const setUser = {
    user: null,
    logIn(email, password) {
        console.log(email, password)
    },
    logOut() {
        console.log('esit')
    },
    signUn() {
        console.log('register')
    }
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setUser.logIn(emailInput.value, passwordInput.value)
    
});

loginSignup.addEventListener('click', (event)=>{
    event.preventDefault();
    setUser.signUn();
})