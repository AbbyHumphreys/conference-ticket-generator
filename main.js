document.addEventListener('DOMContentLoaded', init, false)

let avatar, fullName, email, githubName

function init() {
    //get dom objects
    avatar = document.getElementById("avatar");
    fullName = document.getElementById("full_name");
    email = document.getElementById("email");
    githubName = document.getElementById("github_name");

    //listen for form input
    let elements = Array.from(document.querySelectorAll('#form input'));
    elements.forEach(e => e.addEventListener('input', handleChange, false));
}

function handleChange(e) {
    // get for inputs
    let form = {};
    form.name = fullName.value;
    form.email = email.value;
    form.github = githubName.value;

    saveForm(form);
}

function saveForm(form) {
    // save form inputs to local storage
    let f = JSON.stringify(form);
    window.localStorage.setItem('form', f);
}