// EventData.js
// Photo images
import event1 from "../assets/events/event1.JPG";
import event2 from "../assets/events/DCP1.JPG";
import event3 from "../assets/events/DCP2.JPG";
import event4 from "../assets/events/DCP3.JPG";
import event5 from "../assets/events/DCP4.JPG";
import event6 from "../assets/events/DCP5.JPG";
import event7 from "../assets/events/DCP6.JPG";
import event8 from "../assets/events/DCP7.JPG";

import promptIq from "../assets/events/prompt-iq.JPG";
import promptIq1 from "../assets/events/PIq1.JPG";
import promptIq2 from "../assets/events/PIq2.JPEG";
import promptIq3 from "../assets/events/PIq3.JPEG";
import promptIq4 from "../assets/events/PIq4.JPEG";
import promptIq5 from "../assets/events/PIq5.JPEG";
import promptIq6 from "../assets/events/PIq6.JPEG";
import promptIq7 from "../assets/events/PIq7.JPEG";

import replica from "../assets/events/replica.JPG";

import alumniLecture from "../assets/events/alumnilecture.JPG";
import alumniLecture2 from "../assets/events/Al2.JPG";
import alumniLecture3 from "../assets/events/Al3.JPG";
import alumniLecture4 from "../assets/events/Al4.JPG";
import alumniLecture5 from "../assets/events/Al5.JPG";
import alumniLecture6 from "../assets/events/Al6.JPG";
import alumniLecture7 from "../assets/events/Al7.JPG";

import streamlit from "../assets/events/streamlit.jpg";
import streamlit1 from "../assets/events/sl1.jpg";
import streamlit2 from "../assets/events/sl2.jpg";
import streamlit3 from "../assets/events/sl3.jpg";
import streamlit4 from "../assets/events/sl4.jpg";
import streamlit5 from "../assets/events/sl5.jpg";
import streamlit6 from "../assets/events/sl6.jpg";
import streamlit7 from "../assets/events/sl7.jpg";

import techtopia from "../assets/events/techtopia.png";
import techtopia1 from "../assets/events/Tech1.jpg";
import techtopia2 from "../assets/events/Tech2.jpg";
import techtopia3 from "../assets/events/Tech3.jpg";
import techtopia4 from "../assets/events/Tech4.jpg";
import techtopia5 from "../assets/events/Tech5.jpg";
import techtopia6 from "../assets/events/Tech6.jpg";

import techATwist from "../assets/events/tech-a-twist.JPG";
import techATwist1 from "../assets/events/Techatwist1.JPG";
import techATwist2 from "../assets/events/Techatwist2.JPG";
import techATwist3 from "../assets/events/Techatwist3.JPG";
import techATwist4 from "../assets/events/Techatwist4.jpg";
import techATwist5 from "../assets/events/Techatwist5.jpg";

import xyntra from "../assets/events/xyntra.JPG";
import xyntra1 from "../assets/events/XYNTRA1.png";
import xyntra2 from "../assets/events/XYNTRA2.png";
import xyntra3 from "../assets/events/XYNTRA3.png";
import xyntra4 from "../assets/events/Xyntra1.JPG";
import xyntra5 from "../assets/events/Xyntra2.JPG";
import xyntra6 from "../assets/events/Xyntra3.JPG";
import xyntra7 from "../assets/events/Xyntra4.JPG";
import xyntra8 from "../assets/events/Xyntra5.JPG";
import xyntra9 from "../assets/events/Xyntra6.JPG";
import xyntra0 from "../assets/events/Xyntra7.JPG";

import iccds from "../assets/events/ICCDS.JPG";
import iccds1 from "../assets/events/ICCDS1.JPG";
import iccds2 from "../assets/events/ICCDS2.JPG";
import iccds3 from "../assets/events/ICCDS3.JPG";
import iccds4 from "../assets/events/ICCDS4.JPG";
import iccds5 from "../assets/events/ICCDS5.JPG";
import iccds6 from "../assets/events/ICCDS6.JPG";
import iccds7 from "../assets/events/ICCDS7.JPG";
import iccds8 from "../assets/events/ICCDS8.JPG";
import iccds9 from "../assets/events/ICCDS9.JPG";
import iccds10 from "../assets/events/ICCDS10.JPG";
import iccds11 from "../assets/events/ICCDS11.JPG";

