import profile from '../data/profile.js'
import projects from '../data/projects.js'
import principles from '../data/principles.js'
import toolkit from '../data/toolkit.js'
import { getLocale, getMessages } from './index.js'

export function getLocalizedProfile() {
  const locale = getLocale()
  const messages = getMessages()
  const about = {
    ...profile.about,
    eyebrow: messages.aboutEyebrow,
    title: messages.aboutHeading,
    introTitle: messages.aboutIntro,
    imageAlt: messages.pageAboutImageAlt,
  }
  return {
    ...profile,
    cvUrl: locale === 'fr' ? '/CV_NGANTY_BIKELE_FR.pdf' : '/CV_NGANTY_BIKELE_EN.pdf',
    cvFilename: locale === 'fr' ? 'CV_NGANTY_BIKELE_FR.pdf' : 'CV_NGANTY_BIKELE_EN.pdf',
    eyebrow: messages.homeEyebrow,
    headline: messages.homeHeadline.map((text, index) => ({ text, ...(index === 1 ? { accent: true } : {}) })),
    subtitle: messages.homeSubtitle,
    about,
    bio: messages.aboutBio,
    contactInfo: profile.contactInfo.map((item, index) => ({ ...item, key: ['email', 'location', 'availability'][index], label: messages.contactLabels[index], value: messages.contactValues[index] })),
  }
}

export function getLocalizedProjects() {
  const messages = getMessages()
  return projects.map((project) => ({
    ...project,
    ...messages.projectContent[project.id],
    links: project.links.map((link, index) => ({ ...link, label: messages.projectLinkLabels[project.id][index] })),
  }))
}

export function getLocalizedPrinciples() {
  return principles.map((item, index) => ({ ...item, title: getMessages().principles[index][0], description: getMessages().principles[index][1] }))
}

export function getLocalizedToolkit() {
  return toolkit.map((item, index) => ({ ...item, group: getMessages().toolkitGroups[index] }))
}
