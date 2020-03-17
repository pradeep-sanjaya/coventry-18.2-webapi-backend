import mongoose from 'mongoose';

const SecretQuestionSchema = mongoose.Schema;

let secretQuestionSchema = SecretQuestionSchema({
    question: {
        type: String,
        unique: true,
        required: true
    }
});

const SecretQuestion = mongoose.model('SecretQuestion', secretQuestionSchema, 'secret-questions');

module.exports = SecretQuestion;
