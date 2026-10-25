import type { Project } from "./types";

/**
 * Selected work, strongest first. The order here is the order on the page,
 * and the index numbers (01, 02, ...) come from it.
 *
 * To add a project: append an object, drop screenshots in public/projects/<slug>/,
 * and it gets a card, a detail page, a sitemap entry and an OG image automatically.
 */
export const projects: Project[] = [
  {
    slug: "esummit-controls",
    title: "E-Summit Controls Portal",
    problem:
      "Event-day check-in for 4,000+ attendees, without a queue of people waiting on a spreadsheet lookup.",
    year: "2026",
    role: "Full stack, two-person team",
    context: "E-Summit, IIT Roorkee",
    stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Socket.io", "JWT"],
    why: [
      "Before this, the controls desk checked every attendee by hand: find the Summit ID in a spreadsheet, read the details, then print an ID card. It was slow and error-prone, and it was the first thing every attendee saw.",
    ],
    approach: [
      "A check-in portal for the controls team. Each attendee gets a QR code with their Summit ID by email. At the desk, a volunteer scans it, the portal fetches the attendee, the volunteer checks their details and prints a badge in one click.",
      "Any phone can act as the scanner. It pairs with a desk laptop over a Socket.io session and pushes each scan to that desk, so the camera doesn't have to be the laptop's. The same lookup doubles as an information desk: type any Summit ID to answer a question without opening the database.",
      "A live dashboard shows totals, check-ins and pending arrivals, and an audit log records who checked in whom, and when.",
    ],
    decision: {
      title: "Moving off Google Sheets before event day",
      body: [
        "The first version used a Google Sheet as the database. Check-in read the row, looked at its status, then wrote \"Printed\" back. With several desks scanning at once, that read-then-write left a gap where two desks could both see \"Not printed\" for the same person, and every lookup paid for a Sheets API round trip.",
        "I moved the backend to Postgres. A lookup by Summit ID is one query instead of a Sheets API round trip, and marking a badge printed is a single atomic write, so a second scan of the same ID is reported as \"already checked in\" instead of printing a duplicate badge.",
      ],
    },
    architecture: [
      { step: "QR issued", detail: "A batch script generates a QR code per Summit ID, emailed with the ticket." },
      { step: "Scan", detail: "The desk camera, or a paired phone that relays the ID to its desk over Socket.io." },
      { step: "Lookup", detail: "A JWT-authenticated Express API fetches the attendee by Summit ID from Postgres." },
      { step: "Verify and print", detail: "The volunteer checks the details. A print stylesheet renders a badge with only the name and QR code." },
      { step: "Mark printed", detail: "An atomic write records the status, the volunteer and a timestamp. The dashboard and audit log update." },
    ],
    learned: [
      "A spreadsheet is fine as a source of truth until two people write to it at the same moment. On event day, that's every moment.",
      "Hardware is part of the system. Letting any phone be the scanner removed the busiest desk's dependence on one laptop camera.",
    ],
    links: [{ label: "Live portal (team login)", href: "https://summit-controls.vercel.app" }],
    repoNote: "Code is private: it handles attendee data.",
  },
  {
    slug: "campusflow",
    title: "CampusFlow",
    problem:
      "Campus ride-sharing that matches a passenger to the best nearby driver in seconds, and never gives one driver two rides.",
    year: "2026",
    role: "Solo, backend and frontend",
    stack: ["TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Socket.IO", "Next.js", "Docker"],
    why: [
      "Getting across a large campus usually means waiting for a shuttle or messaging around for a ride. CampusFlow matches a passenger with a nearby driver automatically, and both sides follow the ride live.",
    ],
    approach: [
      "A NestJS API with a matching engine built on Redis. A ride request runs a GEO search for online drivers within a radius, then ranks them by a weighted score of distance, rating and acceptance rate. The weights live in config and must sum to 1.",
      "Matching runs as a BullMQ job. The chosen driver has 15 seconds to accept. A delayed job times the offer out, and the ride is re-matched or ends as NO_DRIVER_FOUND. Every ride follows one state machine from SEARCHING to COMPLETED, enforced in the service layer.",
      "Live updates go over Socket.IO, with separate /passenger and /driver namespaces authenticated by JWT. Driver locations live in Redis with a TTL. Postgres gets a throttled copy: a SET NX key lets each driver flush at most once per interval.",
      "Production basics are in from the start: env validated at boot, refresh-token rotation with blacklisting, Redis rate limiting, Helmet, and a /health endpoint that checks both Postgres and Redis.",
    ],
    decision: {
      title: "Two locks for one driver",
      body: [
        "Several matching workers can run at once, so two rides can pick the same best driver. I lock at two layers.",
        "First, a Redis lock (driver:lock:{id}, SET NX with a 20-second expiry) is the fast path. A worker that can't take it skips to the next candidate instead of waiting. Second, the assignment itself happens in a Postgres transaction with SELECT FOR UPDATE on the ride row. The Redis lock keeps workers from contending. The row lock is the safety net, because a Redis lock can expire and the database is what must stay correct. If the ride changed state in between, the worker releases the driver lock so that driver stays available.",
      ],
    },
    architecture: [
      { step: "Request", detail: "The passenger app creates a ride in SEARCHING and enqueues a match-ride job." },
      { step: "Candidates", detail: "Redis GEOSEARCH within the radius, ranked by distance, rating and acceptance." },
      { step: "Lock", detail: "Redis SET NX on the driver, then SELECT FOR UPDATE on the ride inside a transaction." },
      { step: "Offer", detail: "SEARCHING becomes ASSIGNED and the driver is notified over Socket.IO. A delayed job starts the 15-second window." },
      { step: "Accept or time out", detail: "Accept moves the ride forward. Timeout or decline re-matches, excluding that driver." },
      { step: "Track", detail: "Driver heartbeats update Redis and stream to the ride room. Postgres is flushed on a throttle." },
    ],
    learned: [
      "Writing the spec first paid off. The repo started with eleven design docs (state machine, Redis schema, socket protocol, matching engine), and the code cites them section by section.",
      "Redis is fast at answering who is nearby, and Postgres is good at refusing to be wrong. The design gives each one the job it's good at.",
      "Not done yet: Jest is configured but there are no tests. That's next.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/thedevkansal/campusflow" },
      { label: "Live demo", href: "https://campusflow-go.vercel.app" },
    ],
    shot: {
      src: "/projects/campusflow/ride.png",
      alt: "CampusFlow passenger view: a live map tracking the assigned driver on the way to pickup",
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        src: "/projects/campusflow/landing.png",
        alt: "CampusFlow landing page",
        width: 1440,
        height: 1697,
      },
    ],
  },
  {
    slug: "living-town",
    title: "Living Town",
    problem:
      "Memory for multi-agent systems that tracks how knowledge moves between agents, and can prove where every belief came from.",
    year: "2026",
    role: "Solo",
    context: "Graph Hacks, WeMakeDevs × FalkorDB",
    stack: ["Python", "FastAPI", "FalkorDB", "Cypher", "MCP", "React", "WebSockets"],
    why: [
      "Most agent-memory layers model what one agent knows. Living Town models how knowledge travels between agents, and shows it as a town of ten NPCs that gossip.",
      "Steal the blacksmith's hammer and only the blacksmith sees it. Over the next simulated hours the story spreads from person to person, losing confidence each time it's retold, until a guard who saw nothing confronts you. Ask him \"How do you know?\" and he answers with the exact chain of people it came through.",
    ],
    approach: [
      "Each agent's memory is a subgraph in FalkorDB: what they saw (episodic), what they believe and who told them (semantic, with provenance), and what they know how to do (procedural). Telling someone a story adds a TOLD edge. The listener's confidence is the speaker's confidence × their trust in the speaker × 0.9, and below 0.3 the story is doubted rather than believed.",
      "\"How do you know?\" is a variable-length path query back to the eyewitness, and the path is the explanation. No path means no answer, rather than a guess.",
      "Agents coordinate through a shared task board in the graph, with atomic claims and handoffs. 19 memory tools are exposed over MCP, each backed by hand-written, parameterised Cypher, so the model picks tools and arguments but never writes queries. Every read and graph algorithm goes through GRAPH.RO_QUERY.",
    ],
    decision: {
      title: "A graph per tenant, and agents that race",
      body: [
        "Isolation between players is structural, not a WHERE clause. Each player gets their own graph, town:{player_id}, on one FalkorDB instance. A crime in one world can't leak into another, and deleting a stale world is a single GRAPH.DELETE.",
        "Inside a world, all ten agents run each phase of a tick concurrently with asyncio.gather, against one graph. Competing claims on a task are settled by the database, not by app-side locks. A tick is 23–42 queries in about six sequential round trips, roughly 160 ms against FalkorDB Cloud. A built-in stress test runs 40 agents in 4 isolated worlds at about 450 writes/s on the free tier.",
      ],
    },
    architecture: [
      { step: "Tick", detail: "The FastAPI engine advances a world. All ten agents move at once, by schedule or by task." },
      { step: "Gossip", detail: "Each agent concurrently passes on its most salient belief along KNOWS edges, writing TOLD and BELIEVES." },
      { step: "Coordinate", detail: "Agents post, claim, work and hand off tasks. Races on claims are settled in the graph." },
      { step: "Ask", detail: "Dialogue goes through a fixed tool catalogue (Claude tool use, or rule-based) and resolves names via full-text index first." },
      { step: "Explain", detail: "Answers return the provenance path, and the UI draws it across the map over WebSocket." },
    ],
    learned: [
      "Saying \"I don't know\" is a feature. A path query that comes back empty is more trustworthy than a model that always answers.",
      "Running graph algorithms (PageRank, betweenness, label propagation) inside the database, on live memory, beats exporting the data to analyse it.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/thedevkansal/living-town" },
      { label: "Live demo", href: "https://living-town.onrender.com" },
      { label: "Demo video", href: "https://drive.google.com/drive/folders/1ML5B1YFaR68oqpZUXvne8zxoehw8B_qR" },
    ],
    shot: {
      src: "/projects/living-town/provenance.png",
      alt: "Living Town: the provenance thread from the theft through two townsfolk to the captain, drawn across the map beside his memory graph",
      width: 1920,
      height: 1080,
    },
    gallery: [
      {
        src: "/projects/living-town/confront.png",
        alt: "Living Town at dawn on day two: the captain, who never saw the theft, confronts the player while the town talk log shows how the story travelled",
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    slug: "baaki",
    title: "Baaki",
    problem:
      "Bill splitting that works offline with no account, and settles debts over UPI in one tap. Every feature is free.",
    year: "2026",
    role: "Solo",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Drizzle", "Supabase Auth", "Upstash Redis", "fast-check"],
    why: [
      "Splitwise caps daily bills and charges for features groups rely on. Baaki is a free alternative built for India first: debts settle over UPI with the payee, amount and note already filled in.",
    ],
    approach: [
      "Groups live in the browser, with no sign-up. Sharing a group mirrors it to Postgres so others can join by link, and optional Google sign-in brings your groups back on a new device.",
      "Money is never a float. Amounts are bigint minor units, splits use largest-remainder allocation with a rotating tiebreak, and a deferred Postgres trigger rejects any bill whose payers and shares don't balance at commit.",
      "The server decides who is asking: every action that touches a shared group checks the caller's seat first. UPI IDs are encrypted at rest with AES-256-GCM, so a tampered value fails to decrypt instead of becoming a different, valid-looking ID. Settling is two-sided, because a UPI link can't report back that money moved, so the payee confirms.",
    ],
    decision: {
      title: "Local-first, with an outbox",
      body: [
        "Making the browser the primary copy means the app works offline and without an account, but syncing has to be careful. Every write commits to localStorage first, then appends an event to an outbox that drains to the server in order. A failed request stays queued, and an answered one (yes or no) is dropped.",
        "Pulls replace the local copy, so a pull first drains the outbox, then throws its answer away if anything is still queued or a write happened while it was in flight. A slow pull can never overwrite an edit you just made.",
      ],
    },
    architecture: [
      { step: "Write", detail: "A screen calls a store mutation, which commits to localStorage synchronously." },
      { step: "Queue", detail: "For a shared group, an event is appended to the outbox and the drain wakes." },
      { step: "Push", detail: "Server actions check the caller's seat, validate with zod, and write through Drizzle." },
      { step: "Commit", detail: "A deferred trigger rejects unbalanced bills. UPI IDs are encrypted before storage." },
      { step: "Pull", detail: "Every 20 seconds while visible. Discarded if local writes raced it." },
    ],
    learned: [
      "Property tests find money bugs that example tests don't: fast-check generates the awkward splits for you.",
      "Running real server actions against PGlite in tests, with only \"who is asking\" mocked, made the permission layer something I could actually trust.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/thedevkansal/baaki" },
      { label: "Live", href: "https://baaki.live" },
    ],
    shot: {
      src: "/projects/baaki/landing.png",
      alt: "Baaki landing page",
      width: 2560,
      height: 1600,
    },
    gallery: [
      { src: "/projects/baaki/group.png", alt: "A Baaki group: what you owe, and who to settle with", width: 780, height: 1688 },
      { src: "/projects/baaki/why.png", alt: "Why this payment: the debts a simplified payment replaced", width: 780, height: 1688 },
    ],
  },
  {
    slug: "ripple",
    title: "Ripple",
    problem:
      "Open and click tracking for Gmail outreach that doesn't count Gmail's own image proxy as a read.",
    year: "2026",
    role: "Solo",
    context: "Built for E-Summit speaker and sponsor outreach",
    stack: ["TypeScript", "Next.js", "Prisma", "Neon Postgres", "Gmail API", "Chrome extension", "MCP", "Bun"],
    why: [
      "Cold outreach from Gmail is a black box: you send, then wait. For E-Summit's speaker and sponsor outreach, the team needed to know who opened, how often, and who clicked, so follow-ups went to the right people.",
    ],
    approach: [
      "Each recipient gets their own tracking pixel and link tokens. Campaigns import contacts from CSV, merge fields into a template, and send from your own Gmail account with a per-account daily limit. A Chrome extension tracks mail sent from Gmail's own compose window and shows read ticks in the Sent folder.",
      "On top of that: open and click rates, an hour × weekday heatmap, follow-up lists, a shared replies inbox for teams, and an MCP connector that reads campaigns and creates drafts but never sends.",
    ],
    decision: {
      title: "Withholding the pixel from Gmail's proxy",
      body: [
        "Gmail fetches images through its own proxy, often right at delivery, and then caches what it got. Counted naively, that's a fake open, and worse, the cached pixel means the real open never reaches the server.",
        "Ripple classifies each fetch. When it's Gmail's proxy prefetching, the server returns a 503 with no-store headers instead of the GIF. Gmail has nothing to cache, so it comes back when the person actually opens the email. Apple Mail's privacy prefetches are flagged rather than counted, and views within 30 seconds of the sender's own view are filtered out as self-opens.",
      ],
    },
    architecture: [
      { step: "Send", detail: "From a campaign via the Gmail API, or from Gmail compose through the extension. HTML gets a pixel and tracked links." },
      { step: "Fetch", detail: "The pixel route classifies the request: client, proxy, prefetch, self-view." },
      { step: "Respond", detail: "Withhold (503, no-store) for Gmail proxy prefetches; otherwise return the GIF." },
      { step: "Record", detail: "The open is saved after the response, using Next's after(), so tracking never slows the image." },
      { step: "Act", detail: "Dashboards, heatmaps and follow-up lists. Replies are pulled from Gmail into a shared inbox." },
    ],
    learned: [
      "Being honest about limits is part of the product. \"Unopened\" doesn't mean \"unread\" when Outlook blocks images, and the UI says so.",
      "Restricted Gmail scopes need Google's security assessment before a public launch, so the app stays in testing mode for now.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/thedevkansal/ripple" },
      { label: "Live", href: "https://ripplemail.vercel.app" },
    ],
    shot: {
      src: "/projects/ripple/landing.png",
      alt: "Ripple landing page: a live feed of opens and clicks around a sent email",
      width: 2880,
      height: 1800,
    },
    gallery: [
      {
        src: "/projects/ripple/timeline.png",
        alt: "Ripple recipient timeline: opens, clicks and the time between them for one contact",
        width: 2880,
        height: 990,
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectIndex(slug: string) {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}
