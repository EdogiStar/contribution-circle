# Contribution circle

A savings circle, run properly. A fixed group of people pay in the same
amount every round, one member takes the whole pot each time, and
everybody can see whose turn is next, who has paid, and who is behind.

The circle is known as an ajo or esusu in Nigeria, susu in Ghana, tanda
in Mexico, a chit fund in India and a ROSCA in the literature. Millions
of people save this way, usually on paper, and the paper is the part
that goes wrong.

## What finished looks like

A stranger can open the URL, register, start a circle and settle the
order the pot goes round in before it takes a penny, write down what
everybody pays in, close a round and send the pot to whoever's turn it
is, chase whoever is behind and still pay out honestly when a round
comes up short, settle up with a member who has to leave, and come back
to find the next round closed itself on the day it was due.

Finished does not mean running on a laptop. It means eight people who
have never met the person who built it can save together on it for
eight months.

## The road map

Eight sprints. Each one makes a different part of that sentence true,
and the order is not arbitrary: take any sprint out and the sentence
stops being true.

| # | Sprint | What it makes possible |
|---|---|---|
| 1 | Getting in | Somebody can make an account the circle can recognise them by |
| 2 | Whose turn it is | A circle exists with a fixed group and an order settled before it takes a penny |
| 3 | The book | Every amount that moves is a line anybody can add up |
| 4 | Closing the round | A round closes once, and the pot goes to whoever's turn it is |
| 5 | When the pot is short | Somebody misses a payment and the round still closes honestly |
| 6 | Leaving the circle | A member who has to go is settled with, paid or unpaid |
| 7 | Rounds that turn themselves | The boundary turns on its date, with nobody pressing anything |
| 8 | Where people can reach it | It is on the internet, and the book survives the machine |

## The hard part

Not the arithmetic. Everybody pays in n times and takes out once, and a
child can check that.

The hard part is that the risk is not shared equally. The member who
takes the pot in round one has an interest-free loan from seven
strangers. The member who takes it in round eight has lent to all of
them and has nothing but their word for eight months. That asymmetry is
why the order is argued over, why it is fixed before the first payment
and not after, and why somebody who takes their turn early and then
stops paying has taken everybody else's money rather than merely their
own.

Sprints 2, 5 and 6 are that problem in three forms: deciding the order
and fixing it, what a round pays when somebody is short, and what it
costs to leave a circle you have already been paid from.

## Working on it

The sprints, their briefs and the tickets under them are in Blacksmith.
Start with sprint one; each sprint opens as the one before it closes.

The reading attached to a sprint is worth opening before its first
ticket rather than after. It carries the parts a ticket deliberately
does not: what the alternatives were, and which one you are choosing
between.

## What this is built with

The whole product: an API and the screens that use it.

- **Express 5** in **TypeScript** for the API.
- **Prisma** for the models and the migrations, against the schema in `prisma/schema.prisma`.
- **Zod** for validating every request, and **zod-to-openapi** for the OpenAPI schema, served at `/api/schema/` and browsable at `/api/docs/`.
- **JWT** for authentication, in `src/modules/auth`.
- **React** with **Vite** for the dev server and the build.
- **Chakra UI** for components, and **React Router** for routes.
- **TanStack Query** for every call to the API, so caching and refetching are decided in one place.

## Setting it up

You need the CLI once: `npm install -g blacksmith-cli`.

```bash
blacksmith setup     # dependencies, Prisma client, migrations
blacksmith dev       # start it
```

The API answers on `http://localhost:8000`, and the app on `http://localhost:5173`.

Copy `backend/.env.example` to `backend/.env` before the first run. It is ignored by git and holds the JWT secret, the database URL and anything else this project should not carry in its history.

## Where the code lives

```
backend/
├── prisma/
│   └── schema.prisma    # your models, and the migrations they generate
├── src/
│   ├── config/          # environment, OpenAPI, Zod setup
│   ├── db/              # the Prisma client, made once
│   ├── middleware/      # authentication, validation, error handling
│   ├── modules/
│   │   └── auth/        # register, log in, refresh
│   ├── utils/           # errors, pagination, tokens
│   ├── app.ts           # where routes are mounted
│   └── index.ts
├── package.json
└── tsconfig.json

frontend/
└── src/
    ├── api/
    │   ├── generated/   # written by `blacksmith sync` — do not edit
    │   └── hooks/       # your queries and mutations
    ├── pages/           # one folder per page
    ├── features/        # auth, and anything else that spans pages
    ├── router/          # routes and layouts
    ├── shared/          # components and hooks used across pages
    └── styles/
```

## Day to day

| Command | What it does |
| --- | --- |
| `blacksmith dev` | Run it locally. |
| `blacksmith sync` | Regenerate the frontend API types and hooks from the backend schema. Run it after changing a Zod schema or a route. |
| `blacksmith make:resource Post` | Scaffold a Prisma model, Zod schemas, a service, a controller and routes, plus the hooks and pages that use them. |
| `blacksmith backend <command>` | Run an npm script in the backend, e.g. `blacksmith backend run migrate`. |
| `blacksmith frontend <command>` | Run an npm command in the frontend, e.g. `blacksmith frontend install axios`. |
| `blacksmith eject` | Remove Blacksmith and keep a plain Express and React project. Nothing here is a dependency on us. |
