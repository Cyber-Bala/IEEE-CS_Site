// src/components/EventSection.jsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EventCard from "./EventCard"
import EventDetail from "./EventDetail"
import SmokeEffect from "./SmokeEffect"

import imgCTF from "../assets/CTF.png"
import imgUIBlindfold from "../assets/ui_blindfold.png"
import imgProjectExpo from "../assets/project_expo.png"
import imgPowerBI from "../assets/power_bi_workshop.png"
import imgTechAuction from "../assets/tech_auction.png"
import imgTreasureHunt from "../assets/technical_treasurehunt.png"
import imgAppDev from "../assets/app_dev.png"
import imgDevOps from "../assets/dev_ops.png"

const events = [
  {
    number: "I",
    label: "CTF",
    title: "FlagHunt",
    slug: "capture-the-flag",
    image: imgCTF,
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfVfxLJVc-Ia81gW786U3keFK4BudD9xgqg2jGy8L82u_C3vQ/viewform?usp=publish-editor",
    description: "Hack, decode, and conquer — a Jeopardy-style cybersecurity showdown. Dive deep into exploitation, crypto, and forensics to claim the digital throne.",
    detailTitle: "FlagHunt",
    detailDescription: "A high-intensity cybersecurity competition where teams race to solve challenges across Web Exploitation, Cryptography, Digital Forensics, Reverse Engineering, and OSINT. Hosted on a live CTFd platform with a real-time leaderboard, each flag you capture climbs you closer to victory.",
    detailTagline: "\"Can you hack your way to the top?\"",
    details: [
      { label: "Timing", value: "9:00 AM – 4:00 PM" },
      { label: "Duration", value: "7 hours" },
      { label: "Team Size", value: "3–4 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹6,000" },
      { label: "Tools", value: "Laptop" },
    ],
    about: [
      "Solve security challenges across multiple domains — Web Exploitation, Cryptography, Digital Forensics, Reverse Engineering, OSINT, and Misc.",
      "Challenges are scored by difficulty: Easy (100 pts), Medium (200 pts), Hard (400 pts).",
      "Hints are available but deduct 10–25% of the challenge points.",
      "All challenges are hosted on a live CTFd platform with real-time leaderboard tracking.",
    ],
    rules: [
      "Teams must consist of 3–4 members.",
      "All challenge solving must happen during the event window.",
      "No external help, sharing of flags, or collaboration between teams.",
      "Top submissions will be manually verified by organizers.",
      "Leaderboard freezes in the final 30 minutes for suspense.",
      "Each hint used adds a point penalty.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹3,000" },
      { place: "2nd Place", amount: "₹2,000" },
      { place: "3rd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Opening & Setup", time: "9:00 – 9:30 AM", desc: "Rules, platform demo, team login" },
      { phase: "CTF Session 1", time: "9:30 AM – 12:30 PM", desc: "Active challenge solving" },
      { phase: "Lunch Break", time: "12:30 – 1:00 PM", desc: "Leaderboard paused" },
      { phase: "CTF Session 2", time: "1:00 – 3:30 PM", desc: "Resume solving, hints released" },
      { phase: "Final Round", time: "3:30 – 4:00 PM", desc: "Countdown, leaderboard freeze, verification" },
    ],
  },
  {
    number: "II",
    label: "Technical",
    title: "UI Whisper",
    slug: "building-ui-blindfolded",
    image: imgUIBlindfold,
    registrationLink: "https://forms.gle/MRWPmbLiPHK2ToZD8",
    description: "One designs, one codes blind — the ultimate designer-developer communication test. Bridge the gap between vision and code without sight.",
    detailTitle: "UI Whisper",
    detailDescription: "A unique multi-stage challenge that puts designer-developer communication to the test. Teams receive a mystery prompt — the Designer creates a UI in Figma, then verbally guides the Coder to build it without ever seeing the design. Judges compare the original Figma design against the final coded output.",
    detailTagline: "\"Can you build what you can't see?\"",
    details: [
      { label: "Timing", value: "1:00 PM – 4:00 PM" },
      { label: "Duration", value: "3 hours" },
      { label: "Team Size", value: "2 members (Designer + Coder)" },
      { label: "Registration Fee", value: "₹125 (IEEE) / ₹175 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹2,500" },
      { label: "Tools", value: "Figma + VS Code / CodePen" },
    ],
    about: [
      "Teams receive a mystery prompt — it could be an abstract scenario, a product idea, or a theme-based concept.",
      "The Designer interprets the prompt and creates a UI layout in Figma with proper structure, colors, and components.",
      "The Designer then explains the UI verbally to the Coder — no screen sharing or visual aids allowed.",
      "The Coder builds the UI using HTML, CSS (and optionally JS) purely based on verbal instructions.",
      "Judges evaluate by comparing the original Figma design against the final coded output.",
    ],
    rules: [
      "Teams of exactly 2: one Designer and one Coder.",
      "Designer must use Figma for all design work.",
      "Coder must use VS Code or CodePen — HTML & CSS mandatory, JS optional.",
      "No screen sharing, screenshots, or visual aids during the verbal phase.",
      "Both submissions must match the same concept.",
      "Any form of plagiarism leads to disqualification.",
      "Late submissions may incur penalties.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹1,500" },
      { place: "2nd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Opening", time: "1:00 – 1:15 PM", desc: "Welcome, rules explanation, demo" },
      { phase: "Brainstorm", time: "1:15 – 1:30 PM", desc: "Teams decode prompt and finalize idea" },
      { phase: "Design Phase", time: "1:30 – 2:30 PM", desc: "Designer creates UI in Figma" },
      { phase: "Live Build", time: "2:30 – 3:45 PM", desc: "Verbal guidance + Coder implements UI" },
      { phase: "Submission", time: "3:45 – 4:00 PM", desc: "Judging and completion" },
    ],
  },
  {
    number: "III",
    label: "Technical",
    title: "Xhibit",
    slug: "project-expo",
    image: imgProjectExpo,
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSd-D_66mQ5i201Ukb4e6cdMEQLvD5zl83aj6SfmE9_JGYBl-w/viewform?usp=publish-editor",
    description: "Present your innovative projects to expert judges in a live exhibition. Showcase your engineering prowess and turn prototypes into real-world solutions.",
    detailTitle: "Xhibit",
    detailDescription: "A platform to showcase your best technical work — from AI models and IoT prototypes to web apps and social-impact solutions. Set up your project at an exhibition stall, demonstrate it live to a panel of judges, and compete for the top spot based on innovation, complexity, and real-world applicability.",
    detailTagline: "\"Your ideas deserve the spotlight.\"",
    details: [
      { label: "Timing", value: "1:00 PM – 4:00 PM" },
      { label: "Duration", value: "3 hours" },
      { label: "Team Size", value: "2–4 members" },
      { label: "Registration Fee", value: "₹175 (IEEE) / ₹150 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹3,000" },
      { label: "Mode", value: "Offline – Exhibition & Demo" },
    ],
    about: [
      "Teams set up their technical projects at assigned exhibition stalls and present them to judges and attendees.",
      "Projects can span AI/ML, Web & Mobile Apps, IoT, Cybersecurity, Data Science, Software Tools, or Social Impact solutions.",
      "Each team must demonstrate the project's functionality, explain the technical stack, and discuss challenges and future scope.",
      "Judging is based on innovation, technical complexity, practical application, presentation quality, and working demo.",
    ],
    rules: [
      "Teams of 2–4 members allowed.",
      "Projects must be original work by the team.",
      "Working demonstration is strongly encouraged.",
      "Teams must be ready with their setup within the allocated time.",
      "Judges will visit each stall — be prepared to answer questions.",
      "If a demo fails, explanation-based evaluation will be permitted.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹1,500" },
      { place: "2nd Place", amount: "₹1,000" },
      { place: "3rd Place", amount: "₹500" },
    ],
    eventFlow: [
      { phase: "Registration & Setup", time: "1:00 – 1:30 PM", desc: "Team check-in, stall assignment, project setup" },
      { phase: "Demo Round", time: "1:30 – 3:30 PM", desc: "Judges visit each team, live demos conducted" },
      { phase: "Final Evaluation", time: "3:30 – 4:00 PM", desc: "Judges finalize scores and winners" },
    ],
  },
  {
    number: "IV",
    label: "Workshop",
    title: "Data Prism",
    slug: "power-bi-workshop",
    image: imgPowerBI,
    registrationLink: "https://forms.gle/6JTEEHFwAseyNN2z7",
    description: "Transform raw data into stunning interactive dashboards — hands-on with Power BI. Learn the art of data storytelling and business intelligence.",
    detailTitle: "Data Prism",
    detailDescription: "A beginner-friendly, hands-on workshop where you'll learn to import, clean, and transform real-world datasets into professional interactive dashboards using Microsoft Power BI. From bar charts and KPI cards to slicers and themes — walk out with a complete dashboard you built yourself.",
    detailTagline: "\"Turn data into decisions.\"",
    details: [
      { label: "Timing", value: "10:00 AM – 12:00 PM" },
      { label: "Duration", value: "2 hours" },
      { label: "Mode", value: "Hands-on (Laptop + Power BI required)" },
      { label: "Skill Level", value: "Beginner to Intermediate" },
    ],
    about: [
      "Learn the fundamentals of data visualization and business intelligence using Microsoft Power BI.",
      "Work with a real-world dataset (e.g., sales/e-commerce data) provided during the session.",
      "Topics covered: Data import, Power Query for cleaning, creating charts & KPIs, dashboard layout, filters & slicers.",
      "Walk away with a fully interactive dashboard you built during the workshop.",
    ],
    rules: [
      "Participants must bring their own laptops with Power BI Desktop pre-installed.",
      "Dataset will be provided at the start of the session.",
      "Follow the instructor's guidance during hands-on tasks.",
      "No prior Power BI experience is required — beginners welcome.",
    ],
    eventFlow: [
      { phase: "Introduction", time: "10:00 – 10:10 AM", desc: "Overview of Power BI and sample dashboard demo" },
      { phase: "Data Import", time: "10:10 – 10:20 AM", desc: "Import and understand the dataset structure" },
      { phase: "Data Cleaning", time: "10:20 – 10:40 AM", desc: "Power Query, handle missing values, format columns" },
      { phase: "Visualization", time: "10:40 – 11:20 AM", desc: "Create bar charts, line charts, KPI cards" },
      { phase: "Dashboard", time: "11:20 – 11:40 AM", desc: "Arrange visuals, apply themes and formatting" },
      { phase: "Interactivity & Wrap-up", time: "11:40 AM – 12:00 PM", desc: "Add slicers, analyze insights, Q&A" },
    ],
  },
  {
    number: "V",
    label: "Technical",
    title: "Bid & Build",
    slug: "mystery-tech-auction",
    image: imgTechAuction,
    registrationLink: "https://forms.gle/7fHUUoQ4BHJdjTuz5",
    description: "Bid on resources, strategize under budget, and build a working prototype. Experience the high-stakes pressure of an engineering startup auction.",
    detailTitle: "Bid & Build",
    detailDescription: "Step into the shoes of a startup engineer with limited funding. Bid in a live auction to acquire APIs, datasets, UI frameworks, and tools — then use only what you've purchased to build a functional prototype. Strategic resource selection meets rapid development in this one-of-a-kind challenge.",
    detailTagline: "\"Build smart, not big.\"",
    details: [
      { label: "Timing", value: "9:00 AM – 3:00 PM" },
      { label: "Duration", value: "6 hours" },
      { label: "Team Size", value: "2–3 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹6,000" },
      { label: "Tools", value: "Laptop" },
    ],
    about: [
      "Each team receives a fixed virtual budget and must bid in a live auction for technical resources — APIs, datasets, UI frameworks, and templates.",
      "After acquiring resources, teams plan and build a functional prototype whose core functionality depends on what they purchased.",
      "Additional development tools can be used with organizer approval, but the project must revolve around purchased resources.",
      "This simulates real-world startup constraints where engineers must deliver with limited tools and budgets.",
    ],
    rules: [
      "Teams of 2–3 members.",
      "Each team gets a fixed virtual budget — no exceeding it.",
      "Core project functionality must depend on purchased resources.",
      "Other tools require approval from judges or organizing team.",
      "Development must happen during the event — no pre-built projects.",
      "Final submission via GitHub or zip file.",
      "Each team gets max 5 minutes for final presentation.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹3,000" },
      { place: "2nd Place", amount: "₹2,000" },
      { place: "3rd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Introduction", time: "9:00 – 9:15 AM", desc: "Rules, auction process, evaluation criteria" },
      { phase: "Live Auction", time: "9:15 – 10:30 AM", desc: "Item-wise bidding session" },
      { phase: "Planning", time: "10:30 – 11:00 AM", desc: "Teams finalize project idea" },
      { phase: "Development", time: "11:00 AM – 2:15 PM", desc: "Build, integrate, and debug" },
      { phase: "Presentations", time: "2:15 – 3:00 PM", desc: "Demos and final scoring" },
    ],
  },
  {
    number: "VI",
    label: "Technical",
    title: "LogiX",
    slug: "technical-treasure-hunt",
    image: imgTreasureHunt,
    registrationLink: "https://forms.gle/dZaouRRVqjw868bi9",
    description: "Decode technical clues, crack puzzles, and race through stages to win. A high-speed pursuit of knowledge through the landscape of computer science.",
    detailTitle: "LogiX",
    detailDescription: "A multi-stage adventure that blends CS fundamentals with puzzle-solving. Each clue you crack — from code output predictions and cipher-encoded messages to QR codes and binary riddles — reveals the next stage. Work as a team, think fast, and be the first to reach the final challenge.",
    detailTagline: "\"Follow the clues. Claim the treasure.\"",
    details: [
      { label: "Timing", value: "12:00 PM – 3:00 PM" },
      { label: "Duration", value: "3 hours" },
      { label: "Team Size", value: "2–3 members" },
      { label: "Registration Fee", value: "₹250 (IEEE) / ₹300 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹2,500" },
      { label: "Mode", value: "Offline – Hands-on" },
    ],
    about: [
      "Teams start with an initial clue and progress through multiple stages by solving technical puzzles.",
      "Clue formats include: technical riddles, code snippets with hidden outputs, cipher-encoded messages, QR codes, and binary/hex challenges.",
      "Topics span Data Structures, Networking, OS concepts, Programming Logic, and encoding formats.",
      "Each stage is validated by a coordinator before unlocking the next clue.",
    ],
    rules: [
      "Teams of 2–3 members.",
      "Solve each stage to receive the next clue — no skipping.",
      "Hints are available but each hint adds a time penalty.",
      "Points awarded per stage completed; bonus for no-hint solves.",
      "Tiebreaker: fastest overall completion time.",
      "Coordinators at each stage validate answers.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹1,500" },
      { place: "2nd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Briefing", time: "12:00 – 12:15 PM", desc: "Welcome, rules, starting clues" },
      { phase: "Active Hunt", time: "12:15 – 2:30 PM", desc: "Teams progress through technical stages" },
      { phase: "Final Stage", time: "2:30 – 3:00 PM", desc: "Final puzzle and winner confirmation" },
    ],
  },
  {
    number: "VII",
    label: "Technical",
    title: "App-o-calypse",
    slug: "app-development",
    image: imgAppDev,
    registrationLink: "https://docs.google.com/forms/d/19xHsPJZJdFFUSZSvdQybdFxynG7OkYiHnRibJ1DGLEI/viewform",
    description: "Tackle a real-world problem statement and build a working app from scratch. Show your ability to engineer impact through mobile and web tech.",
    detailTitle: "App-o-calypse",
    detailDescription: "You'll receive a real-world problem statement — then ideate, design, develop, and demo a functional web or mobile application within the time limit. Whether it's HTML/CSS, Flutter, or Node.js, show the judges your ability to turn an idea into a working product under pressure.",
    detailTagline: "\"Code it. Ship it. Own it.\"",
    details: [
      { label: "Timing", value: "10:00 AM – 12:00 PM" },
      { label: "Duration", value: "2 hours" },
      { label: "Team Size", value: "2–3 members" },
      { label: "Registration Fee", value: "₹125 (IEEE) / ₹175 (Non-IEEE)" },
      { label: "Prize Pool", value: "₹2,500" },
    ],
    about: [
      "Teams receive a real-world problem statement and must build a functional web or mobile application to solve it.",
      "Allowed technologies: HTML/CSS/JS, Flutter, Android Studio, Python, Node.js.",
      "Each team must submit source code, a short description of the app, and a live or recorded demo.",
      "Pre-built templates are allowed, but core logic must be original.",
    ],
    rules: [
      "Teams of 2–3 members.",
      "All development must happen during the event.",
      "Pre-built templates allowed — but core logic must be original.",
      "Plagiarism will result in immediate disqualification.",
      "Each team must submit: source code, app description, and demo.",
      "Judging criteria: Functionality (30), Innovation (25), UI/UX (20), Tech Implementation (15), Presentation (10).",
    ],
    prizes: [
      { place: "1st Place", amount: "₹1,500" },
      { place: "2nd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Problem Launch", time: "10:00 – 10:10 AM", desc: "Teams receive the problem statement" },
      { phase: "Ideation & Design", time: "10:10 – 10:40 AM", desc: "Brainstorm and design UI" },
      { phase: "Development", time: "10:40 – 11:45 AM", desc: "Build and test the application" },
      { phase: "Submission", time: "11:45 AM – 12:00 PM", desc: "Code submission and final checks" },
    ],
  },
  {
    number: "VIII",
    label: "Workshop",
    title: "Code2Cloud",
    slug: "devops-workshop",
    image: imgDevOps,
    registrationLink: "https://forms.gle/79JXPLYAfu6xYR2L6",
    description: "From code to deployment — get hands-on with Git, CI/CD, and Docker. Master the tools that power modern software delivery and infrastructure.",
    detailTitle: "Code2Cloud",
    detailDescription: "A beginner-friendly, hands-on workshop that walks you through the complete DevOps lifecycle. Learn Git & GitHub, set up CI/CD pipelines with GitHub Actions, get introduced to Docker, and deploy a sample application — all in one session. No prior DevOps experience needed.",
    detailTagline: "\"From Code to Deployment — End-to-End.\"",
    details: [
      { label: "Timing", value: "10:00 AM – 12:00 PM" },
      { label: "Duration", value: "2 hours" },
      { label: "Registration Fee", value: "₹100 (IEEE) / ₹150 (Non-IEEE)" },
      { label: "Mode", value: "Hands-on (Laptop required)" },
      { label: "Certification", value: "Participation Certificate" },
    ],
    about: [
      "Learn the DevOps lifecycle from scratch — version control, CI/CD, containerization, and deployment.",
      "Tools covered: Git & GitHub, Docker (intro/demo), CI/CD with GitHub Actions.",
      "Build and deploy a simple web application (HTML/CSS) end-to-end during the session.",
      "No prior DevOps experience required — step-by-step guidance provided.",
    ],
    rules: [
      "Participants must bring their own laptops.",
      "Git must be pre-installed (setup guide shared before event).",
      "A GitHub account is required.",
      "Follow instructor guidelines during the session.",
      "Actively participate in all hands-on tasks.",
    ],
    prizes: [
      { place: "1st Place", amount: "₹1,500" },
      { place: "2nd Place", amount: "₹1,000" },
    ],
    eventFlow: [
      { phase: "Introduction", time: "10:00 – 10:15 AM", desc: "Welcome, overview of DevOps" },
      { phase: "Git & Fundamentals", time: "10:15 – 10:45 AM", desc: "Concepts and version control" },
      { phase: "Hands-on practice", time: "10:45 – 11:30 AM", desc: "Git & GitHub practice" },
      { phase: "CI/CD & Deployment", time: "11:30 AM – 12:00 PM", desc: "Pipelines and end-to-end deployment" },
    ],
  },
  {
    number: "IX",
    label: "Ceremony",
    title: "Valedictory",
    slug: "valedictory",
    image: imgDevOps, // Using an existing image as a placeholder or it can be generic
    description: "The grand finale of Xypher'26. Celebrating innovation, announcing winners, and bidding farewell until next time.",
    detailTitle: "Valedictory Session",
    detailDescription: "Join us for the closing ceremony where we celebrate the spirit of Xypher'26. We will announce the winners of all competitions, distribute prizes, and hear from our esteemed guests and organizers in this final gathering.",
    detailTagline: "\"Celebrating the future of technology.\"",
    details: [
      { label: "Timing", value: "3:30 PM – 4:30 PM" },
      { label: "Duration", value: "1 hour" },
      { label: "Location", value: "Main Auditorium" },
    ],
    eventFlow: [
      { phase: "Opening", time: "3:30 – 3:45 PM", desc: "Welcome address and highlight reel" },
      { phase: "Awards", time: "3:45 – 4:15 PM", desc: "Winner announcements and prize distribution" },
      { phase: "Closing", time: "4:15 – 4:30 PM", desc: "Vote of thanks and official closing" },
    ],
  },
]

const EventSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center pt-32 pb-24 overflow-hidden isolate">
        {/* Layer 0: Fixed Background Glow - ensures no sharp cutoffs on tall pages */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_10%_8%)_0%,_hsl(45_5%_4%)_80%)] z-0" />

        {/* Layer 10: Section Content */}
        <div className="relative z-20 flex flex-col items-center w-full">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-primary text-xs">◆</span>
              <div className="border border-primary/40 px-6 py-1.5">
                <span className="font-display text-xs tracking-[0.3em] uppercase text-primary/80">
                  Choose Your Path
                </span>
              </div>
              <span className="text-primary text-xs">◆</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
            </div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-foreground text-glow">
              Event Categories
            </h2>
            <p className="font-display text-muted-foreground mt-3 text-lg">
              Click a card to reveal what awaits within
            </p>
          </motion.div>

          {/* Categorized Cards */}
          <div className="w-full">
            {Object.entries(
              events.reduce((acc, event) => {
                if (!acc[event.label]) acc[event.label] = []
                acc[event.label].push(event)
                return acc
              }, {})
            ).map(([category, categoryEvents]) => (
              <div key={category} className="mb-20 last:mb-0">
                <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center gap-4">
                  <span className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-primary/60" />
                  {category}
                  <span className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-primary/60" />
                </h3>
                <div className="flex flex-wrap justify-center gap-10 lg:gap-16 px-4 max-w-[1300px] mx-auto w-full">
                  {categoryEvents.map((e, i) => (
                    <motion.div
                      key={`${e.number}-${i}`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                      <EventCard event={e} onSelect={setSelectedEvent} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default EventSection
