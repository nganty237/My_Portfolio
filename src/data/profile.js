import aboutPhoto from '../assets/nganty.jpeg'

export const name = 'Gabriel Nganty'

export const eyebrow = 'HELLO THERE \u{1F44B}'

export const headline = [
  { text: "I'm " },
  { text: 'Gabriel', accent: true },
  { text: ', a fifth-year Software Engineering student and aspiring software developer.' },
]

export const subtitle = 'Based at ENSPD Douala, I aspire to craft modern web applications and thoughtful digital experiences.'

export const about = {
  eyebrow: 'ABOUT ME',
  title: ['Aspiring DevOps engineer', 'building reliable applications.'],
  introTitle: "Hello, I'm Gabriel.",
  image: aboutPhoto,
  imageAlt: 'Portrait of Gabriel Nganty',
}

export const bio = [
  'I am in my fifth year of Software Engineering at the National Advanced School of Engineering of Douala (ENSPD), Cameroon.',
  'My studies focus on software design and development. I am particularly interested in web applications, user experience, and data management.',
  'I work with TypeScript, JavaScript, React, Angular, Node.js, Express.js, Figma, MySQL, and PostgreSQL. I aspire to become a DevOps engineer because I enjoy automating repetitive tasks and want to help teams deploy reliable applications faster.',
]

export const interests = [
  { icon: 'swimming', title: 'Swimming', description: 'Swimming helps me relax and recharge.' },
  { icon: 'running', title: 'Running', description: 'I enjoy running to stay active and clear my mind.' },
  { icon: 'music', title: 'Music', description: 'I often listen to music while I work; it helps me focus and stay motivated.' },
  { icon: 'football', title: 'Football', description: 'I enjoy playing football in my free time.' },
]

export const cvUrl = '/CV_NGANTY_BIKELE.pdf'

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
  { label: 'AVAILABILITY', value: 'Open to internship opportunities and collaborations' },
]

export default {
  name,
  eyebrow,
  headline,
  subtitle,
  about,
  bio,
  interests,
  cvUrl,
  socials,
  nav,
  contactInfo,
}
