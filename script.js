const questions=[
    {
        question : " Moore Machine is an application of:",
        answers : [
            
               { text: "Finite automata without input", correct:false },
                { text: "Finite automata with output", correct:true },
                { text: "Non Finite automata with output",correct:false  },
                { text: "None of the mentioned",correct:false  }

            
        ]
    },
    {
        question : " In Moore machine, output is produced over the change of:",
        answers : [
            
               { text: "transitions", correct:false },
                { text: "states", correct:true },
                { text: "all of the mentioned",correct:false  },
                { text: "none of the mentioned",correct:false  }

            
        ]
    },
    {
        question : " Statement 1: Null string is accepted in Moore Machine.\nStatement 2: There are more than 5-Tuples in the definition of Moore Machine.\nChoose the correct option:",
        answers : [
            
               { text: "Statement 1 is true and Statement 2 is true", correct:true },
                { text: "Statement 1 is true while Statement 2 is false", correct:false },
                { text: "Statement 1 is false while Statement 2 is true",correct:false  },
                { text: "Statement 1 and Statement 2, both are false",correct:false  }

            
        ]
    },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    startQuestion();
}

function startQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const iscorrect=selectedBtn.dataset.correct==="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display='block';
}
function showScore(){
    resetState();
    questionElement.innerHTML=`     You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        startQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();