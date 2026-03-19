/**
 * ============================================================
 *  PORTFOLIO CONTENT
 *  Edit this file to update all text/data on the site.
 * ============================================================
 */

import { FaNodeJs } from 'react-icons/fa'
import {
  SiJavascript,
  SiTypescript,
  SiAdonisjs,
  SiPostgresql,
  SiMqtt,
  SiDocker,
  SiGit,
} from 'react-icons/si'
import { ImDatabase } from 'react-icons/im'
import { FcElectricity } from 'react-icons/fc'
import { IconType } from 'react-icons'

// ─── Site ────────────────────────────────────────────────────
export const site = {
  name: 'Sigit Nurmajid',
  title: 'Sigit Nurmajid — Backend Engineer & IoT Specialist',
  description:
    'Backend engineer specializing in IoT telemetry systems, real-time data pipelines, and scalable APIs.',
  email: 'sigitnurmajid32@gmail.com',
}

// ─── Nav ─────────────────────────────────────────────────────
export const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Teams',      href: '#teams' },
  { label: 'Contact',    href: '#contact' },
]

// ─── Hero ─────────────────────────────────────────────────────
export const hero = {
  label: 'Backend Engineer — IoT & Telemetry Systems',
  firstName: 'Sigit',
  lastName: 'Nurmajid',
  subtitle:
    'I build backend systems and IoT telemetry pipelines that turn raw sensor data into real-time intelligence.',
  cta: {
    primary:   { label: 'View Work', href: '#projects' },
    secondary: { label: 'Contact',   href: '#contact' },
  },
}

// ─── About ───────────────────────────────────────────────────
export const about = {
  heading: {
    plain:      'I bridge the gap between',
    highlight1: 'hardware',
    connector:  'and',
    highlight2: 'cloud',
  },
  bio: `With a background in electrical engineering and a passion for
software, I specialize in building backend systems that collect,
process, and visualize telemetry data from IoT devices — turning
raw sensor readings into actionable insights.`,
  stats: [
    { value: 'IoT',        label: 'Specialization' },
    { value: 'Backend',    label: 'Core Focus' },
    { value: 'Full Stack', label: 'From Hardware to Cloud' },
  ],
}

// ─── Skills ──────────────────────────────────────────────────
export interface Skill {
  icon: IconType
  name: string
  category: string
}

export const skills: Skill[] = [
  { icon: SiTypescript, name: 'TypeScript', category: 'Language' },
  { icon: SiJavascript, name: 'JavaScript', category: 'Language' },
  { icon: FaNodeJs,     name: 'Node.js',    category: 'Runtime' },
  { icon: SiAdonisjs,   name: 'AdonisJS',   category: 'Framework' },
  { icon: SiPostgresql, name: 'PostgreSQL',  category: 'Database' },
  { icon: ImDatabase,   name: 'TimescaleDB', category: 'Time-Series' },
  { icon: SiMqtt,       name: 'MQTT',        category: 'Protocol' },
  { icon: SiDocker,     name: 'Docker',      category: 'DevOps' },
  { icon: SiGit,        name: 'Git',         category: 'Tooling' },
  { icon: FcElectricity,name: 'Embedded',    category: 'Hardware' },
]

// ─── Projects ─────────────────────────────────────────────────
export const projects = [
  {
    num: '01',
    title: 'IoT Telemetry Platform',
    description:
      'Real-time monitoring system ingesting data from 500+ sensors via MQTT, processing through Node.js pipelines, visualized in live dashboards.',
    tags: ['Node.js', 'MQTT', 'TimescaleDB', 'WebSocket'],
    href: '#',
  },
  {
    num: '02',
    title: 'Smart Agriculture Backend',
    description:
      'AdonisJS REST API powering an agricultural monitoring system — soil moisture, weather data, and automated irrigation control.',
    tags: ['AdonisJS', 'PostgreSQL', 'MQTT', 'REST API'],
    href: '#',
  },
  {
    num: '03',
    title: 'Device Management Service',
    description:
      'Microservice handling device registration, OTA firmware updates, and health monitoring for thousands of IoT endpoints.',
    tags: ['TypeScript', 'Docker', 'PostgreSQL', 'gRPC'],
    href: '#',
  },
]

// ─── Experience ───────────────────────────────────────────────
export const experience = [
  {
    period: 'Now',
    title: 'Backend Engineer — IoT Systems',
    description:
      'Building real-time telemetry platforms, designing MQTT-based architectures, and developing data pipelines for large-scale sensor networks.',
    tags: ['Node.js', 'MQTT', 'TimescaleDB'],
  },
  {
    period: '2022',
    title: 'Full-Stack IoT Developer',
    description:
      'Developed end-to-end IoT solutions from firmware integration to cloud dashboards. Built REST APIs with AdonisJS and real-time data visualization.',
    tags: ['AdonisJS', 'PostgreSQL', 'WebSocket'],
  },
  {
    period: '2021',
    title: 'Hardware & Embedded Engineer',
    description:
      'Designed PCBs and programmed microcontrollers. This foundation gives me a unique understanding of the full IoT stack — from circuit to cloud.',
    tags: ['Embedded C', 'PCB Design', 'Sensors'],
  },
]

// ─── Teams ────────────────────────────────────────────────────
export const teams = [
  {
    name: 'Team Name',
    role: 'Your Role',
    description: 'Short description of what this team does and what you contribute to it.',
    logo: '/logos/team-logo.png',  // put logo files in /public/logos/
    href: 'https://example.com',
  },
  // Add more teams here...
]

// ─── Contact ──────────────────────────────────────────────────
export const contact = {
  heading:  "Let's build something.",
  subtext:
    'Open to backend engineering roles, IoT consulting, and interesting collaborations. Whether you need a telemetry pipeline or a scalable API — let\'s talk.',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sigit-nurmajid-858181160' },
    { label: 'GitHub',   href: 'https://github.com/sigitnurmajid' },
    { label: 'YouTube',  href: 'https://youtube.com/channel/UCIRErnyZjR3GVdM7qyq88Tw' },
    { label: 'Email',    href: 'mailto:sigitnurmajid32@gmail.com' },
  ],
}