export const EVENT_PHOTOS = {
  1: [event1, event2, event3, event4, event5, event6, event7, event8],
  2: [promptIq, promptIq1, promptIq2, promptIq3, promptIq4, promptIq5, promptIq6, promptIq7],
  3: [replica],
  4: [alumniLecture, alumniLecture2, alumniLecture3, alumniLecture4, alumniLecture5, alumniLecture6, alumniLecture7],
  5: [streamlit, streamlit1, streamlit2, streamlit3, streamlit4, streamlit5, streamlit6, streamlit7],
  6: [techtopia, techtopia1, techtopia2, techtopia3, techtopia4, techtopia5, techtopia6],
  7: [techATwist, techATwist1, techATwist2, techATwist3, techATwist4, techATwist5],
  8: [xyntra, xyntra1, xyntra2, xyntra3, xyntra4, xyntra5, xyntra6, xyntra7, xyntra8, xyntra9, xyntra0],
  9: [iccds, iccds1, iccds2, iccds3, iccds4, iccds5, iccds6, iccds7, iccds8, iccds9, iccds10, iccds11]
};

export const EVENTS = [
  {
    id: 1,
    title: "DVP Talk: Intelligent Systems",
    category: "talk",
    date: "29th August 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "2nd Floor, Idea Factory (KS01)",
    description:
      "The DVP Lecture on Intelligent Systems and Smart Applications gave 2nd and 3rd year CSE students valuable insights into new technologies.",
    image: event1,
    upcoming: false
  },
  {
    id: 2,
    title: "Prompt IQ Workshop",
    category: "workshop",
    date: "22nd February 2025",
    time: "10:00 AM - 1:00 PM",
    venue: "Idea Factory, 2nd Floor",
    description:
      "The workshop introduced students to crafting effective prompts for AI applications, offering a hands-on session led by an industry expert.",
    image: promptIq,
    upcoming: false
  },
  {
    id: 3,
    title: "Replica Rumble",
    category: "competition",
    date: "3rd September 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "TechLounge Ground Floor",
    description:
      "Replica Rumble challenged students' web development skills while fostering collaboration in this exciting competition.",
    image: replica,
    upcoming: false
  },
  {
    id: 4,
    title: "Alumni Lecture: Secure Web Apps",
    category: "talk",
    date: "3rd September 2024",
    time: "3:00 PM - 5:00 PM",
    venue: "A309",
    description:
      "The Alumni Lecture on Secure Web Apps with Angular gave students valuable insights into secure coding and web security practices.",
    image: alumniLecture,
    upcoming: false
  },
  {
    id: 5,
    title: "Streamlit Workshop",
    category: "workshop",
    date: "1st August 2024",
    time: "10:00 AM - 1:00 PM",
    venue: "A309",
    description:
      "Participants gained practical knowledge in using Streamlit to create intuitive UIs and develop interactive applications.",
    image: streamlit,
    upcoming: false
  },
  {
    id: 6,
    title: "Techtopia 2024",
    category: "competition",
    date: "3rd August 2024",
    time: "9:00 AM - 6:00 PM",
    venue: "IDEA LAB",
    description:
      "Techtopia featured four activities designed to challenge students, foster innovation, and showcase their technical skills.",
    image: techtopia,
    upcoming: false
  },
  {
    id: 7,
    title: "TECH-A-TWIST",
    category: "competition",
    date: "30th July",
    time: "10:00 AM - 4:00 PM",
    venue: "IDEA LAB",
    description:
      "Tech-A-Twist engaged students through technical and non-technical activities, fostering creativity and teamwork.",
    image: techATwist,
    upcoming: false
  },
  {
    id: 8,
    title: "XYNTRA 2025",
    category: "competition",
    date: "April 12, 2025",
    time: "8:00 AM - 6:00 PM (36 Hours)",
    venue: "Indoor Auditorium",
    description:
      "A 36-hour international hackathon bringing together innovators, coders, and creators from around the globe to solve real-world challenges.",
    image: xyntra,
    upcoming: false
  },
  {
    id: 9,
    title: "ICCDS 2025",
    category: "competition",
    date: "Jun 5, 2024",
    time: "10:00 AM - 4:00 PM",
    venue: "MAIN BLOCK",
    description:
      "A premier academic and research event that brings together researchers, industry experts, and students from across the globe.",
    image: iccds,
    upcoming: false
  }
];

export const FILTERS = [
  { key: "all", label: "All Events" },
  { key: "workshop", label: "Workshops" },
  { key: "talk", label: "Talks" },
  { key: "competition", label: "Competitions" }
];
