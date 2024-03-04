function submitForm(event) {
    event.preventDefault();
    // Prevent the form from submitting in the default way

    axios.post("https://research.iitmandi.ac.in:8000/user/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    },
{
	withCredentials: true,
})
        .then((response) => {
            console.log("User signed in successfully!");
            console.log(response.data.user);

            localStorage.setItem("loggedInUserEmail", response.data.user.email);

            const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
            console.log(loggedInUserEmail);

            // Call a separate function and pass the email as an argument
            handleLoggedInUser(loggedInUserEmail);
            window.location.href = "../Dashboard/index.html"
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            // alert("Wrong Password");
        });
}

function handleLoggedInUser(email) {
    // Use the logged-in user's email as needed
    console.log(email);
    // Continue with further logic or redirect to another page
}
