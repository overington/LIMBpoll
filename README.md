This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Play requirements

Things to create:
    - contents of this should have all questions / scenarios.
    - Each scenario should also lead to the next branch in the story line
    - There should be a way of repeating scenarios
    - There should be a defined start and end
    - There should be a way of defining a conditional end: eg after 5 scenarios
        - There shuold be a catchall funnel or all branches should be well-defined
        - well defined meaning that they have distinct start and end nodes, and methods of moving from one to the other.

# Technical Questions and task list:
- play.json
    - A file which describes scenarios, story flows, how each scenario is connected and start points for the procession of the play.
    - [ ] create a reader, such that when a new client starts up, it will be able to go to the particular part of the storyline.
- how to run the poll?
    - does the poll need a database?
- how do we represent global state for all users?
    - in next.js, we have the ability to run server side functions to render content - usually done through creating an `_app.js` or `_document.js` file:
        - `_app.js`: runs on both server and client
        - `_document.js`: only runs server side script
        

