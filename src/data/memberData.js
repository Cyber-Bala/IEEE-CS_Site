// Structured Team & Domain Data for Member Reveal System
// Only name and roll number — no photos needed

export const DOMAINS = [
  {
    id: 'EVENT',
    name: 'EVENT',
    icon: 'fas fa-calendar-alt',
    desc: 'Orchestrating flagship technical hackathons, workshops, and international symposiums.'
  },
  {
    id: 'APP',
    name: 'APP',
    icon: 'fas fa-mobile-alt',
    desc: 'Building modern, high-performance mobile applications across Android and iOS.'
  },
  {
    id: 'R&D',
    name: 'R&D',
    icon: 'fas fa-microchip',
    desc: 'Researching emerging hardware, IoT architecture, and experimental software systems.'
  },
  {
    id: 'ML',
    name: 'ML',
    icon: 'fas fa-brain',
    desc: 'Engineering intelligent machine learning models, neural networks, and AI algorithms.'
  },
  {
    id: 'WEB',
    name: 'WEB',
    icon: 'fas fa-code',
    desc: 'Architecting scalable, responsive web apps and digital platforms for IEEE CS.'
  },
  {
    id: 'MEDIA',
    name: 'MEDIA',
    icon: 'fas fa-video',
    desc: 'Capturing, editing, and producing high-production video reels and photo archives.'
  },
  {
    id: 'PR',
    name: 'PR',
    icon: 'fas fa-bullhorn',
    desc: 'Driving strategic outreach, corporate sponsorships, and external relations.'
  },
  {
    id: 'DESIGN',
    name: 'DESIGN',
    icon: 'fas fa-palette',
    desc: 'Crafting futuristic UI/UX interfaces, event branding, and visual design assets.'
  },
  {
    id: 'CONTENT',
    name: 'CONTENT',
    icon: 'fas fa-pen-nib',
    desc: 'Curating tech blogs, documentation, social copy, and official publications.'
  }
];

