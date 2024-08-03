
const change = () => {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const notify = document.getElementById('notify');
    if (sun.style.display == "none") {
        sun.style.display = "block";
        moon.style.display = "none";
        document.getElementById("logo-l").style.display = "block";
        document.getElementById("logo-d").style.display = "none";
        document.documentElement.setAttribute("data-theme", "light");
        notify.style.filter = "none"

    }
    else {
        moon.style.display = "block";
        sun.style.display = "none";

        document.getElementById("logo-l").style.display = "none";
        document.getElementById("logo-d").style.display = "block";
        document.documentElement.setAttribute("data-theme", "dark");
        notify.style.filter = "invert(100%)"
    }

}
//declearing html elements

const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");

//if user hover on img div

imgDiv.addEventListener("mouseenter", function () {
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener("mouseleave", function () {
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a foto to upload

function checkLocalStorage() {
    const image = localStorage.getItem("profileImage");
    if (image) {
        img.setAttribute("src", image);
        imgDiv.style.display = "block";
        uploadBtn.style.display = "none";
    }
}

// If an image is already stored in local storage, display it
checkLocalStorage();

// if user hovers on img div
imgDiv.addEventListener("mouseenter", function () {
    uploadBtn.style.display = "block";
});

// if we hover out from img div
imgDiv.addEventListener("mouseleave", function () {
    uploadBtn.style.display = "none";
});

// lets work for image showing functionality when we choose an image to upload
file.addEventListener("change", function () {
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            img.setAttribute("src", reader.result);
            imgDiv.style.display = "block";
            uploadBtn.style.display = "none";

            // Store the image in local storage
            localStorage.setItem("profileImage", reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});