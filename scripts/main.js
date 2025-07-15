const img_json =
{
    "Skerik testi": [
        "Skerik-grey-scale-test-v.04.pdf",
        "Skerik-grey-scale-test-v.07.pdf",
        "Skerik-grey-scale-test-v.06.pdf",
        "Skerik-grey-scale-test-v.03.pdf",
        "Skerik-grey-scale-test-v.05.pdf",
        "Skerik-grey-scale-test-v.01.pdf",
        "Skerik-grey-scale-test-v.02.pdf",
        "Skerik-grey-scale-test-introduction.pdf",
        "Skerik-grey-scale-test-v.08.pdf",
        "Skerik-grey-scale-test-v.09.pdf",
        "Skerik-grey-scale-test-v.10.pdf"
    ],
    "test": [
        "00001093_008.png",
        "00001100_002.png",
        "00001096_001.png"
    ],
    "V2": [
        "00001075_004.png",
        "00001075_015.png",
        "00001006_028.png",
        "00001047_003.png",
        "00001034_004.png",
        "00001075_046.png",
        "00001045_004.png",
        "00001047_002.png",
        "00001045_003.png",
        "00001075_003.png"
    ],
    "V1": [
        "00000491_004.png",
        "00000376_007.png",
        "00000417_001.png",
        "00000390_000.png",
        "00000790_000.png",
        "00000807_000.png",
        "00000372_002.png",
        "00000415_002.png",
        "00000508_000.png",
        "00000362_001.png"
    ]
};
// console.log(img_json);

const script_url = "https://script.google.com/macros/s/AKfycbxdVukPVYnvCPZdRuvIFtNX-AQG29ZTzsd62l4LiK-mtc4X_odFE-_Sm72Hl_ZWAZVL/exec";
let start_time = Date.now();
let img_index = 0;
let username = "";
let run_id = 0;
let version = "";
let img_name_list = [];

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
    console.log("Selected test:", version);
    if (img_json[version] === undefined) {
        alert("Nav bilžu šim variantam");
        return;
    }
    img_name_list = img_json[version];
    if (img_name_list.length < 1) {
        alert("Nav bilžu šim variantam");
        return;
    }
    test_select_page.style.display = "none";
    test_explanation_page.style.display = "block";
}

function start_test() {
    start_time = Date.now();
    img_index = 0;
    document.getElementById("img1").src = "./images/" + version + "/" + img_name_list[img_index];
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
    if (version != "test") {
        const url = script_url
            + "?run_id="        + encodeURIComponent(run_id)
            + "&username="      + encodeURIComponent(username)
            + "&version="       + encodeURIComponent(version)
            + "&img="           + encodeURIComponent(img_name_list[img_index])
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
    }

    // clear text
    document.getElementById("inputField").value = "";

    // go to next image
    img_index++;
    if (img_index >= img_name_list.length) {
        // no more images
        // show thank you page
        diagnosis_input_page.style.display = "none";
        thank_you_page.style.display = "block";
        return;
    }
    document.getElementById("img1").src = "./images/" + version + "/" + img_name_list[img_index];
    start_time = Date.now();
});

function to_beginning() {
    thank_you_page.style.display = "none";
    name_input_page.style.display = "block";
}
