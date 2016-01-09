var read = require('read');

var Question = function (id, text, answer){
  this.id = id;
  this.text = text;
  this.answer = answer;
}

var Quiz = function (player, questions) {
  this.questions = questions;
  this.player = player;
  this.current_question = this.questions.shift();
  this.game_over = false;

  this.add_question = function (question) {
    this.questions.push(question);
  }

  this.correct_response = function () {
    console.log("Respuesta correcta!");
    this.next_question();
  }

  this.next_question = function () {
    this.current_question = this.questions.shift();
    if(!this.game_over){
      this.ask();
    }
  }

  this.incorrect_response = function () {
    console.log("Incorrecto");
    this.ask();
  }

  this.ask = function () {
    var _question = this.current_question;
    options = {
        prompt: this.current_question.text
    }

    read(options, check_answer);

    function check_answer (err, answer){
      if(quiz.current_question.answer.toLowerCase() == answer.toLowerCase()){
        quiz.correct_response();
      }
      else{
        quiz.incorrect_response();
      }
    }
  }
}

var q1 = new Question(1, "Es esto una pregunta?", "Si");
var q2 = new Question(2, "Es esto otra pregunta?", "No");
var quiz = new Quiz("R", [q1, q2]);

quiz.ask();


