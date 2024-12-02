import { NextRequest, NextResponse } from "next/server";
import { questions } from "@/data/questions";
import {
  currentQuestionID,
  voteCounts,
  setCurrentQuestionID,
  incrementVoteCount,
  resetVoteCount,
} from "@/data/state";
import { ADMIN_TOKEN, USER_TOKEN } from "@/data/config";

export async function GET(req: NextRequest) {
  // Retrieve the current voting results (e.g., from database)
  try {
    const token = req.headers.get("Authorization");
    if (token === `Bearer ${ADMIN_TOKEN}`) {
      // 
      return NextResponse.json({
        currentQuestionID: currentQuestionID,
        voteCounts: voteCounts,
      });
    } else if (token === `Bearer ${USER_TOKEN}`) {
      // USER
      return NextResponse.json({
        currentQuestionID: currentQuestionID,
      });
    } else {
      throw new Error("Invalid Token ID");
    }
  } catch (error) {
    console.error("Failed to get vote:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    ); // Internal Server Error
  }
}

export async function POST(req: NextRequest) {
  /**
   * POST request to submit a vote
   *
   * This function is called when a user submits a vote, and it increments the vote count for the selected option.
   */
  console.log("POST request received", req);
  try {
    const token = req.headers.get("Authorization");
    if (token !== `Bearer ${USER_TOKEN}`) {
      throw new Error("Invalid token");
    }
    const questionID = req.nextUrl.searchParams.get("question_id");
    const voteID = req.nextUrl.searchParams.get("vote_idx");
    if (
      questionID === null ||
      voteID === null ||
      questionID !== currentQuestionID
    ) {
      throw new Error("Invalid question ID or vote ID");
    }
    // currentVoteCounts[parseInt(voteID)] += 1;
    // voteCount[questionID][parseInt(voteID)] += 1;
    incrementVoteCount(questionID, parseInt(voteID));
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    ); // OK
  } catch (error) {
    console.error("Failed to submit vote:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    ); // Internal Server Error
  }
}

export async function PUT(req: NextRequest) {
  console.log("PUT request received", req);
  try {
    // simple authentication with a token
    const token = req.headers.get("Authorization");
    if (token !== `Bearer ${ADMIN_TOKEN}`) {
      throw new Error("Invalid token");
    }
    const questionID = req.nextUrl.searchParams.get("set_current");
    if (questionID === null) {
      throw new Error("Invalid question ID");
    }

    if (questions[questionID] === undefined) {
      throw new Error("Invalid question ID");
    }

    setCurrentQuestionID(questionID);

    return NextResponse.json(
      {
        success: true,
        message: "Question changed successfully",
      },
      { status: 200 }
    ); // OK
  } catch (error) {
    console.error("Failed to change question:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 400 }
    ); // Bad Request
  }
}

export async function PATCH(req: NextRequest) {
  console.log("PATCH request received", req);
  try {
    // simple authentication with a token
    const token = req.headers.get("Authorization");
    if (token !== `Bearer ${ADMIN_TOKEN}`) {
      throw new Error("Invalid token");
    }
    const questionID = req.nextUrl.searchParams.get("reset_vote");
    if (questionID === null) {
      throw new Error("Invalid question ID");
    }

    if (questions[questionID] === undefined) {
      throw new Error("Invalid question ID");
    }

    // currentQuestionID = questionID;
    // currentVoteCounts = [0, 0, 0, 0];
    console.log("Resetting vote count for question:", questionID);
    // voteCount[currentQuestionID] = new Array(questions[currentQuestionID].options.length).fill(0);
    resetVoteCount(questionID);

    return NextResponse.json(
      {
        success: true,
        message: "Question changed successfully",
      },
      { status: 200 }
    ); // OK
  } catch (error) {
    console.error("Failed to change question:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 400 }
    ); // Bad Request
  }
}