export const DOMAIN_MEMBERS = {
  EVENT: [
    { name: 'Shruthibala B', rollNo: '250701706', dept: 'Computer Science & Engineering' },
    { name: 'Shriya M', rollNo: '251901160', dept: 'Computer Science & Engineering (Cyber Security)' },
    { name: 'U Shakti Narayan', rollNo: '250701685', dept: 'Computer Science & Engineering' },
    { name: 'Bala Aditya Dhinakaran', rollNo: '251801037', dept: 'Artificial Intelligence & Data Science' },
    { name: 'Varshita G', rollNo: '251201113', dept: 'Mechatronics Engineering' },
    { name: 'Aarjun G', rollNo: '241901001', dept: 'Computer Science & Engineering (Cyber Security)' },
    { name: 'Harine S', rollNo: '250701219', dept: 'Computer Science & Engineering' },
    { name: 'Chandana Shri S', rollNo: '240701085', dept: 'Computer Science & Engineering' },
    { name: 'Harsshini P', rollNo: '250701235', dept: 'Computer Science & Engineering' },
    { name: 'Sajith Ahamed M', rollNo: '251801282', dept: 'Artificial Intelligence & Data Science' }
  ],
  APP: [
    { name: 'Sachin G', rollNo: '251407095', dept: 'Computer Science & Business Systems' },
    { name: 'Vandhana M', rollNo: '250701804', dept: 'Computer Science & Engineering' },
    { name: 'Vishal S', rollNo: '240701600', dept: 'Computer Science & Engineering' }
  ],
  'R&D': [
    { name: 'Reshma S', rollNo: '240701426', dept: 'Computer Science & Engineering' },
    { name: 'Ashvinth B', rollNo: '250801045', dept: 'Electronics & Communication Engineering' },
    { name: 'Rohit Sriram', rollNo: '251501190', dept: 'Artificial Intelligence & Machine Learning' },
    { name: 'Mathavan N', rollNo: '250701417', dept: 'Computer Science & Engineering' },
    { name: 'Kaviya B', rollNo: '250801218', dept: 'Electronics & Communication Engineering' },
    { name: 'Sarabbesh HS', rollNo: '251101101', dept: 'Mechanical Engineering' }
  ],
  ML: [
    { name: 'Kanishkar', rollNo: '251001102', dept: 'Information Technology' },
    { name: 'Rakshitha P', rollNo: '250701580', dept: 'Computer Science & Engineering' },
    { name: 'Madhu Karthikeyan', rollNo: '251301030', dept: 'Food Technology' }
  ],
  WEB: [
    { name: 'Shanjai Raj S', rollNo: '251001245', dept: 'Information Technology' },
    { name: 'Karthavya S', rollNo: '240701229', dept: 'Computer Science & Engineering' },
    { name: 'Mohanaakrishnan G', rollNo: '251901107', dept: 'Computer Science & Engineering (Cyber Security)' },
    { name: 'Guru Eswar E', rollNo: '250701209', dept: 'Computer Science & Engineering' },
    { name: 'Aravind Rajesh', rollNo: '250701901', dept: 'Computer Science & Engineering' }
  ],
  MEDIA: [
    { name: 'Rakesh R', rollNo: '240701417', dept: 'Computer Science & Engineering', isLead: true, role: 'Team Lead' },
    { name: 'Praneet S', rollNo: '251501166', dept: 'Artificial Intelligence & Machine Learning' },
    { name: 'S. Arun Kumar', rollNo: '240801031', dept: 'Electronics & Communication Engineering' },
    { name: 'Rilvaan Ahmed H', rollNo: '250401124', dept: 'Biotechnology' },
    { name: 'Umarkamil', rollNo: '250701800', dept: 'Computer Science & Engineering' },
    { name: 'Srithar', rollNo: '250701743', dept: 'Computer Science & Engineering' },
    { name: 'Shyam R', rollNo: '251501214', dept: 'Artificial Intelligence & Machine Learning' }
  ],
  PR: [
    { name: 'Haswaanth Krishna Anand', rollNo: '241101039', dept: 'Mechanical Engineering' },
    { name: 'Saiprasanth V', rollNo: '240701457', dept: 'Computer Science & Engineering' },
    { name: 'Abhishek', rollNo: '250701011', dept: 'Computer Science & Engineering' },
    { name: 'Rithanya Selvakumar', rollNo: '250701597', dept: 'Computer Science & Engineering' },
    { name: 'Akhilesh Anandh', rollNo: '250701037', dept: 'Computer Science & Engineering' },
    { name: 'R Yuvadharshini', rollNo: '250701868', dept: 'Computer Science & Engineering' }
  ],
  DESIGN: [
    { name: 'Pooja Sree P', rollNo: '240801241', dept: 'Electronics & Communication Engineering', isLead: true, role: 'Team Lead' },
    { name: 'Vinay G', rollNo: '250701835', dept: 'Computer Science & Engineering' },
    { name: 'S.S. Jyotssna Sri', rollNo: '250701303', dept: 'Computer Science & Engineering' },
    { name: 'Hari Vignesh L', rollNo: '251801083', dept: 'Artificial Intelligence & Data Science' },
    { name: 'Mukil Arasi U', rollNo: '250701457', dept: 'Computer Science & Engineering' },
    { name: 'Shreeyhas A', rollNo: '250401151', dept: 'Biotechnology' }
  ],
  CONTENT: [
    { name: 'Pranav Tanaikavelan', rollNo: '241901079', dept: 'Computer Science & Engineering (Cyber Security)', isLead: true, role: 'Team Lead' },
    { name: 'Kowsika Devi S', rollNo: '251001126', dept: 'Information Technology' },
    { name: 'Shenbaga Balasarathy R', rollNo: '250801434', dept: 'Electronics & Communication Engineering' },
    { name: 'M Visakai', rollNo: '250701838', dept: 'Computer Science & Engineering' }
  ]
};
