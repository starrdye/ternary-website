// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add fade-in animation for fund cards
window.addEventListener('load', function() {
    const fundCards = document.querySelectorAll('.fund-card');
    fundCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Add fade-in animation for process steps
window.addEventListener('load', function() {
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Add hover effect to fund info buttons
document.querySelectorAll('.fund-info-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 51, 102, 0.2)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add scroll event listener for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Chat Bot Functionality
window.addEventListener('load', function() {
    // Create chat bot HTML elements
    const chatBotHTML = `
        <div class="chat-bot-container">
            <div class="chat-bot-window" id="chatBotWindow">
                <div class="chat-bot-header">
                    <h3>Fund Assistant</h3>
                    <button class="chat-bot-close" id="chatBotClose">&times;</button>
                </div>
                <div class="chat-bot-messages" id="chatBotMessages">
                    <div class="chat-message bot-message">
                        <p>Hello! How can I assist you today? Feel free to ask about our funds, family office criteria, or common costs.</p>
                    </div>
                    <div class="dummy-prompts">
                        <span class="dummy-prompt" data-question="What are the family office criteria?">Family office criteria</span>
                        <span class="dummy-prompt" data-question="What are the common costs?">Common costs</span>
                        <span class="dummy-prompt" data-question="Tell me about Cypress Fund">Cypress Fund info</span>
                    </div>
                </div>
                <div class="chat-bot-input">
                    <input type="text" id="chatBotInput" placeholder="Type your question...">
                    <button id="chatBotSend">➤</button>
                </div>
            </div>
            <button class="chat-bot-button" id="chatBotButton">💬</button>
        </div>
    `;

    // Append chat bot to body
    document.body.insertAdjacentHTML('beforeend', chatBotHTML);

    // Get chat bot elements
    const chatBotButton = document.getElementById('chatBotButton');
    const chatBotWindow = document.getElementById('chatBotWindow');
    const chatBotClose = document.getElementById('chatBotClose');
    const chatBotInput = document.getElementById('chatBotInput');
    const chatBotSend = document.getElementById('chatBotSend');
    const chatBotMessages = document.getElementById('chatBotMessages');
    const dummyPrompts = document.querySelectorAll('.dummy-prompt');

    // Toggle chat window
    chatBotButton.addEventListener('click', function() {
        chatBotWindow.classList.toggle('active');
    });

    // Close chat window
    chatBotClose.addEventListener('click', function() {
        chatBotWindow.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatBotInput.value.trim();
        if (message) {
            // Add user message
            chatBotMessages.insertAdjacentHTML('beforeend', `
                <div class="chat-message user-message">
                    <p>${message}</p>
                </div>
            `);
            
            // Clear input
            chatBotInput.value = '';
            
            // Scroll to bottom
            chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                let response = "I'm here to help with information about our funds and services. Could you please provide more details about your inquiry?";
                
                // Dummy responses based on keywords
                if (message.toLowerCase().includes('family office') || message.toLowerCase().includes('criteria')) {
                    response = "Our family office services typically require a minimum investment of $5 million. We offer customized solutions including investment management, estate planning, and tax optimization.";
                } else if (message.toLowerCase().includes('cost') || message.toLowerCase().includes('fee')) {
                    response = "Common costs include management fees ranging from 1-2%, performance fees typically 20% of profits, and administrative expenses. These vary based on the specific service and portfolio size.";
                } else if (message.toLowerCase().includes('cypress')) {
                    response = "Ternary Cypress Fund deploys a value investing strategy, trading public equities in undervalued industries. Minimum subscription is $100,000 with a 1.5% management fee and 20% performance fee.";
                }
                
                // Add bot response
                chatBotMessages.insertAdjacentHTML('beforeend', `
                    <div class="chat-message bot-message">
                        <p>${response}</p>
                    </div>
                `);
                
                // Scroll to bottom
                chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
            }, 1000);
        }
    }

    // Send message on button click
    chatBotSend.addEventListener('click', sendMessage);

    // Send message on enter key
    chatBotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Handle dummy prompts
    dummyPrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatBotInput.value = question;
            sendMessage();
        });
    });
});