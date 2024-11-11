document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    let username = 'Anonymous';

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            username = data.ip;
        })
        .catch(error => console.error('Error fetching IP:', error));

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.textContent = `${username}: ${messageText}`;
            messagesContainer.appendChild(messageElement);
            messageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});