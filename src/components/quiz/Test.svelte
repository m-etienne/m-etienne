<!-- 
 ---need to flip through questions ---MVP
---option to email questions, responses, and correct/wrong answers
---option to share quiz results anonymously with the author
---option to retake the quiz ---MVP 
-->

<script>
  let questions = [
    {
      "question": "Which of the following special symbols is allowed in a variable name?",
      "options": [
        {
          "answer": "* asterisk",
          "correct": false
        },
        {
          "answer": "| pipeline",
          "correct": false
        },
        {
          "answer": "- hyphen",
          "correct": false
        },
        {
          "answer": "_ underscore",
          "correct": true
        },
      ]
    },
    {
      "question": "What is the official birthday of the internet?",
      "options": [
        {
          "answer": "January 1, 1983",
          "correct": true
        },
        {
          "answer": "January 11, 1983",
          "correct": false
        },
        {
          "answer": "January 1, 1973",
          "correct": false
        },
        {
          "answer": "January 11, 1980",
          "correct": false
        },
      ]
    },
    {
      "question": "What's my name?",
      "options": [
        {
          "answer": "turtle karma",
          "correct": false
        },
        {
          "answer": "majster",
          "correct": false
        },
        {
          "answer": "schmarje",
          "correct": false
        },
        {
          "answer": "marj",
          "correct": true
        },
      ]
    },
    {
      "question": "True or False: Okane Kasegu, Watashi Wa STA.",
      "options": [
        {
          "answer": "True",
          "correct": true
        },
        {
          "answer": "False",
          "correct": false
        },
      ]
    },
    {
      "question": "True or False: I like to dance.",
      "options": [
        {
          "answer": "True",
          "correct": true
        },
        {
          "answer": "False",
          "correct": false
        },
      ]
    },

  ];
  let answers = new Array(questions.length).fill(null);
  let questionPointer = -1;
  let showResults = false;
  /**
	* @type {any[]}
	*/
  let results = [];

  // function to shuffle values in an array
  /**
	 * @param {any[]} array
	 */
  function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  // Randomize questions and answers at start quiz
  function randomizeQuiz() {
    questions.forEach(e => shuffle(e.options))
    shuffle(questions)
  }

  // Function to create a results object and calculate score
  const quizResults = function (){
    /**
   * @type {any[]}
   */
    let resultData = [];
    let score = 0;
    
    questions.forEach((e, i) => {
      let data = {question:'', userAnswer:'', correctAnswer:'', maru:false}
      data.question = e.question;
      data.userAnswer = e.options[answers[i]].answer;
      data.correctAnswer = e.options.filter(o => o.correct)[0].answer;

      if (data.correctAnswer === data.userAnswer){
        score++
        data.maru = true
      }
      resultData.push(data)
    });

    score = (score / questions.length) * 100; 
    results.push(resultData, score + '%');
    console.log(results)
    return results
  }

  //Restart quiz
  function restartQuiz(){
    randomizeQuiz()
    answers.fill(null)
    results.fill(null)
    questionPointer = -1
    showResults = false
  }

  // calculate progress
  $: progress = answers.filter(value => value != null).length/questions.length
</script>

<section>
  <!-- Should I have captcha? -->
  {#if questionPointer == -1}
    <div class="start-screen">
      <h1>Quiz Title</h1>
      <p>Quiz yourself on the content above, then you can send yourself the results.</p>
      <button on:click={() => questionPointer = 0}>Start Quiz</button>
    </div>
  {:else if !showResults}
    <div class="quiz-screen">
      <div class="main">
        <h2>{questions[questionPointer].question}</h2>
        <div class="options">
          {#each questions[questionPointer].options as opt,i}
            <button class="{answers[questionPointer]==i ? 'selected' :''}" on:click={() => {answers[questionPointer]=i;}}> {opt.answer}</button>
          {/each}
        </div>
      </div>
      <div class="quiz-footer">
        <div class="quiz-progress">
          <p>{progress}</p>
        </div> 
      </div>
      <div class="quiz-button">
        <button on:click={() => questionPointer === 0 ? questionPointer = questions.length - 1 : questionPointer--}>&lt;</button>
        <button on:click={() => questionPointer+1 == questions.length ? questionPointer = 0 : questionPointer++}>&gt;</button>
      </div>
      <div>
        <button on:click={quizResults} on:click={() => showResults = true}>Submit Quiz</button>
      </div>
    </div>
  {:else}
    <div class="result-screen">
      <div>
        {#each results[0] as result}
          <p>{result.question}</p>
            <p>Correct answer: {result.correctAnswer}</p>
            <p style="color: {result.correctAnswer === result.userAnswer ? 'green' : 'red'};">Your answer: {result.userAnswer}</p>
        {/each}
      </div>
      <div>
        <button on:click={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    </div>
  {/if}
</section>


<style>
  .quiz-screen .main .options button.selected {
    background: #111;
    color: #eee;
  }



  .quiz-screen .quiz-footer {
    position:fixed;
    bottom: 0px;
    left: 0px;
    width: 100;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quiz-screen .quiz-footer > div {
    margin: 0px 10px;
}

  .quiz-screen .quiz-footer .quiz-progress {
    width: 150px;
    height: 10px;
    background: #aaa;
    border-radius: 10px;
    overflow: hidden;
}

  .quiz-screen .quiz-footer .quiz-progress div {
    height: 100%;
    background: #4a77dc;
  }

</style>