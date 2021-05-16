let formElement = document.getElementById("form");
let inputField = document.querySelector(".input-field");
let outputBox = document.querySelector(".output");
let outputList = document.querySelector(".output-list");
let outputItem = document.querySelector(".output-item");
let terminalContainer = document.querySelector(".terminal-container");

// Input field is automatically in focus
inputField.focus();

// If terminal div is clicked, focus on inputField.
terminalContainer.addEventListener("click", ()=>{
    inputField.focus();
})

// HISTORY
let historyList = [];
let historyPosition = 0;
let historyTemp = 0;

function createListItem() {
    let results = document.createElement('div');
    results.classList.add("cmd-results");
    // If inputfield = 'help', all commands, else error
    // Use template strings to show links
    if (inputField.value.toLowerCase() === 'help') {
        addPreviousCmd();

        results.innerHTML = `
            <div class="help-item">
                <h4 class="cmd">Commands:</h4> <h4 class="description">Description:</h4>
            </div>
            <div class="help-item">
                <h4 class="cmd-item">ls</h4> <h4 class="description-item">lists all files in current directory</h4>
            </div>
            <div class="help-item">
                <h4 class="cmd-item">social</h4> <h4 class="description-item">my social medias</h4>
            </div>
            <div class="help-item">
                <h4 class="cmd-item">clear</h4> <h4 class="description-item">clear command history</h4>
            </div>
        `
        // Add results to output box
        outputList.appendChild(results);

    } else if (inputField.value.toLowerCase() === 'ls') {
        addPreviousCmd();

        results.innerHTML = `
            <div class="directory-list">
                <ul class="list">
                    <li><a href="aboutme.html">aboutme.txt</a></li>
                    <li><a href="writeups.html">writeups.txt</a></li>
                    <li><a href="resume.pdf">resume.pdf</a></li>
                </ul>
            </div>
        `
        // Add results to output box
        outputList.appendChild(results);

    } else if (inputField.value.toLowerCase() === 'social') {
        addPreviousCmd();

        results.innerHTML = `
            <div class="socials-list">
                <ul class="list">
                    <li><a href="https://www.linkedin.com/in/kristinamarielagasca/">linkedin</a></li>
                    <li><a href="https://twitter.com/tinyxtina_">twitter</a></li>
                    <li><a href="https://www.instagram.com/imkristina_/">instagram</a></li>
                </ul>
            </div>
        `
        // Add results to output box
        outputList.appendChild(results);

    } else if (inputField.value.toLowerCase() === 'clear') {
        addPreviousCmd();

        outputList.innerHTML = ``;

    } else {
        addPreviousCmd();
        templateString = `
        <br>
        zsh:  command not found: ${inputField.value}
        <br><br>
        Input 'help' to see the full list of commands.
        <br><br>
        `
        results.innerHTML = templateString;
        outputList.appendChild(results);
    }

    function addPreviousCmd() {
        let previousNode = document.createTextNode(inputField.value);
        let history = document.createElement('p');
        history.classList.add('pre');
        history.appendChild(previousNode);
        outputList.appendChild(history);
    }

    // Empty out the input field
    inputField.value = '';
}

function logSubmit(event) {
    // Prevent default form submission action
    event.preventDefault();

    // Add input value to history
    historyList.push(inputField.value);
    historyPosition++;

    // Show output box
    outputBox.style.display = "block";

    // Create new li element
    createListItem();
}

formElement.addEventListener('submit', logSubmit);

formElement.addEventListener('keydown', (e) => {
    // If the historyList array has at least 1 item:
    if (historyList.length) {

        // Up Arrow Key Pressed
        if (e.code == "ArrowUp") {
            historyPosition --;
            // History position stops at 0
            if (historyPosition < 0) {
                historyPosition = 0;
                inputField.value = historyList[historyPosition];
            } else {
                inputField.value = historyList[historyPosition];
            }
        }
        // Down Arrow Key Pressed
        else if (e.code == "ArrowDown") {
            historyPosition ++;
            if (historyPosition > historyList.length - 1) {
                historyPosition = historyList.length - 1;
                inputField.value = historyList[historyPosition];
            } else {
                inputField.value = historyList[historyPosition];
            }
        }
    }
});