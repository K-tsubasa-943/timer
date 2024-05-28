document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const timeDisplay = document.getElementById('time-display');
    const elapsedTimeDisplay = document.getElementById('elapsed-time-display');
    const timeInput = document.getElementById('time-input');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');

    let totalTime;
    let remainingTime;
    let elapsedTime;
    let interval;
    let isPaused = false;

    startButton.addEventListener('click', toggleTimer);
    stopButton.addEventListener('click', toggleTimer);
    resetButton.addEventListener('click', resetTimer);
    timeInput.addEventListener('input', validateInput);

    function validateInput(event) {
        const input = event.target.value;
        event.target.value = input.replace(/[^\d]/g, '');
    }

    function toggleTimer() {
        if (interval) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    function startTimer() {
        if (isPaused) {
            isPaused = false;
        } else {
            totalTime = parseInt(timeInput.value) * 60;
            remainingTime = totalTime;
            elapsedTime = 0;

            if (isNaN(totalTime) || totalTime <= 0) {
                alert('有効な時間を入力してください');
                return;
            }
        }

        interval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    function stopTimer() {
        clearInterval(interval);
        interval = null;
        isPaused = true;
    }

    function resetTimer() {
        clearInterval(interval);
        interval = null;
        isPaused = false;
        timeInput.value = '';
        timeDisplay.textContent = '残り時間: 00:00';
        elapsedTimeDisplay.textContent = '経過時間: 00:00';
        drawCircle(1);
    }

    function updateTimer() {
        if (remainingTime <= 0) {
            clearInterval(interval);
            interval = null;
            timeDisplay.textContent = '残り時間: 00:00';
            elapsedTimeDisplay.textContent = '経過時間: ' + formatTime(elapsedTime);
            drawCircle(0);
            return;
        }

        remainingTime--;
        elapsedTime++;
        timeDisplay.textContent = '残り時間: ' + formatTime(remainingTime);
        elapsedTimeDisplay.textContent = '経過時間: ' + formatTime(elapsedTime);

        drawCircle(remainingTime / totalTime);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function drawCircle(percentage) {
        const radius = canvas.width / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景円
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#eee';
        ctx.fill();

        // 残り時間の円弧
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, -0.5 * Math.PI, (2 * percentage - 0.5) * Math.PI);
        ctx.lineTo(radius, radius);
        ctx.fillStyle = '#b0c4de'; // lightsteelblue
        ctx.fill();
    }
});