import Head from 'next/head'
import Navbar from '../components/Navbar'
import { site } from '../content'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Teams from '../components/sections/Teams'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main className="md:pl-56">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Teams />
        <Contact />
      </main>
    </>
  )
}
