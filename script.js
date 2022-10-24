const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
// console.log(form);

const isRequired = value => value === "" ? false : true;

// checks for minimum and maximum characters
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// checks if email is valid
const isEmailValid = (email) => {
    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(email);
};

// checks if password is valid
const isPasswordSecure = (password) => {
    const exp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.\$%\^&\*])(?=.{8,})");
    return exp.test(password);
};

// shows error message on invalid input field
const showError = (input, message) => {

    const formParent = input.parentElement;
    const formInput = input;

    formInput.classList.remove('success');
    formInput.classList.add('error');

    const errorElement = formParent.querySelector('small');
    errorElement.textContent = message;
};

// removes error message
const showSuccess = (input) => {

    const formInput = input;
    const formParent = input.parentElement;

    formInput.classList.remove('error');
    formInput.classList.add('success');

    const errorElement = formParent.querySelector('small');
    errorElement.textContent = "";

};

const checkFirstName = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const firstname = firstName.value.trim();
    if (!isRequired(firstname)) {
        showError(firstName, 'First Name cannot be empty');
    } else if (!isBetween(firstname.length, min, max)) {
        showError(firstName, `firstname must be between ${min} and ${max} charcters.`);
    } else {
        showSuccess(firstName);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {
    let valid = false;

    const min = 3,
        max = 25;

    const lastname = lastName.value.trim();
    if (!isRequired(lastname)) {
        showError(lastName, 'Last Name cannot be empty');
    } else if (!isBetween(lastname.length, min, max)) {
        showError(lastName, `Lastname must be between ${min} and ${max} charcters.`);
    } else {
        showSuccess(lastName);
        valid = true;
    }

    return valid;
};

const checkEmail = () => {
    let valid = false;

    const mail = email.value.trim();
    if (!isRequired(mail)) {
        showError(email, 'Email cannot be empty');
    } else if (!isEmailValid(mail)) {
        showError(email, 'Looks like this is not an Email');
    } else {
        showSuccess(email);
        valid = true;
    }

    return valid;
};

const checkPassword = () => {
    let valid = false;

    const pasword = password.value.trim();
    if (!isPasswordSecure(pasword)) {
        showError(password, 'Password must be at least 8 characters and contain a lower case, an upper case, a special character and a number');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};

firstName.addEventListener("change", function (e) {
    firstName.value === e.target.value;
    // console.log(firstName.value);
})



const debounce = (fn, delay = 3000) => {
    let timeoutId;
    return (...args) => {
        // cancel previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // set up a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstname':
            checkFirstName();
            break;
        case 'lastname':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));

submit.addEventListener("click", function (e) {

    e.preventDefault();

    // validate field
    let isFirstName = checkFirstName(),
        isLastName = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordSecure = checkPassword();

    let isFormValid = isFirstName
        &&
        isLastName
        &&
        isEmailValid
        &&
        isPasswordSecure;

    // submit to the server if form is valid
    if (isFormValid) {

    }
});