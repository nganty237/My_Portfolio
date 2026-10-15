// Contenus provisoires : ils pourront être remplacés par les vrais projets.
import campusCartImage from '../assets/CampusCart1.jpg'
import formulooComptaImage from '../assets/FormulooCompta.jpg'
import portfolioImage from '../assets/Portfolio.jpg'
import projectManagerImage from '../assets/ProjectManager.jpg'

export const projects = [
  {
    id: 'campuscart',
    title: 'CampusCart: Campus Services Marketplace',
    category: 'Figma',
    kicker: 'Conceptual project',
    cardDescription: 'Connecting students who offer and need everyday services — printing, tech help, tutoring — in one trusted, campus-only app.',
    description: 'A peer-to-peer marketplace where students post, find and request everyday services on campus — turning idle time and skills into quick, trusted exchanges.',
    tags: ['UI/UX', 'Mobile'],
    role: 'UI/UX Design',
    year: '2026 · Draft',
    type: 'Figma Mockup',
    stack: ['Figma', 'Mobile UI'],
    image: campusCartImage,
    alt: 'CampusCart campus services marketplace home screen mockup',
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/S0E17hfNZxYAsqbafPcT9C/CampusCart?node-id=6-4&t=uGQN3g1Q0VUROkQr-1' }],
    highlights: [{ title: 'Service-first, not product-first', description: 'Every flow is built around requesting and fulfilling a service — not browsing a catalog — so matching is fast and trust (ratings, campus verification) stays central.' }],
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'Figma',
    kicker: 'Portfolio concept',
    description: 'A personal portfolio designed in Figma to present my projects, skills and experience.',
    tags: ['UI/UX', 'Web'],
    role: 'UI/UX Design',
    year: '2026 · Draft',
    type: 'Figma Mockup',
    stack: ['Figma', 'Web UI'],
    image: portfolioImage,
    alt: 'Personal portfolio website design',
    links: [{ label: 'Figma file', href: 'https://www.figma.com/design/kSnyLcFUNKj3Y7bMsnrplI/portfolio?node-id=0-1&t=aXuj0h7c8NdVIWts-1' }],
    highlights: [{ title: 'Clear visual hierarchy', description: 'A simple layout helps visitors find projects, skills and contact details quickly.' }],
  },
  {
    id: 'formuloo-compta',
    title: 'Formuloo Compta',
    category: 'GitHub',
    kicker: 'Accounting Application',
    description: 'A web-based accounting application designed to simplify accounting operations for businesses and accounting firms.',
    tags: ['Angular'],
    role: 'Software development',
    year: '2026 · Active',
    type: 'GitHub project',
    stack: ['Angular'],
    image: formulooComptaImage,
    alt: 'Formuloo Compta accounting application',
    links: [{ label: 'View source', href: 'https://github.com/nganty237/Formuloo_compta' }],
    highlights: [
      { title: 'OHADA chart of accounts', description: 'Manage accounts in the OHADA chart of accounts.' },
      { title: 'Accounting entries', description: 'Record entries and review movements in accounting journals.' },
      { title: 'Invoices and financial data', description: 'Manage invoices and view financial dashboards and statements.' },
    ],
  },
  {
    id: 'project-management-app',
    title: 'Project Management App',
    category: 'GitHub',
    kicker: 'Project Management',
    description: 'A web application for organizing projects, tracking tasks, and managing budgets and expenses.',
    tags: ['React', 'Node.js', 'Express'],
    role: 'Full-stack development',
    year: '2026 · Active',
    type: 'GitHub project',
    stack: ['React', 'Node.js', 'Express'],
    image: projectManagerImage,
    alt: 'Project Management App',
    links: [{ label: 'View source', href: 'https://github.com/nganty237/ProjetManager' }],
    highlights: [
      { title: 'Projects and tasks', description: 'Organize projects, create tasks, and track their progress.' },
      { title: 'Budgets and expenses', description: 'Review allocated budgets and expenses recorded for each project.' },
      { title: 'Users and roles', description: 'Manage users and control access by role.' },
    ],
  },
]

export default projects
