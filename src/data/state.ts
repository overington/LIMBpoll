import { questions, messages, play_order } from '@/data/questions';

 // question_id: [vote_1 (for each vote), ...], where vote_1 is the vote count for the first option
// let currentVoteCounts = [0, 0, 0, 0];
export type voteCountsType = { [key: string]: number[] }
export const voteCounts: voteCountsType = {};
Object.keys(questions).forEach((questionID) => {
    voteCounts[questionID] = new Array(questions[questionID].options.length).fill(0);
});
export function resetVoteCount(questionID: string) {
    if (questions[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    voteCounts[questionID] = new Array(questions[questionID].options.length).fill(0);
}
export function incrementVoteCount(questionID: string, optionIndex: number) {
    if (questions[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    if (optionIndex < 0 || optionIndex >= questions[questionID].options.length) {
        throw new Error('Invalid option index');
    }
    voteCounts[questionID][optionIndex]++;
}


export function setCurrentQuestionID(questionID: string) {
    // switch case to handle the different types of questions
    // questions[questionID
    if (questions[questionID] === undefined && messages[questionID] === undefined) {
        throw new Error('Invalid question ID');
    }
    currentQuestionID = questionID;
}

export let currentQuestionID: string;
setCurrentQuestionID(play_order[0]);