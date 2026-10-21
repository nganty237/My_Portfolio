import aboutPhoto from '../assets/nganty.jpeg'

export const name = 'Gabriel Nganty'

export const eyebrow = 'HELLO THERE \u{1F44B}'

export const headline = [
  { text: "I'm " },
  { text: 'Gabriel', accent: true },
  { text: ', a fifth-year Software Engineering student and aspiring software developer.' },
]

export const subtitle = 'Based at ENSPD Douala, I create modern web applications and thoughtful digital experiences.'

export const about = {
  eyebrow: 'ABOUT ME',
  title: ['Aspiring software engineer', 'building reliable applications.'],
  introTitle: "Hello, I'm Gabriel.",
  image: aboutPhoto,
  imageAlt: 'Portrait of Gabriel Nganty',
}

export const bio = [
  'I am in my fifth year of Software Engineering at the National Advanced School of Engineering of Douala (ENSPD), Cameroon.',
  'My studies focus on software design and development. I am particularly interested in web applications, user experience, and data management.',
  'I work with TypeScript, JavaScript, React, Angular, Node.js, Express.js, Figma, MySQL, and PostgreSQL. I enjoy designing and developing reliable, useful applications.',
]

export const interests = [
  { icon: 'swimming', title: 'Swimming', description: 'Swimming helps me relax and recharge.' },
  { icon: 'music', title: 'Music', description: 'Music helps me unwind and sets the mood for different moments.' },
  { icon: 'football', title: 'Football', description: 'I enjoy playing football and sharing the game with others.' },
  { icon: 'running', title: 'Marathon', description: 'Marathon training builds discipline, consistency, and perseverance.' },
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
  { key: 'email', icon: 'mail', label: 'EMAIL', value: 'surflinkayos@gmail.com' },
  { key: 'whatsapp', icon: 'whatsapp', label: 'WHATSAPP', value: '+237 696 584 160' },
  { key: 'location', icon: 'map-pin', label: 'LOCATION', value: 'Douala, Cameroon (ENSPD)' },
  { key: 'availability', icon: 'calendar-check', label: 'AVAILABILITY', value: 'Open to internships and collaborations, on-site or remote. I gained my first professional experience during a three-and-a-half-month internship.' },
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
