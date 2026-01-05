const { input } = require("@inquirer/prompts");
const chalk = require("chalk");

// Array of questions and answer
async function showQuiz() {
    const questions = [{
        question: "What is the chemical symbol for gold?",
        answer: "Au"
    },
    {
        question: "Which continent is the only one with land in all four hemispheres?",
        answer: "Africa"
    },
    {
        question: " In what year was the first iPhone released?",
        answer: "2007"
    }];

    let score = 0;
    const timeLimit = 5000;

    for (const q of questions) {
        const timer = new Promise((_, reject) => {
            setTimeout(() => { reject(new Error("timeout")) }, timeLimit);
        });
        try {
            const answer = await Promise.race([input({ message: q.question }), timer]);

            if (answer.toLowerCase() === q.answer.toLowerCase()) {
                console.log(chalk.green("correct!"));
                score++;
            } else {
                console.log(chalk.red(` incorrect! the right answer is ${q.answer}`));
            }
        } catch (error) {
            if (error.message === "timeout") {
                console.log(chalk.yellow("\n\rToo slow! Time is up."));
                console.log(chalk.red(`The right answer was ${q.answer}`));
            } else {
                throw error;
            }
        }
    }
    console.log(chalk.green(`Score: ${score}/${questions.length}`));
    process.exit(0);
}

// export the function
module.exports = { showQuiz };