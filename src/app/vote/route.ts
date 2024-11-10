import { NextRequest , NextResponse } from 'next/server';
import { questions, Question } from '@/data/questions';

let currentQuestionID = "q1";
let currentVoteCounts = [0, 0, 0, 0];



export async function GET(request: NextRequest) {
    // Retrieve the current voting results (e.g., from database)
    return NextResponse.json({
        currentQuestionID: currentQuestionID,
        currentVoteCounts: currentVoteCounts,
    });
}


// export async function POST(request: NextRequest) {
//     console.log("POST request received", request);

//     try {
//         const formData = await request.formData();
//         const questionID = parseInt(formData.get('questionId') as string, 10);
//         const voteID = parseInt(formData.get('vote') as string, 10);

//         console.log("questionID", questionID);
//         console.log("voteID", voteID);

//         if (isNaN(questionID) || isNaN(voteID)) {
//             throw new Error('Invalid data types');
//         }

//         currentVoteCounts[voteID] += 1;

//         return NextResponse.json({
//             success: true,
//         }, { status: 200 }); // OK
//     } catch (error) {
//         console.error("Failed to submit vote:", error);
//         return NextResponse.json({
//             success: false,
//             message: error.message,
//         }, { status: 500 }); // Internal Server Error
//     }
// }

export async function PUT(req: NextRequest) {
    // Admin form PUT request to change the current question and reset the vote counts
    console.log("PUT request received", req);
    try {
        const formData = await req.json();
        const questionID = formData.question_id;

        if (questions[questionID] === undefined) {
            throw new Error('Invalid question ID');
        }

        currentQuestionID = questionID;
        currentVoteCounts = [0, 0, 0, 0];

        return NextResponse.json({
            success: true,
            message: "Question changed successfully",
        }, { status: 200 }); // OK
    } catch (error) {
        console.error("Failed to change question:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 400 }); // Bad Request
    }
}