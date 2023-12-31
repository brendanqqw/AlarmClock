document.addEventListener("DOMContentLoaded", () => {
    const alarmTimeInput = document.getElementById("alarmTime");
    const setAlarmButton = document.getElementById("setAlarm");
    const cancelButton = document.getElementById("cancelAlarm");
    const timeDisplay = document.getElementById("time");
    let alarmInterval = null;

    setAlarmButton.addEventListener("click", () => {
        const alarmTime = alarmTimeInput.value;
        if (!alarmTime) {
            alert("Please enter a valid alarm time.");
            return;
        }

        const now = new Date();
        const alarmParts = alarmTime.split(":");
        const alarmDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(alarmParts[0]),
            parseInt(alarmParts[1])
        );

        const timeUntilAlarm = alarmDate - now;

        if (timeUntilAlarm <= 0) {
            alert("Please select a future time for the alarm.");
            return;
        }

        // Clear any previous countdown
        clearInterval(alarmInterval);

        // Update countdown every second
        alarmInterval = setInterval(() => {
            const timeUntilAlarm = alarmDate - new Date();
            if (timeUntilAlarm <= 0) {
                clearInterval(alarmInterval);
                timeDisplay.textContent = "Time to wake up!";
                alarmTimeInput.disabled = false;
                setAlarmButton.disabled = false;
                cancelButton.disabled = true;
                return;
            }
            updateCountdown(timeUntilAlarm / 1000); // Convert to seconds
        }, 1000);

        // Display the countdown
        updateCountdown(timeUntilAlarm / 1000); // Convert to seconds
        alarmTimeInput.disabled = true;
        setAlarmButton.disabled = true;
        cancelButton.disabled = false;
    });

    cancelButton.addEventListener("click", () => {
        clearInterval(alarmInterval);
        timeDisplay.textContent = "";
        alarmTimeInput.disabled = false;
        setAlarmButton.disabled = false;
        cancelButton.disabled = true;
    });

    function updateCountdown(countdownTime) {
        const minutes = String(Math.floor(countdownTime / 60)).padStart(2, "0");
        const seconds = String(Math.floor(countdownTime % 60)).padStart(2, "0");
        timeDisplay.textContent = `Time until alarm: ${minutes}:${seconds}`;
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
});
