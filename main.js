/*
Functionalilties of the main.js file:
1. done - when the add button is clicked, the input value is added to the list and removed from the text input box
2. done - when the delete button is clicked, the item is removed from the list
3. done - When the page is visited, the img is visible and the list is hidden
4. done - When the first item is added, the img is hidden and the list is visible
5. done - When the last item is removed, the img is visible and the list is hidden
6. done - When the page is visited, the list is empty
7. done - When the page is visited, the text input box is empty
8. done - When the page is visited, the add button is disabled
9. the actual time and date is displayed on the page
10. the time is updated every second
11. everything is inside the stage
*/

document.addEventListener("DOMContentLoaded", function () {
    const greetingElement = document.querySelector(".Greeting");
    const name = "Amna"; // Change this name to yours! :)
    const addButton = document.querySelector(".enterBar button");
    const inputBox = document.querySelector(".enterBar input");
    const todoList = document.querySelector(".ToDoList");
    const placeholderImg = document.querySelector(".noItem");
    const dateTimeDisplay = document.querySelector("p");
    const timeElement = document.querySelector(".time"); // Time display
    const timePeriodElement = document.querySelector(".time2"); // AM/PM display


    // Function to update greeting based on time of day
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting = "";

        if (hour < 12) {
            greeting = "Good Morning";
        } else if (hour < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        // Update the greeting text
        greetingElement.innerHTML = `${greeting}, <br> ${name}! 🤓`;
    }

    // Function to update date and time display
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        // Update the date display
        if (dateTimeDisplay) {
            const formattedDate = now.toLocaleDateString(undefined, options);
            if (dateTimeDisplay.textContent !== `Today, ${formattedDate}`) {
                dateTimeDisplay.textContent = `Today, ${formattedDate}`;
            }
        } else {
            console.error("Date element is missing in the DOM.");
        }

        // Update the time display
        if (timeElement && timePeriodElement) {
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const period = hours >= 12 ? "PM" : "AM";

            timeElement.textContent = `${hours % 12 || 12}:${minutes}:${seconds}`; // Convert to 12-hour format
            timePeriodElement.textContent = period; // Display AM/PM
        } else {
            console.error("Time elements are missing in the DOM.");
        }
    }
    

    // Function to toggle visibility of list and placeholder image
    function toggleListVisibility() {
        if (todoList.children.length === 0) {
            placeholderImg.style.display = "block";
            todoList.style.display = "none";
        } else {
            placeholderImg.style.display = "none";
            todoList.style.display = "block";
        }
    }

    function addItem() {
        const itemText = inputBox.value.trim();
        if (itemText !== "") {
            const listItem = document.createElement("div");
            listItem.className = "checkbox-wrapper-15";
    
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "inp-cbx";
            checkbox.style.display = "none";
            checkbox.id = `cbx-${Date.now()}`; // Unique ID for each checkbox
    
            const label = document.createElement("label");
            label.className = "cbx";
            label.setAttribute("for", checkbox.id);
            label.innerHTML = `
                <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                </span>
                <span>${itemText}</span>`;
    
            const deleteButton = document.createElement("img");
            deleteButton.src = "bin.png"; 
            deleteButton.alt = "Delete";
            deleteButton.className = "bin"; // Add a class for styling
            deleteButton.addEventListener("click", function () {
                todoList.removeChild(listItem);
                toggleListVisibility();
            });
    
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
    
            inputBox.value = "";
            addButton.disabled = true;
            toggleListVisibility();
        }
    }
    
    // Enable/disable add button based on input box value
    inputBox.addEventListener("input", function () {
        addButton.disabled = inputBox.value.trim() === "";
    });

    // Add item on button click
    addButton.addEventListener("click", addItem);

    // Initial setup
    inputBox.value = "";
    addButton.disabled = true;
    updateGreeting();
    toggleListVisibility();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update date and time every second
});
