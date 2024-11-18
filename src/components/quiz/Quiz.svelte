<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { Post, Qna } from '$lib/sanity/queries';

	export let post: Post;

	let quiz = post.quiz;
	let questions: Qna[] = quiz ? quiz?.qna : [];
	let questionsPerRound: Qna[];
	let questionPointer = -1;
	let showResults = false;
	let results: any[] = [];
	let questionImages: any[];
	let amountOfQuestions = 10;
	$: questionsLength = isInRange(amountOfQuestions, 10, questions.length) ? amountOfQuestions : 10;
	let answers = new Array(questionsLength).fill(null);

	// function to validate amount of questions selected
	function isInRange(num: number, start: number, end: number): boolean {
		return num >= start && num <= end;
	}

	// function to shuffle values in an array
	function shuffle(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// Randomize questions and answers at start quiz
	function randomizeQuiz() {
		questions?.forEach((q) => shuffle(q.answerOption));
		shuffle(questions);
		validateImage();
		questionsPerRound = questions.slice(0, questionsLength);
	}

	// Process Images
	function validateImage() {
		questionImages = new Array(questionsLength).fill(null);
		questionsPerRound?.forEach(function (q, i) {
			if (q.questionImage) {
				questionImages[i] = q.questionImage;
			}
		});
	}

	// Function to create a results object and calculate score
	function quizResults() {
		let resultData: any[] = [];

		questionsPerRound?.forEach((e, i) => {
			let data = { question: '', userAnswer: '', correctAnswer: '', maru: false, note: '' };
			data.question = e.question;
			data.userAnswer = e.answerOption[answers[i]].answer;
			data.correctAnswer = e.answerOption.filter((o) => o.correct)[0].answer;
			data.note = e.answerNotes ? e.answerNotes : '';

			if (data.correctAnswer === data.userAnswer) {
				data.maru = true;
			}
			resultData.push(data);
		});
		results.push(resultData);
		showResults = true;
		return results;
	}

	//Restart quiz
	function restartQuiz() {
		questionsPerRound = [];
		answers.fill(null);
		results = [];
		questionsAnswered = 0;
		questionPointer = 0;
		showResults = false;
		canSubmitQuiz = false;
		randomizeQuiz();
	}

	// calculate progress
	$: questionsAnswered = answers.filter((value) => value != null).length;
	$: progressPercentage = Math.floor((questionsAnswered / questionsLength) * 100);
	$: canSubmitQuiz = questionsAnswered === questionsLength;

	$: console.log(answers, results);
</script>

<section>
	{#if questionPointer == -1}
		<div class="start-screen">
			<p>
				Quiz yourself on what you just learned!
				<br />Questions are randomized each round.
				<br />You can always comeback and quiz yourself again and again.
				<br />There are a total of {questions.length} questions for this quiz.
			</p>
			<p>
				<label for="amountOfQuestions"
					>Choose how many questions per round. The default is 10:</label
				>
			</p>
			<p>
				<input
					type="number"
					id="amountOfQuestions"
					name="amountOfQuestions"
					class="form-control rounded mt-5 mb-5"
					aria-label="amountOfQuestions"
					aria-describedby="amountOfQuestions"
					min="10"
					max={questions.length}
					bind:value={amountOfQuestions}
				/>
			</p>
			<button
				class="btn btn-primary mt-5"
				on:click={randomizeQuiz}
				on:click={() => (questionPointer = 0)}
				type="button"
				>Start Quiz
			</button>
		</div>
	{:else if !showResults}
		<div class="quiz-screen">
			<div class="main">
				<div class="card">
					<div
						class="progress"
						role="progressbar"
						aria-label="questions answered"
						aria-valuenow={questionsAnswered}
						aria-valuemin="0"
						aria-valuemax="11"
						style="height: 20px; width: 90%; margin: 20px auto;"
					>
						<div
							class="progress-bar overflow-visible progress-bar-striped progress-bar-animated bg-success"
							style="width: {progressPercentage}%; text-align: center;"
						></div>
					</div>
					<h4 class="card-header">{questionsPerRound[questionPointer].question}</h4>
					{#if questionImages[questionPointer]}
						<img class="img-fluid" src={urlFor(questionImages[questionPointer]).url()} alt="" />
					{/if}
				</div>
				<div class="answerOption">
					{#each questionsPerRound[questionPointer].answerOption as opt, i}
						<div class="d-grid gap-2 col-12 mx-auto">
							<button
								type="button"
								class="btn active m-2"
								on:click={() => {
									answers[questionPointer] = i;
								}}
							>
								<span>
									{#if answers[questionPointer] == i}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi-square-fill"
											viewBox="0 0 16 16"
										>
											<path
												d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-square"
											viewBox="0 0 16 16"
										>
											<path
												d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
											/>
										</svg>
									{/if}
								</span>
								<span>{opt.answer}</span>
							</button>
						</div>
					{/each}
				</div>
			</div>
			<div class="quiz-button">
				<button
					class="btn btn-secondary mt-5 mbri-arrow-prev"
					on:click={() =>
						questionPointer === 0 ? (questionPointer = questionsLength - 1) : questionPointer--}
				>
				</button>
				<button
					class="btn btn-secondary mt-5 mbri-arrow-next"
					on:click={() =>
						questionPointer + 1 == questionsLength ? (questionPointer = 0) : questionPointer++}
				>
				</button>
			</div>
			<div>
				<button
					class="btn btn-primary mt-5"
					title="answer all questions to submit"
					disabled={canSubmitQuiz ? false : true}
					on:click={quizResults}
					>Submit
				</button>
			</div>
		</div>
	{:else}
		<div class="result-screen">
			<p>Click for more result details!</p>
			<div>
				{#each results[0] as result, i}
					<div class="d-grid gap-2 col-12 mx-auto">
						<button
							type="button"
							class="btn active m-2"
							data-bs-toggle="collapse"
							data-bs-target="#collapseExample{i}"
							aria-expanded="false"
							aria-controls="collapseExample{i}"
						>
							<span>
								{#if result.maru}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="green"
										class="bi bi-check-square"
										viewBox="0 0 16 16"
									>
										<path
											d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
										/>
										<path
											d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="red"
										class="bi bi-x-square"
										viewBox="0 0 16 16"
									>
										<path
											d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
										/>
										<path
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
										/>
									</svg>
								{/if}
							</span>
							<span>{result.question}</span>
						</button>
						<div class="collapse" id="collapseExample{i}">
							<div class="card card-body">
								<ul class="list-group list-group-flush">
									<li class="list-group-item">
										<span class="text-start fw-bolder">Your Answer:</span>{result.userAnswer}
									</li>
									{#if !result.maru}
										<li class="list-group-item">
											<span class="text-start fw-bolder">Correct Answer:</span
											>{result.correctAnswer}
										</li>
									{/if}
									{#if result.note}
										<li class="list-group-item">
											<span class="text-start fw-bolder">Note:</span>{result.note}
										</li>
									{/if}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div>
				<button class="btn btn-primary mt-5" on:click={restartQuiz}> Another Round! </button>
			</div>
		</div>
	{/if}
</section>

<style>
	button,
	.list-group {
		text-align: left;
		display: inline-flex;
	}
	svg {
		margin-right: 10px;
	}
	.card {
		text-align: left;
		margin: 15px 0px;
	}
	span {
		margin-right: 10px;
	}
	.start-screen,
	.quiz-screen,
	.result-screen {
		margin-top: 48px;
	}
</style>
