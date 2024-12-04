This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# or
deno task dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Project Description:

A live poll app for use during a live performances, where a question is asked during the performance, and the audience should submit their answer via a web page which they access from their mobile browser. The app should be built using Typescript, and tailwind. NextJS should be used as the main app driver (pages, app router, voting API ... etc), and it should be built using the app router instead of the pages router. and the swr library should be used for submitting votes, recieving questions and updating the page in real time.

Participants should only be able to vote once per question. When the admin changes the question, this should automatically update the page on participants devices with the chosen question, and a list of possible answers that they can vote on.

## Pages

The app should have two pages - an admin dashboard and a public audience page.

### Admin page

The admin page should be a dashboard like page which controles the what the audience sees, and opens and closes the voting. The admin page should have the following features:
- To be able to view in real time, the accumulated number of votes for the current question.
- To be able to set the list of questions, 
- reveal which question should be shown simultaneously to all participants.

The admin page should have the following features:

- A form to add a new question, with a list of possible answers.
- A list of all questions that have been added, with the ability to delete a question.
- A form to edit the welcome message that is shown to the audience when there is no question to vote on.
- A controller to transition what is displayed on the voting page (Welcome message, waiting for question, voting, results). This transition should be instant, and should not require a page reload.
- A button to reset the results of questions.



### Voting Page: 

The voting page should should be a simple page that shows the current question, and a list of possible answers that the user can vote on. The user should be able to click on the answer they want to vote for, and the vote should be submitted to the server.

There are three types of page content which the voting page will display:

- Waiting: This is the initial content of the voting page, and should display a general welcome message.
- Question: This is the current question that the audience should vote on, and should display the question, and a list of possible answers, and a button to submit the vote.
- Results: This is the current results of the poll, and should display the number of votes for each answer, and the percentage of votes for each answer, and highlight the answer that the audience member voted for.

Once a user has voted, they should not be able to vote again, and the page should update in real time to show the current results of the poll.

## API

The app should have a simple API that the admin page can use to set the current question, and the list of possible answers, and to reveal the current question to the audience. The API should also be used by the voting page to submit votes, and to get the current question and list of possible answers. The API should be built using the NextJS API routes, and should be built using the app router instead of the pages router. The current question, list of possible answers, and current results should have a single source of source of truth, and should be able to be updated in real time when the admin makes changes in the dashboard.

## State Management



# Prompt

Think carefully about the architecture, and how this could best be put together and come up with the best solution for this problem. You can use any libraries you like, but you should use NextJS as the main app driver, and you should use Typescript and Tailwind. You should also use the SWR library to submit votes, recieve questions and update the page in real time.



# IP range for TVL



SSID – `Link In My Bio`
Password – `linkinmybio`
IP Range: 172.16.0.0/16 with DHCP range from 172.16.1.0-172.16.2.250
Server IP: 172.16.2.254