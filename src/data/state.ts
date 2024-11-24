import { questions, play_order } from '@/data/questions';

 // question_id: [vote_1 (for each vote), ...], where vote_1 is the vote count for the first option
// let currentVoteCounts = [0, 0, 0, 0];
export const voteCount: { [key: string]: number[] } = {};
Object.keys(questions).forEach((questionID) => {
    voteCount[questionID] = new Array(questions[questionID].options.length).fill(0);
});
export function resetVoteCount(questionID: string) {
    if (questions[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    voteCount[questionID] = new Array(questions[questionID].options.length).fill(0);
}
export function incrementVoteCount(questionID: string, optionIndex: number) {
    if (questions[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    if (optionIndex < 0 || optionIndex >= questions[questionID].options.length) {
        throw new Error('Invalid option index');
    }
    voteCount[questionID][optionIndex]++;
}

export let currentQuestionID = play_order[1];
export function setCurrentQuestionID(questionID: string) {
    if (questions[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    // make sure the question is in the play order
    if (play_order.indexOf(questionID) === -1) {
        throw new Error('Invalid question ID');
    }
    currentQuestionID = questionID;
}