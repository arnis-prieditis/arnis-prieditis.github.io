const image_names = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png"
];
const script_url = 'https://script.google.com/macros/s/AKfycbxdVukPVYnvCPZdRuvIFtNX-AQG29ZTzsd62l4LiK-mtc4X_odFE-_Sm72Hl_ZWAZVL/exec';
let start_time = Date.now();
let img_index = 0;

let start_btn = document.getElementById("startBtn");
let thank_you_page = document.getElementById("thankYouPage");
let survey_form = document.getElementById("surveyForm");
start_btn.style.display = "block";
thank_you_page.style.display = "none";
survey_form.style.display = "none";

function start_test() {
    start_time = Date.now();
    img_index = 0;
    document.getElementById("img1").src = "./images/" + image_names[img_index];
    // and hide start button
    start_btn.style.display = "none";
    survey_form.style.display = "block";
}

function start_over() {
    start_btn.style.display = "block";
    survey_form.style.display = "none";
    thank_you_page.style.display = "none";
    document.getElementById("inputField").value = "";
}

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const endTime = Date.now();
    const duration = ((endTime - start_time) / 1000).toFixed(2); // seconds

    const formData = new FormData(this);
    const diagnoze = formData.get('diagnoze');

    if (!diagnoze) {
    alert("Please write a diagnoze.");
    return;
    }

    // send/publish result
    const url = `${script_url}?diagnoze=${encodeURIComponent(diagnoze)}&timeSpent=${encodeURIComponent(duration)}`;
    fetch(url)
    .then(response => response.text())
    .then(result => {
        // alert("Thank you! Your response has been saved.");
        console.log("Server result:", result);
    })
    .catch(error => {
        alert("Radās kļūda iesniedzot iepriekšējo atbildi.");
        console.error("Error:", error);
    });

    // clear text
    document.getElementById("inputField").value = "";

    // go to next image
    img_index++;
    if (img_index >= image_names.length) {
        // no more images
        // show thank you page
        survey_form.style.display = "none";
        thank_you_page.style.display = "block";
        return;
    }
    document.getElementById("img1").src = "./images/" + image_names[img_index];
    start_time = Date.now();
});
