const API_KEY = 'AIzaSyCJa9it0sDoEyYzZV0yUhfnvrdxw0NY7GA';

function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    
    recognition.onresult = async function (event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log('Voice Command:', command);
        processCommand(command);
    };
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'v') {
        startListening();
    }
});

async function processCommand(command) {
    if (command.includes('available slot')) {
        fetch('/status')
            .then(response => response.json())
            .then(data => {
                const availableSlot = data.findIndex(slot => slot === 'Empty');
                if (availableSlot !== -1) {
                    speak(`Slot ${availableSlot + 1} is available.`);
                } else {
                    speak('No slots available.');
                }
            });
    } else if (command.includes('book slot')) {
        const slotNumber = parseInt(command.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(slotNumber)) {
            speak(`Booking slot ${slotNumber}.`);
        } else {
            speak('Please mention a valid slot number.');
        }
    } else {
        speak('Command not recognized. Try saying, "Find available slot" or "Book slot 2".');
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

document.body.insertAdjacentHTML('beforeend', '<button onclick="startListening()">🎤 Voice Command</button>');
