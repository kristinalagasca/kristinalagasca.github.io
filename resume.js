var x = document.getElementsByClassName("terminal");
function terminalContent() {
    document.getElementById('t-content').innerHTML = '<p>guest@kristinalagasca.com ~/portfolio $ </p>';
}

$(document).ready(function()) {
    console.log("o.o");
    $(".prompt").html("guest@kristinalagasca.com ~/portfolio $ ");
}

print(terminalContent())