/* data.js — All portfolio content from resume */

export const personal = {
  name: 'Aditya Pawar',
  title: 'Full-Stack Developer',
  location: 'Bhopal, India',
  email: 'adityapawar0703@gmail.com',
  phone: '+91 62663 92403',
  github: 'https://github.com/adityapawar0703',
  linkedin: 'https://in.linkedin.com/in/aditya-pawar-b654b629a',
  leetcode: 'https://leetcode.com/u/Adityapawar0703/',
  youtube: 'https://www.youtube.com/@Coding-Essentials',
  about: `Full-Stack Developer with strong foundations in Data Structures, Algorithms, and scalable web application development. Skilled in Java, JavaScript, Node.js, Express.js, and MongoDB — with hands-on experience deploying production-grade applications on Azure and MongoDB Atlas. I love building systems that solve real problems at scale.`,
  tagline: 'Building scalable full-stack solutions that matter.',
}

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Lakshmi Narain College of Technology & Science',
    location: 'Bhopal',
    period: '2022 – June 2026',
    cgpa: '8.09',
    current: true,
  },
  {
    degree: '12th Grade (CBSE)',
    institution: 'Jawaharlal Nehru School',
    location: 'Bhopal',
    period: '2022',
    cgpa: '81.4%',
    current: false,
  },
  {
    degree: '10th Grade (CBSE)',
    institution: 'Jawaharlal Nehru School',
    location: 'Bhopal',
    period: '2020',
    cgpa: '84.2%',
    current: false,
  },
]

// Semester-wise SGPA data
export const sgpaData = [
  { sem: '1st', sgpa: 7.67 },
  { sem: '2nd', sgpa: 7.38 },
  { sem: '3rd', sgpa: 7.21 },
  { sem: '4th', sgpa: 8.08 },
  { sem: '5th', sgpa: 8.67 },
  { sem: '6th', sgpa: 8.33 },
  { sem: '7th', sgpa: 9.17 },
]

// Cumulative CGPA (calculated progressively)
export const cgpaData = [
  { sem: '1st', cgpa: 7.67 },
  { sem: '2nd', cgpa: 7.53 },
  { sem: '3rd', cgpa: 7.41 },
  { sem: '4th', cgpa: 7.59 },
  { sem: '5th', cgpa: 7.82 },
  { sem: '6th', cgpa: 7.91 },
  { sem: '7th', cgpa: 8.09 },
  // { sem: '8th', cgpa: 8.09 },
]

export const projects = [
  {
    id: 1,
    title: 'RGPV Essentials',
    subtitle: 'Full-Stack Academic Platform',
    description: 'Production-grade academic platform for 1000+ users — offering notes, PYQs, job/hackathon updates, hostel/mess listings, and a student marketplace. Led a 3-member team.',
    highlights: [
      'JWT Auth + Google OAuth with RESTful APIs',
      'Redis caching — 30% less DB strain, 25% faster APIs',
      'Deployed on Azure App Service (B1) + MongoDB Atlas',
    ],
    tech: ['Node.js', 'MongoDB', 'Redis', 'JWT', 'Azure', 'Express.js'],
    live: 'https://rgpvessentials.me/',
    github: 'https://github.com/adityapawar',
    users: '1000+',
    color: '#e85d26',
  },
  {
    id: 2,
    title: 'ChatConnect',
    subtitle: 'Anonymous Real-Time Video & Text Chat',
    description: 'Real-time anonymous one-on-one video and text chat platform. Integrated Gemini API for multilingual translation and an AI fallback chatbot for when no peer is available.',
    highlights: [
      'WebRTC peer-to-peer video streaming',
      'Gemini API for multilingual text translation',
      'AI fallback chatbot for 24/7 availability',
    ],
    tech: ['Node.js', 'Socket.IO', 'WebRTC', 'Gemini API'],
    live: 'https://chatconnet.onrender.com/',
    github: 'https://github.com/adityapawar',
    users: null,
    color: '#2563eb',
  },
]

