// Utility function to format date and time
function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
}

// Utility function to display notifications
function displayNotifications(data) {
    const notifications = [];
    const now = new Date().toISOString();

    data.forEach(product => {
        if (product.stock < product.threshold) {
            const notification = `${product.name} stock is low. Current stock: ${product.stock}, Threshold: ${product.threshold}`;
            notifications.push(notification);
            addToLog(notification, now);
        }
    });

    if (notifications.length > 0) {
        showNotification(notifications.join('<br>'));
    } else {
        showNotification('No products are low on stock.');
    }
}

// Function to add notification to log
function addToLog(notification, dateTime) {
    let log = JSON.parse(localStorage.getItem('notificationLog')) || [];
    log.unshift({ message: notification, time: dateTime }); // Add new notifications to the beginning

    // Limit the number of logs to prevent excessive growth
    if (log.length > 100) {
        log = log.slice(0, 100);
    }

    localStorage.setItem('notificationLog', JSON.stringify(log));
    updateLogDisplay();
}

// Function to update log display
function updateLogDisplay() {
    const logList = document.getElementById('log-list');
    const log = JSON.parse(localStorage.getItem('notificationLog')) || [];
    logList.innerHTML = ''; // Clear previous logs
    log.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${formatDateTime(entry.time)}: ${entry.message}`; // Include time in log
        logList.appendChild(li);
    });
}

// Function to show notification on the page
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageDiv = document.getElementById('message');
    const closeBtn = document.querySelector('.notification .close-btn');
    
    messageDiv.innerHTML = message;
    notification.style.display = 'block';
    closeBtn.style.display = 'block'; // Show the close button
}

// Function to hide notification
function closeNotification() {
    document.getElementById('notification').style.display = 'none';
    document.querySelector('.notification .close-btn').style.display = 'none'; // Hide the close button
}

// Function to fetch and parse CSV file from a predefined URL
function handleFileFromURL(fileURL) {
    fetch(fileURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(csv => {
            try {
                const lines = csv.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
                const headers = lines[0].split(',');
                const data = lines.slice(1).map(line => {
                    const values = line.split(',');
                    if (values.length === headers.length) {
                        return {
                            name: values[0],
                            stock: parseInt(values[1], 10),
                            threshold: parseInt(values[2], 10)
                        };
                    } else {
                        console.warn('Skipping invalid line:', line);
                        return null;
                    }
                }).filter(item => item !== null); // Remove null entries
                displayNotifications(data);
            } catch (error) {
                console.error('Error processing file:', error);
                showNotification('Error processing file. Please check the format.');
            }
        })
        .catch(error => {
            console.error('Error fetching file:', error);
            showNotification('Error fetching file. Please check the URL or network connection.');
        });
}

// Example usage with a predefined file URL
const fileURL = '"C:\Users\vasis\Desktop\test\products.csv"';
handleFileFromURL(fileURL);


// Event listeners for buttons
document.getElementById('showNotifications').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files.length ? fileInput.files[0] : new File([''], 'product.csv');
    handleFile(file);
});

document.getElementById('clearNotificationLog').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none';
    document.querySelector('.notification .close-btn').style.display = 'none'; // Hide the close button
    localStorage.removeItem('notificationLog');
    updateLogDisplay();
});

// Update log display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLogDisplay();
});
document.getElementById('show-notifications').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'block';
});

document.getElementById('clear-notifications').addEventListener('click', function() {
    const logList = document.getElementById('notification-log');
    logList.innerHTML = ''; // Clear all notifications from log
});

function hideNotification() {
    document.getElementById('notification').style.display = 'none';
}
// Event listener for showing notifications
document.getElementById('show-notifications').addEventListener('click', function() {
    const notificationSection = document.getElementById('notification');
    if (notificationSection.style.display === 'block') {
        notificationSection.style.display = 'none'; // Hide if already visible
    } else {
        notificationSection.style.display = 'block'; // Show if hidden
        // Optionally, load notifications from a source here
    }
});

// Event listener for clearing notifications
document.getElementById('clear-notifications').addEventListener('click', function() {
    const logList = document.getElementById('notification-log');
    logList.innerHTML = ''; // Clear all notifications from log
});

// Function to hide the notification box
function hideNotification() {
    document.getElementById('notification').style.display = 'none';
}

// Example function to add a notification to the log (for demo purposes)
function addNotification(message) {
    const logList = document.getElementById('notification-log');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    logList.appendChild(listItem);
}

// Example of adding a notification
// This can be replaced with dynamic data
addNotification('You have a new message.');
addNotification('Your order has been shipped.');
// Utility function to format date and time
function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
}

// Utility function to display notifications
function displayNotifications(data) {
    const notifications = [];
    const now = new Date().toISOString();

    data.forEach(product => {
        if (product.stock < product.threshold) {
            const notification = `${product.name} stock is low. Current stock: ${product.stock}, Threshold: ${product.threshold}`;
            notifications.push(notification);
            addToLog(notification, now);
        }
    });

    if (notifications.length > 0) {
        showNotification(notifications.join('<br>'));
    } else {
        showNotification('No products are low on stock.');
    }
}

// Function to add notification to log
function addToLog(notification, dateTime) {
    let log = JSON.parse(localStorage.getItem('notificationLog')) || [];
    log.unshift({ message: notification, time: dateTime }); // Add new notifications to the beginning
    localStorage.setItem('notificationLog', JSON.stringify(log));
    updateLogDisplay();
}

// Function to update log display
function updateLogDisplay() {
    const logList = document.getElementById('log-list');
    const log = JSON.parse(localStorage.getItem('notificationLog')) || [];
    logList.innerHTML = ''; // Clear previous logs
    log.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${formatDateTime(entry.time)}: ${entry.message}`; // Include time in log
        logList.appendChild(li);
    });
}

// Function to show notification on the page
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageDiv = document.getElementById('message');
    const closeBtn = document.querySelector('.notification .close-btn');
    
    messageDiv.innerHTML = message;
    notification.style.display = 'block';
    closeBtn.style.display = 'block'; // Show the close button
}

// Function to hide notification
function closeNotification() {
    document.getElementById('notification').style.display = 'none';
    document.querySelector('.notification .close-btn').style.display = 'none'; // Hide the close button
}

// Function to handle file upload and parse CSV
function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const csv = event.target.result;
        const lines = csv.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
            const values = line.split(',');
            if (values.length === headers.length) {
                return {
                    name: values[0],
                    stock: parseInt(values[1], 10),
                    threshold: parseInt(values[2], 10)
                };
            } else {
                // Handle or log invalid line
                console.warn('Skipping invalid line:', line);
                return null;
            }
        }).filter(item => item !== null); // Remove null entries
        displayNotifications(data);
    };
    reader.readAsText(file);
}

// Event listeners for buttons
document.getElementById('showNotifications').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files.length ? fileInput.files[0] : new File([''], 'product.csv');
    handleFile(file);
});

document.getElementById('clearNotificationLog').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none';
    document.querySelector('.notification .close-btn').style.display = 'none'; // Hide the close button
    localStorage.removeItem('notificationLog');
    updateLogDisplay();
});

// Update log display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLogDisplay();
});
