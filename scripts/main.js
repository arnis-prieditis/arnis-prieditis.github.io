const image_names = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png"
];
const script_url = "https://script.google.com/macros/s/AKfycbxdVukPVYnvCPZdRuvIFtNX-AQG29ZTzsd62l4LiK-mtc4X_odFE-_Sm72Hl_ZWAZVL/exec";
let start_time = Date.now();
let img_index = 0;
let username = "";
let run_id = 0;
let version = "";

let name_input_page = document.getElementById("nameInputPage");
let test_select_page = document.getElementById("testSelectPage");
let test_explanation_page = document.getElementById("textExplanationPage");
let diagnosis_input_page = document.getElementById("diagnosisInputPage");
let thank_you_page = document.getElementById("thankYouPage");
name_input_page.style.display = "block";
test_select_page.style.display = "none";
test_explanation_page.style.display = "none";
diagnosis_input_page.style.display = "none";
thank_you_page.style.display = "none";

document.getElementById("nameForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("username").value;
    if (name == "") {
        alert("Vārds nevar būt tukšs!");
        return;
    }
    console.log("Name ok");
    username = name;
    let curr_time = new Date();
    run_id = curr_time.getTime();
    name_input_page.style.display = "none";
    test_select_page.style.display = "block";
    document.getElementById("username").value = ""; // clear text
});

function select_test(button) {
    version = button.value;
    console.log(version);
    test_select_page.style.display = "none";
    test_explanation_page.style.display = "block";
}

function start_test() {
    start_time = Date.now();
    img_index = 0;
    document.getElementById("img1").src = "./images/" + image_names[img_index];
    test_explanation_page.style.display = "none";
    diagnosis_input_page.style.display = "block";
}

document.getElementById("diagnosisForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const end_time = Date.now();
    const duration = ((end_time - start_time) / 1000).toFixed(2); // seconds

    const form_data = new FormData(this);
    const diagnoze = form_data.get("diagnoze");

    if (!diagnoze) {
        alert("Lūdzu ievadiet diagnozi.");
        return;
    }

    // send/publish result
    const url = script_url
        + "?run_id="        + encodeURIComponent(run_id)
        + "&username="      + encodeURIComponent(username)
        + "&version="       + encodeURIComponent(version)
        + "&img="           + encodeURIComponent(image_names[img_index])
        + "&diagnoze="      + encodeURIComponent(diagnoze)
        + "&time_spent="    + encodeURIComponent(duration);
    fetch(url)
    .then(response => response.text())
    .then(result => {
        // alert("Thank you! Your response has been saved.");
        console.log("Server result:", result, "Run ID:", run_id);
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
        diagnosis_input_page.style.display = "none";
        thank_you_page.style.display = "block";
        return;
    }
    document.getElementById("img1").src = "./images/" + image_names[img_index];
    start_time = Date.now();
});

function to_beginning() {
    thank_you_page.style.display = "none";
    name_input_page.style.display = "block";
}