export const skills = [
  // Languages
  { name: 'JavaScript', category: 'Language', icon: 'JS' },
  { name: 'Java', category: 'Language', icon: 'Jv' },
  { name: 'HTML5', category: 'Language', icon: 'HT' },
  { name: 'CSS3', category: 'Language', icon: 'CS' },
  // Backend
  { name: 'Node.js', category: 'Backend', icon: 'No' },
  { name: 'Express.js', category: 'Backend', icon: 'Ex' },
  { name: 'REST APIs', category: 'Backend', icon: 'API' },
  { name: 'JWT Auth', category: 'Backend', icon: 'JWT' },
  { name: 'Socket.IO', category: 'Backend', icon: 'So' },
  { name: 'WebRTC', category: 'Backend', icon: 'WR' },
  // Database
  { name: 'MongoDB', category: 'Database', icon: 'Mg' },
  { name: 'Redis', category: 'Database', icon: 'Rd' },
  { name: 'SQL', category: 'Database', icon: 'SQ' },
  // Frontend
  { name: 'React', category: 'Frontend', icon: 'Re' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'Tw' },
  // Cloud
  { name: 'Azure', category: 'Cloud', icon: 'Az' },
  { name: 'MongoDB Atlas', category: 'Cloud', icon: 'MA' },
  { name: 'Digital Ocean', category: 'Cloud', icon: 'DO' },
  // Tools
  { name: 'GitHub', category: 'Tools', icon: 'Gh' },
  { name: 'DSA', category: 'Tools', icon: 'DS' },
]

export const categoryColors = {
  Language: { bg: 'rgba(232,93,38,0.12)', border: 'rgba(232,93,38,0.35)', glow: '#e85d26' },
  Backend:  { bg: 'rgba(37,99,235,0.12)',  border: 'rgba(37,99,235,0.35)',  glow: '#2563eb' },
  Database: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', glow: '#10b981' },
  Frontend: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', glow: '#8b5cf6' },
  Cloud:    { bg: 'rgba(6,182,212,0.12)',   border: 'rgba(6,182,212,0.35)',  glow: '#06b6d4' },
  Tools:    { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)', glow: '#f59e0b' },
}

export const showcase = [
  {
    id: 'leetcode',
    label: 'LeetCode',
    icon: '⚡',
    description: '600+ problems solved',
    url: 'https://leetcode.com/u/Adityapawar0703/',
    image: '/images/leetcode.png',
    color: '#FFA116',
    iframe: false, 
  },
   {
    id: 'HackerRank',
    label: 'HackerRank',
    icon: '⚡',
    description: 'Software Engineer Intern Certified',
    url: 'https://www.hackerrank.com/certificates/c6abda75c255',
    image: '/images/intern.png',
    color: '#FFA116',
    iframe: false, 
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: '🐙',
    description: 'My projects and coding activity',
    url: 'https://github.com/adityapawar0703',
    image: '/images/github.png',
    color: '#6e5494',
    iframe: false,
  },
  {
    id: 'rgpv',
    label: 'RGPV Essentials',
    icon: '🚀',
    description: 'Live project — 1000+ users',
    url: 'https://rgpvessentials.me/',
    image: '/images/rgpv.png',
    color: '#e85d26',
    iframe: false,
  },
  {
    id: 'chatconnect',
    label: 'ChatConnect',
    icon: '💬',
    description: 'Live project — Real-time chat',
    url: 'https://chatconnet.onrender.com/',
    image: '/images/chatconnect.png',
    color: '#2563eb',
    iframe: true,
  },
    {
    id: 'naturals-Icecream',
    label: 'Naturals Icecream',
    icon: '🍦',
    description: 'Live project — Online ice cream',
    url: 'https://naturals-alpha.vercel.app/',
    image: '/images/naturals.png',
    color: '#2563eb',
    iframe: false,
  },
]
