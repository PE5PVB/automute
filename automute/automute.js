//////////////////////////////////////////////////////////////////////////////////////
///                                                                                ///
///  AUTO MUTE INSERTER FOR FM-DX-WEBSERVER (V1.0)                                 ///
///                                                                                /// 
///  by Highpoint & PE5PVB                                                         ///
///  powered by PE5PVB                                                             ///
///                                                                                ///
///                                                        last update: 09-06-2024 ///
//////////////////////////////////////////////////////////////////////////////////////

// Function to send a command to the client via WebSockets
function sendCommandToClient(command) {
    // Determine the WebSocket protocol based on the current page
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Determine the host of the current page
    const host = window.location.host;
    // Construct the WebSocket URL
    const wsUrl = `${protocol}//${host}/text`;

    // Create a WebSocket connection to the specified URL
    const autoMuteSocket = new WebSocket(wsUrl);

    // Event listener for opening the WebSocket connection
    autoMuteSocket.addEventListener("open", () => {
        console.log("WebSocket-Connected.");
        // Send the command via the WebSocket connection
        console.log("Sending command:", command);
        autoMuteSocket.send(command);
    });

    // Event listener for WebSocket errors
    autoMuteSocket.addEventListener("error", (error) => {
        console.error("WebSocket-error:", error);
    });

    // Event listener for receiving a message from the server
    autoMuteSocket.addEventListener("message", (event) => {
        // Close the WebSocket connection after receiving the response
        autoMuteSocket.close();
    });

    // Event listener for closing the WebSocket connection
    autoMuteSocket.addEventListener("close", () => {
        console.log("WebSocket-Closed.");
    });
}

// Function to initialize and customize the elements
function initialize() {
    // Create the button
    const newButton = document.createElement('button');
    newButton.id = 'mute-on-off';
	newButton.classList.add("tooltip");
    newButton.setAttribute('aria-label', 'Mute');
    newButton.setAttribute('data-tooltip', 'Auto mute on/off');
    newButton.style.borderRadius = '0px 0px 0px 0px';
    newButton.style.width = 'calc(100% - 2px)'; // Width of 100% minus 2px for the margin
    newButton.style.margin = '0 1px'; // Margin of 1px on the right and left
    newButton.style.position = 'relative';
    newButton.style.top = '0px';
    newButton.style.right = '0px';
    newButton.innerHTML = 'Auto<br>Mute'; // Button text
    newButton.classList.add('bg-color-3'); // Set background color based on existing class

    // Find the elements "button-eq" and "button-ims"
    const buttonEq = document.querySelector('.button-eq');
    const buttonIms = document.querySelector('.button-ims');

    // Create a new div element for the new button
    const newDiv = document.createElement('div');
    newDiv.className = 'panel-50 no-bg h-100 m-0';
    newDiv.appendChild(newButton);

    // Insert the new div element between "button-eq" and "button-ims"
    buttonEq.parentNode.insertBefore(newDiv, buttonIms);

    // Function to toggle between Auto-Mute and Disable
    function toggleAutoMute() {
            sendCommandToClient('H3');
    }

    // Add the event listener to the button
    newButton.addEventListener('click', toggleAutoMute);

    // Align the panel with the slider to the right
    const panel = document.querySelector('.panel'); // Assuming there's a panel class to align
    if (panel) {
        panel.style.display = 'flex';
        panel.style.justifyContent = 'flex-end';
    }
}

// Initialize the customizations after the page loads
window.addEventListener('load', initialize);
