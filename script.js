/* ALL PAGES */

//Change color of navigation link for active page
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li a');

    navLinks.forEach(link => {
        // Check if the link's href matches the current page's URL
        if (link.href === window.location.href) {
            link.classList.add('active');  // Add the 'active' class to the current link
        }
    });
});




/*  DRINKS PAGE */

function showIngredients(button) {
    var ingredients = button.parentElement.querySelector('.ingredients');
    if (ingredients.style.display === "none") {
        ingredients.style.display = "block"; // Show ingredients
    } else {
        ingredients.style.display = "none"; // Hide ingredients
    }
}


/*  ATHLETES PAGE */

document.addEventListener('DOMContentLoaded', () => {
    const playGameButton = document.getElementById('play-game');
    const showInfoButton = document.getElementById('show-info');
    const landingDiv = document.getElementById('landing');
    const gameDiv = document.getElementById('game');
    const infoDiv = document.getElementById('info');
    const nextQuestionButton = document.getElementById('next-question');
    const resultDiv = document.getElementById('result');
    const scoreText = document.getElementById('score');
    const resultGif = document.getElementById('result-gif');

    // Game data
    const athletes = [
        {
            name: "Gerhard Berger",
            image: "pictures/athletes/gerhard-berger.jpg",
            options: ["F1", "Skiing", "Rowing", "Surfing"],
            correct: "F1",
        },
        {
            name: "Xeno Müller",
            image: "pictures/athletes/xeno-muller-portrait.jpeg",
            options: ["Rowing", "BMX", "Skiing", "F1"],
            correct: "Rowing",
        },
        {
            name: "Shane McConkey",
            image: "pictures/athletes/shane-mcconkey-portrait.jpeg",
            options: ["Rowing", "BMX", "Skiing", "F1"],
            correct: "Skiing",
        },
        {
            name: "Miles Daisher",
            image: "pictures/athletes/miles-daisher-portrait.jpg",
            options: ["BMX", "Base Jumper", "Skiing", "F1"],
            correct: "Base Jumper",
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const loadQuestion = () => {
        const athlete = athletes[currentQuestionIndex];
        const athleteImage = document.getElementById('athlete-image');
        athleteImage.src = athlete.image;
    
        // Set consistent image dimensions
        athleteImage.style.width = "300px";
        athleteImage.style.height = "300px";
        athleteImage.style.objectFit = "cover";
    
        document.getElementById('athlete-name').textContent = athlete.name;
    
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = ''; // Clear previous options
    
        // Filter options based on screen size
        const isSmallScreen = window.innerWidth <= 500;
        const filteredOptions = isSmallScreen ? athlete.options.slice(0, 3) : athlete.options;
    
        // Display options
        filteredOptions.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-button';
            button.addEventListener('click', () => handleAnswer(option));
            optionsDiv.appendChild(button);
        });
    };
    
    // Handle resizing
    window.addEventListener('resize', () => {
        loadQuestion();
    });
    
    
    

    const handleAnswer = (selectedOption) => {
        const athlete = athletes[currentQuestionIndex];
        if (selectedOption === athlete.correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < athletes.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };

    const showResult = () => {
        gameDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        scoreText.innerHTML = `<strong> Your score: ${score}/${athletes.length}</strong>`;
    
        // Check score and display appropriate message
        if (score >= 3) {
            resultGif.src = 'gifs/win-gif.webp'; 
            
            // Add a funny message when score is greater than 3
            const funnyMessage = ["You nailed it!", "You're basically an athlete now!", "Next stop, the Olympics!", "You’re on fire!"];
            const randomMessage = funnyMessage[Math.floor(Math.random() * funnyMessage.length)];
            
            // Append the funny message directly to the score text
            scoreText.innerHTML += `<br>${randomMessage}`;
            
        } else {
            resultGif.src = 'gifs/fail-gif.webp';
            scoreText.innerHTML += `<br>Your family is disappointed in you...`;
        }
    
        // Create the Exit button
        const exitButton = document.createElement('button');
        exitButton.textContent = 'See Athletes Info';
        exitButton.className = 'exit-button';
        exitButton.addEventListener('click', () => {
            // Hide the result section and show the athlete info section
            resultDiv.classList.add('hidden');
            infoDiv.classList.remove('hidden');
        });
    
        // Append the Exit button to the result div
        resultDiv.appendChild(exitButton);
    };
    
    
    

    // Button event listeners
    playGameButton.addEventListener('click', () => {
        landingDiv.classList.add('hidden');
        gameDiv.classList.remove('hidden');
        loadQuestion();
    });

    showInfoButton.addEventListener('click', () => {
        landingDiv.classList.add('hidden');
        infoDiv.classList.remove('hidden');
    });
});
