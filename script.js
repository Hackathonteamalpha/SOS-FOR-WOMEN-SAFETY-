document.getElementById('activate').addEventListener('click', function() {
    activateSOS();
});

document.getElementById('stop').addEventListener('click', function() {
    stopSOS();
});

function activateSOS() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
            oscillator.connect(audioContext.destination);
            oscillator.start();
            setTimeout(() => oscillator.stop(), 5000); // Beep for 5 seconds

            flashScreen();
        }).catch(function(err) {
            console.error('Error accessing audio:', err);
        });
    } else {
        alert('Audio access is not supported in this browser.');
    }
}

function stopSOS() {
    // Logic to stop SOS alert
    // This part may need specific implementation based on how you manage audio
    console.log('SOS stopped.');
}

function flashScreen() {
    let body = document.body;
    let isFlashing = false;

    let interval = setInterval(function() {
        if (isFlashing) {
            body.style.backgroundColor = '#000';
        } else {
            body.style.backgroundColor = '#f00';
        }
        isFlashing = !isFlashing;
    }, 500);

    setTimeout(function() {
        clearInterval(interval);
        body.style.backgroundColor = '#000'; // Reset to original color
    }, 5000); // Flash for 5 seconds
}