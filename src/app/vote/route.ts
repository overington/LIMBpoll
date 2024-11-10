import { NextRequest , NextResponse } from 'next/server';

let currentQuestionID = 1;
let currentVoteCounts = [0, 0, 0, 0];

export async function GET() {
    // Retrieve the current voting results (e.g., from database)
    return NextResponse.json({
        currentQuestionID: currentQuestionID,
        currentVoteCounts: currentVoteCounts,
    });
}

export async function POST(req: NextRequest) {
    // Update the current voting results
    const body = await req.json();
    console.log(body);

    return NextResponse.json({
        success: true,
    }, { status: 500 });
}

export async function PUT(req: NextRequest) {
    // Update the current question ID
    const body = await req.json();
    console.log(body);

    return NextResponse.json({
        success: true,
    });
}