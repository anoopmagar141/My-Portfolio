// Default time zone is local
let selectedTimeZone = 'local';
let isDarkMode = true; // Default is dark mode
let alarmTime = null; // Alarm time
let alarmSound = new Audio('assets/sounds/alarm.mp3'); // Alarm sound file
let buttonClickSound = new Audio('assets/sounds/button-click.mp3'); // Button click sound
let timerInterval = null; // Timer interval for countdown timer

// Stopwatch Variables
let stopwatchTime = 0;
let stopwatchRunning = false;
let stopwatchInterval;

// Countdown Timer Variables
let countdownTime = 0;
let countdownInterval;
let countdownRunning = false;
let countdownDisplay = document.getElementById('countdown-timer');


// Update Clock
function updateClock() {
    const now = selectedTimeZone === 'local' ? new Date() : new Date(new Date().toLocaleString("en-US", { timeZone: selectedTimeZone }));
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const isPM = hours >= 12;

    const displayHours = hours % 12 || 12;

    const timeString = `${String(displayHours).padStart(2, '0')}:${minutes}:${seconds}${isPM ? ' PM' : ' AM'}`;
    document.getElementById('time').textContent = timeString;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    document.getElementById('date').textContent = date;

    let greeting = '';
    if (hours < 12) {
        greeting = 'Good Morning!';
    } else if (hours < 17) {
        greeting = 'Good Afternoon!';
    } else {
        greeting = 'Good Evening!';
    }
    document.getElementById('greeting').textContent = greeting;

    const quotes = [
        "Stay positive, work hard, make it happen.",
        "Walk slowly, but never backward.",
        "The secret of getting ahead is getting started.",
        "Believe you can and you're halfway there."
    ];
    document.getElementById('quote').textContent = quotes[Math.floor(now.getSeconds() / 2) % quotes.length];

    // Check for Alarm
    checkAlarm(now);
}

// Function to play sound when a button is clicked
function playButtonClickSound() {
    buttonClickSound.play();
}

// Listen to timezone change
document.getElementById('time-zone-select').addEventListener('change', (e) => {
    selectedTimeZone = e.target.value;  // Update the selected time zone
    updateClock();  // Refresh the clock with the updated time zone
});

// Toggle Light/Dark Mode
document.getElementById('toggle-theme').addEventListener('click', () => {
    playButtonClickSound(); // Play sound when button is clicked
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode'); // Ensure dark mode can be toggled
    isDarkMode = !isDarkMode;
    document.getElementById('toggle-theme').textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});


// Set Alarm
document.getElementById('set-alarm').addEventListener('click', () => {
    playButtonClickSound(); // Play sound when button is clicked

    const alarmInput = document.getElementById('alarm-time').value;
    if (!alarmInput) {
        alert('Please set a valid alarm time.');
        return;
    }

    alarmTime = alarmInput;
    alert(`Alarm set for ${alarmTime}`);
});

// Check if the current time matches the alarm time
function checkAlarm(now) {
    if (alarmTime) {
        const [alarmHour, alarmMinuteWithPeriod] = alarmTime.split(':');
        const alarmMinute = alarmMinuteWithPeriod.slice(0, 2);
        const alarmPeriod = alarmMinuteWithPeriod.slice(3);

        let alarmTimeHour = parseInt(alarmHour, 10);
        if (alarmPeriod === 'PM' && alarmTimeHour !== 12) {
            alarmTimeHour += 12;
        } else if (alarmPeriod === 'AM' && alarmTimeHour === 12) {
            alarmTimeHour = 0;
        }

        if (now.getHours() === alarmTimeHour && now.getMinutes() === parseInt(alarmMinute, 10) && now.getSeconds() === 0) {
            alarmSound.play();
            alert('Alarm ringing!');
            alarmTime = null;
        }
    }
}

// Classic Clock Drawing (optional, if you want to draw the clock face)
function drawClassicClock() {
    const canvas = document.getElementById('classic-clock');
    const ctx = canvas.getContext('2d');
    const now = new Date();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Hour hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * 2) * (hour / 12));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius / 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.restore();

    // Minute hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * 2) * (minute / 60));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.8);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.restore();

    // Second hand
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI * 2) * (second / 60));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.restore();
}
// Update Stopwatch Display
function updateStopwatch() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    document.getElementById('stopwatch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to Start Stopwatch
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatch();
        }, 1000);
        document.getElementById('start-stopwatch').textContent = 'Pause';
        document.getElementById('pause-stopwatch').textContent = 'Pause';
    }
}

// Function to Pause Stopwatch
function pauseStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        document.getElementById('start-stopwatch').textContent = 'Resume';
        document.getElementById('pause-stopwatch').textContent = 'Resume';
    }
}

// Start/Pause Toggle (First Button)
document.getElementById('start-stopwatch').addEventListener('click', () => {
    if (stopwatchRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

// Separate Pause Button (Second Button)
document.getElementById('pause-stopwatch').addEventListener('click', () => {
    if (stopwatchRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

// Reset Stopwatch
document.getElementById('reset-stopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    updateStopwatch();
    document.getElementById('start-stopwatch').textContent = 'Start';
    document.getElementById('pause-stopwatch').textContent = 'Pause';
});


// Initial clock update
updateClock();
setInterval(updateClock, 1000);
setInterval(drawClassicClock, 1000);




// Function to update the countdown display
function updateCountdownDisplay() {
    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start the countdown
function startCountdown() {
    if (!countdownRunning && countdownTime > 0) {
        countdownRunning = true;
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                updateCountdownDisplay();
            } else {
                clearInterval(countdownInterval);
                countdownRunning = false;
                alert("Time's up!");
            }
        }, 1000);
        document.getElementById('start-timer').textContent = 'Pause';
    } else {
        pauseCountdown();
    }
}

// Function to pause the countdown
function pauseCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    document.getElementById('start-timer').textContent = 'Resume';
}

// Function to reset the countdown
function resetCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTime = 0;
    updateCountdownDisplay();
    document.getElementById('start-timer').textContent = 'Start';
}

// Event listener to start/pause the countdown
document.getElementById('start-timer').addEventListener('click', () => {
    if (countdownRunning) {
        pauseCountdown();
    } else {
        startCountdown();
    }
});

// Event listener to reset the countdown
document.getElementById('reset-timer').addEventListener('click', resetCountdown);

// Event listener to set countdown time from input
document.getElementById('timer-input').addEventListener('change', () => {
    let inputSeconds = parseInt(document.getElementById('timer-input').value);
    if (!isNaN(inputSeconds) && inputSeconds > 0) {
        countdownTime = inputSeconds;
        updateCountdownDisplay();
    } else {
        alert("Please enter a valid number of seconds.");
    }
});

// Initialize countdown display
updateCountdownDisplay();
