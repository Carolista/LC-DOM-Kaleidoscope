/*** KALEIDOSCOPE ***/

/*
    Your goal is to make this interactive for users. They should be able to:
        - Choose a color scheme
        - Select a specific color from that scheme to use to change hexagons
        - Always have white and off-black (#222) as options
        - "Fill" the hexagons in the kaleidoscope with different colors
        - Edit only one "slice", and the others will reflect it
        - If the user changes color schemes, the entire kaleidoscope needs to reflect the change

    BONUS: Make the page work in light mode or dark mode

    The HTML and CSS files are set. It is recommended not to edit them.
    The color schemes and some JS functionality are provided in this file already; you just need to make everything interactive for the user.
*/

/** DATA **/

let schemes = [
    { "name": "Fresh Melon", "colors": ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"]},
    { "name": "Tahiti", "colors": ["#ff9f1c","#ffbf69","#ffffff","#cbf3f0","#2ec4b6"]},
    { "name": "Lush Lipstick", "colors": ["#4f000b","#720026","#ce4257","#ff7f51","#ff9b54"]},
    { "name": "Lake House", "colors": ["#086788","#07a0c3","#f0c808","#fff1d0","#dd1c1a"]},
    { "name": "Club Neon", "colors": ["#75dddd","#84c7d0","#9297c4","#9368b7","#aa3e98"]},
    { "name": "Disco", "colors": ["#5f0f40","#9a031e","#fb8b24","#e36414","#0f4c5c"]},
    { "name": "Daytona", "colors": ["#b09e99","#fee9e1","#fad4c0","#c0fdfb","#64b6ac"]},
    { "name": "Tahoe", "colors": ["#c17c74","#7a6c5d","#bcac9b","#ddc9b4","#2a3d45"]},
    { "name": "Poolside", "colors": ["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},
    { "name": "Wisteria", "colors": ["#360568","#5b2a86","#7785ac","#9ac6c5","#4eb870"]},
    { "name": "Sitka", "colors": ["#db504a","#ff6f59","#b2b09b","#254441","#43aa8b"]},
    { "name": "Mocha Latte", "colors": ["#5e3023","#f3e9dc","#895737","#c08552","#dab49d"]},
    { "name": "Mount Rainier", "colors": ["#131515","#2b2c28","#fffafb","#7de2d1","#339989"]},
    { "name": "Flagstaff", "colors": ["#2a9d8f","#264653","#e9c46a","#f4a261","#e76f51"]}
];
// HT: Hex values for palettes copied, rather efficiently, from https://coolors.co/palettes/trending

let currentScheme = schemes[Math.floor(Math.random() * schemes.length)]; // randomized default on page load
let currentColor = currentScheme.colors[0]; // default to first color of scheme


/** DOM STUFF **/

// Event listener for page load
window.addEventListener("load", function() {
    console.log('Page loaded.');
    init();
});

// DOM code for page elements
function init() {

    // Display color schemes on page
    for (let i=0; i<11; i++) {
        for (let j=0; j<5; j++) {
            document.getElementById("group" + i + "-" + j).style.backgroundColor = schemes[i].colors[j];
        }
    }

    // Display current color options on page
    function displayCurrentOptions() {
        for (let i=0; i<5; i++) {
            document.getElementById("color" + i).style.backgroundColor = currentScheme.colors[i];
        }  
    }

    // Display first five colors
    displayCurrentOptions();
    // These two only have to be done once
    document.getElementById("white").style.backgroundColor = "white";
    document.getElementById("grey").style.backgroundColor = "#222";

    // For selecting a new color
    function resetBorders() {
        let choices = document.getElementsByClassName("color-option");
        for (let i=0; i<7; i++) {
            choices[i].style.borderColor = "#CCC"
            choices[i].style.borderWidth = 1 + "px";
            choices[i].style.margin = 10 + "px";
        }
    }

    // For selecting a new color
    function highlightSelection(element) {
        element.style.borderColor = "#222";
        element.style.borderWidth = 4 + "px";
        element.style.margin = 7 + "px";
    }

    // Use event delegation for click events on page
    document.addEventListener('click', function (event) {

        // If user wants to change color scheme
        if (event.target.id.slice(0,5) === "group") {
            // Pull scheme from array
            if (event.target.id.length % 2 === 0) {
                currentScheme = schemes[Number(event.target.id.slice(5,6))];
            } else {
                currentScheme = schemes[Number(event.target.id.slice(5,7))];
            }
            // Update display on page
            displayCurrentOptions();
            // Set default selection to first color if not grey or white
            if (event.target.id !== "white" && event.target.id !== "grey") {
                currentColor = currentScheme.colors[0];
                resetBorders();
                highlightSelection(document.getElementById("color0"));
            }
        }

        // If user wants to change current color
        if (event.target.matches(".color-option")) {
            resetBorders();
            currentColor = event.target.style.backgroundColor;
            highlightSelection(event.target);
        }

        // If user clicks on hexagon
        if (event.target.matches(".hexagon")) {
            event.target.style.backgroundColor = currentColor;
        } 

    }, false);


    



}