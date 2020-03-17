import SecretQuestion from '../models/secret-questions';

export default function makeMetaDataList() {
    return Object.freeze({
        getSecretQuestions,
    });

    async function getSecretQuestions() {
        try {
            return SecretQuestion.find().then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}
