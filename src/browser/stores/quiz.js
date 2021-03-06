var QuizConstants = require('../constants/quiz_constants.js'),
    LessonConstants = require('../constants/lesson_constants.js'),
    Dispatcher = require('../dispatcher/dispatcher.js'),
    QuestionState = require('./question_state.js'),
    bean = require('bean'),
    _ = require('lodash');

var QuizStore = {
    questions: [],
    index: 0,
    getNextQuestion: function() {
        if (this.index === this.questions.length && this.index > 0) {
            return 'end';
        }
        return this.questions[this.index];
    },

    getQuestions: function() {
        return this.questions;
    },

    _saveAnswer: function(submittedAnswer) {
        var question = this.questions[this.index],
            correctAnswer = question.answers[question.correct - 1];
        question.state = (submittedAnswer === correctAnswer) ? QuestionState.CORRECT : QuestionState.INCORRECT;
    },

    getCorrectQuestions: function() {
        return this.questions.filter(function(question) {
            return question.state === QuestionState.CORRECT;
        });
    },

    register: function() {
        var _this = this;

        // Register to handle all updates
        Dispatcher.register(function(payload) {
            var action = payload.action;

            switch (action.actionType) {
                case LessonConstants.SET_ACTIVE_CONTENT:
                    _this.questions = payload.action.item.quiz.questions;
                    _this.id = payload.action.item.id;
                    bean.fire(_this, 'reset');
                    break;

                case QuizConstants.SUBMIT_ANSWER:
                    _this._saveAnswer(action.submittedAnswer);
                    break;

                case QuizConstants.NEXT_QUESTION:
                    _this.index++;
                    break;

                default:
                    return true;
            }

            // This often goes in each case that should trigger a UI change. This store
            // needs to trigger a UI change after every view action, so we can make the
            // code less repetitive by putting it here.  We need the default case,
            // however, to make sure this only gets called after one of the cases above.
            bean.fire(_this, 'changed');

            return true; // No errors.  Needed by promise in Dispatcher.
        });
    }
};

QuizStore.register();

module.exports = QuizStore;
