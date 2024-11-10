import { NextRequest , NextResponse } from 'next/server';
import { questions, type Question } from '@/data/questions';
import { ADMIN_TOKEN, USER_TOKEN } from '@/data/config';

let currentQuestionID = "q1";
let currentVoteCounts = [0, 0, 0, 0];



export async function GET(request: NextRequest) {
    // Retrieve the current voting results (e.g., from database)
    return NextResponse.json({
        currentQuestionID: currentQuestionID,
        currentVoteCounts: currentVoteCounts,
    });
}


export async function POST(req: NextRequest) {
    console.log("PUT request received", req);
    try {
        const token = req.headers.get('Authorization');
        if (token !== `Bearer ${USER_TOKEN}`) {
            throw new Error('Invalid token');
        }
        const questionID = req.nextUrl.searchParams.get('question_id');
        const voteID = req.nextUrl.searchParams.get('vote_idx');
        if (questionID === null || voteID === null || questionID !== currentQuestionID) {
            throw new Error('Invalid question ID or vote ID');
        }
        currentVoteCounts[parseInt(voteID)] += 1;
        return NextResponse.json({
            success: true,
        }, { status: 200 }); // OK
    } catch (error) {
        console.error("Failed to submit vote:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 }); // Internal Server Error
    }
}

export async function PUT(req: NextRequest) {
    console.log("PUT request received", req);
    try {
        // simple authentication with a token
        const token = req.headers.get('Authorization');
        if (token !== `Bearer ${ADMIN_TOKEN}`) {
            throw new Error('Invalid token');
        }
        const questionID = req.nextUrl.searchParams.get('set_current');
        if (questionID === null) {
            throw new Error('Invalid question ID');
        }

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