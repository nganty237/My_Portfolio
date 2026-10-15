import aboutPhoto from '../assets/nganty.jpeg'

export const name = 'Gabriel Nganty'

export const eyebrow = "HELLO, I'M GABRIEL NGANTY"

export const headline = [
  { text: "I'm " },
  { text: 'Gabriel', accent: true },
  { text: ', a software engineer building reliable backends and clean digital products.' },
]

export const subtitle = 'Master 2 Software Engineering @ ENSPD Douala · Full-stack Developer (React, TypeScript, Angular, Node.js)'

export const about = {
  eyebrow: 'A LITTLE ABOUT ME',
  title: ['Building reliable backends', 'and clean digital products.'],
  introTitle: "Hi, I'm Gabriel.",
  image: aboutPhoto,
  imageAlt: 'Portrait de Gabriel Nganty',
}

export const bio = [
  "I'm a software developer based in Douala, Cameroon, passionate about building useful digital products and turning ideas into reliable software solutions.",
  'My main focus is full-stack JavaScript development, with a strong interest in backend engineering, API design, database architecture, and creating clean, intuitive user experiences.',
  "I enjoy understanding how things work behind the scenes, solving technical problems, and writing code that is simple, maintainable, and scalable. For me, good software is not just about making things work — it's about building solutions that solve real problems and make people's lives easier.",
  "I'm constantly learning, experimenting with new technologies, and improving my skills through hands-on projects. My goal is to become a well-rounded software engineer who can take an idea from concept to deployment.",
  "I'm always open to meaningful collaborations, challenging projects, and opportunities to grow with people who share the same passion for technology and innovation.",
]

export const cvUrl = '/cv.pdf'

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anicet-nganty-bikele', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://web.facebook.com/gabriel.nganty.2025?locale=fr_FR', icon: 'facebook' },
  { label: 'GitHub', href: 'https://github.com/nganty237', icon: 'github' },
]

export const nav = [
  { label: 'Home', href: '/index.html' },
  { label: 'About', href: '/about.html' },
  { label: 'Projects', href: '/projects.html' },
  { label: 'Contact', href: '/contact.html' },
]

export const contactInfo = [
  { label: 'EMAIL', value: 'surflinkayos@gmail.com' },
  { label: 'LOCATION', value: 'Douala, Cameroon (ENSPD)' },
  { label: 'AVAILABILITY', value: 'Open to internships & freelance' },
]

export default {
  name,
  eyebrow,
  headline,
  subtitle,
  about,
  bio,
  cvUrl,
  socials,
  nav,
  contactInfo,
}
