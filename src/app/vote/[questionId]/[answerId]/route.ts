'use server';

import { NextRequest, NextResponse } from 'next/server';
import { questions, Question } from '@/data/questions';

// state of the vote counts
let stateCount: { [questionId: string]: { [answerId: string]: number } } = {
    "q1": {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
    },
    "q2": {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
    },
}



export async function POST(req: NextRequest, { params } : { params: Promise<{ questionId: string, answerId: string }> }) {
    console.log("POST request received at /vote/[questionId]/[answerId]");
    console.log("req", req);
    try {
        const questionId = (await params).questionId;
        const answerId = (await params).answerId;

        // Increment the vote count


        stateCount[questionId][answerId] += 1;

        return NextResponse.json({
            success: true,
            message: "Vote submitted successfully",
        }, { status: 200 }); // OK
    } catch (error) {
        console.error("Failed to submit vote:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 400 }); // Bad Request
    }
}