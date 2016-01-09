var read = require('read');

var Question = function (id, text, answer, points){
  this.id = id;
  this.text = text;
  this.answer = answer;
  this.points = points;
}

var Quiz = function (player, questions) {
  this.questions = questions;
  this.player = player;
  this.current_question = this.questions.shift();
  this.game_over = false;
  this.total = 0;
  this.bonus_id = Math.floor(Math.random()*questions.length);

  this.add_question = function (question) {
    this.questions.push(question);
  }

  this.correct_response = function () {
    console.log("Respuesta correcta!");
    this.total += this.current_question.points;
    this.next_question();
  }

  this.questions_left = function () {
    // console.log("Q length", this.questions);
    return this.questions.length > 0;
  }

  this.next_question = function () {
    if(this.questions_left()){
      this.current_question = this.questions.shift();
      if(!this.game_over){
        this.ask();
      }
    }
    else{
      console.log("END OF QUIZ");
    }
  }

  this.incorrect_response = function () {
    console.log("Incorrecto");
    this.total -= this.current_question.points;
    this.ask();
  }

  this.ask = function () {
    var _question = this.current_question.text + " Points: " + this.current_question.points;

    if(this.current_question.id === this.bonus_id){
      _question += " !!BONUS QUESTION!! "
      this.current_question.points *= 2;
    }

    options = {
        prompt: _question
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

var q1 = new Question(1, "Es esto una pregunta?", "Si", 45);
var q2 = new Question(2, "Es esto otra pregunta?", "No", 45);
var q3 = new Question(3, "De que color es el caballo blanco de Bolivar?", "Blanco", 15);
var quiz = new Quiz("R", [q1, q2, q3]);

quiz.ask();


