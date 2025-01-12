document.addEventListener('DOMContentLoaded', init, false)

let avatar, fullName, email, githubName, generateButton, ticketHolder, githubHandle

function init() {
    //get dom objects
    avatar = document.getElementById("avatar");
    fullName = document.getElementById("full_name");
    email = document.getElementById("email");
    githubName = document.getElementById("github_name");
    generateButton = document.getElementById("generate_button");
    formSection = document.querySelector(".form-section");
    ticketSection = document.querySelector(".ticket-section");
    ticketHolder = document.querySelector(".ticket-holder");
    githubHandle = document.querySelector(".github-handle");
    ticketNumber = document.querySelector(".ticket-number");

    //listen for form input
    avatar.addEventListener("change", handleFileSelect, false);
    generateButton.addEventListener("click", handleGenerateTicket, false);

    ticketSection.style.display = "none";

    let cached = getForm();
    if(cached) {
        avatar.value = cached.avatar
        fullName.value = cached.fullName
        email.value = cached.email
        githubName.value = cached.email
        
    }
    console.log(cached);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.size <= 500 * 1024) {
        const reader = new FileReader();

        reader.onload = function (e) {
            ticketHolder.src = e.target.result
            ticketHolder.alt = `${fullName.value || "Avatar"}'s avatar`;
            ticketHolder.style.display = "block"
        
            saveForm({ ...getForm(), avatarData: e.target.result});
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image (JPG/PNG, max size: 500KB).");
    }
}

function handleGenerateTicket(event) {
    event.preventDefault();
    
    const name = fullName.value.trim();
    const emailAddress = email.value.trim();
    const github = githubName.value.trim();

    if (!name || !emailAddress || !github) {
        alert("Please fill in all fields to generate your ticket.");
        return;
    }

    const randomTicketNumber = Math.floor(100000 + Math.random() * 9000000);

    document.querySelector(".ticket-section h1").textContent = `Congrats, ${name}! Your ticket is ready.`;
    document.querySelector(".ticket-section p").innerHTML = `We've emailed your ticket to ${emailAddress} and will send updates in the run up to the event.`
    githubHandle.textContent = `@${github}`;
    ticketNumber.textContent = randomTicketNumber;

    saveForm({
        fullName: name,
        email: emailAddress,
        github: github,
        avatarData: ticketHolder.src || "",
    });

    formSection.style.display = "none";
    ticketSection.style.display = "block";
}

function saveForm(form) {
    // save form inputs to local storage
    let f = JSON.stringify(form);
    window.localStorage.setItem('form', f);
}

function getForm() {
    let f = window.localStorage.getItem('form');
    if(f) return JSON.parse(f);
    console.log(f)

    document.querySelector('#form').addEventListener('submit', () => {window.localStorage.removeItem('form');}, false);
}