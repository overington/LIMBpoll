import { NextRequest , NextResponse } from 'next/server';

let currentQuestionID = 1;
let currentVoteCounts = [0, 0, 0, 0];

export async function GET(request: NextRequest) {
    // Retrieve the current voting results (e.g., from database)
    return NextResponse.json({
        currentQuestionID: currentQuestionID,
        currentVoteCounts: currentVoteCounts,
    });
}

export async function POST(request: NextRequest) {
    // Update the current voting results
    console.log("POST request received");
    // console.log(request);
    let body = request;
    console.log(body);

    return NextResponse.json({
        success: true,
    }, { status: 200 }); // Accepted
    // }, { status: 202 }); // Accepted
}

export async function PUT(req: NextRequest) {
    // Update the current question ID
    const body = await req.json();
    console.log(body);

    return NextResponse.json({
        success: true,
    });
}