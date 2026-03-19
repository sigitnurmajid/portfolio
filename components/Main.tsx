import { FaLinkedinIn, FaGithub, FaYoutube } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Main() {
  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div className="backdrop-blur-md bg-gray-950/40 rounded-2xl p-8 md:p-12 border border-gray-800/50">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="uppercase tracking-widest text-gray-400 py-4"
          >
            let&apos;s make our journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="py-4"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-500 to-teal-300 bg-clip-text text-transparent">
              Sigit Nurmajid
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="uppercase text-gray-400 py-4"
          >
            a man who lives as backend developer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-gray-300 max-w-2xl m-auto py-4"
          >
            I&apos;m backend developer specializing in building Internet of Things system.
            Even though my background is hardware engineer, I&apos;m excited to build{' '}
            <span className="font-bold text-teal-300">Backend System</span>.
            Currently, I&apos;m focused to build many IoT project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden md:flex items-center justify-between py-4 w-full max-w-sm m-auto"
          >
            <div className="rounded-full border border-gray-600 shadow-lg shadow-blue-500/10 p-3 cursor-pointer hover:scale-125 hover:border-teal-400 hover:shadow-teal-400/20 ease-in duration-300">
              <Link href="https://www.linkedin.com/in/sigit-nurmajid-858181160">
                <FaLinkedinIn size={30} />
              </Link>
            </div>
            <div className="rounded-full border border-gray-600 shadow-lg shadow-blue-500/10 p-3 cursor-pointer hover:scale-125 hover:border-teal-400 hover:shadow-teal-400/20 ease-in duration-300">
              <Link href="https://github.com/sigitnurmajid">
                <FaGithub size={30} />
              </Link>
            </div>
            <div className="rounded-full border border-gray-600 shadow-lg shadow-blue-500/10 p-3 cursor-pointer hover:scale-125 hover:border-teal-400 hover:shadow-teal-400/20 ease-in duration-300">
              <Link href="mailto:sigitnurmajid32@gmail.com">
                <AiOutlineMail size={30} />
              </Link>
            </div>
            <div className="rounded-full border border-gray-600 shadow-lg shadow-blue-500/10 p-3 cursor-pointer hover:scale-125 hover:border-teal-400 hover:shadow-teal-400/20 ease-in duration-300">
              <Link href="https://youtube.com/channel/UCIRErnyZjR3GVdM7qyq88Tw">
                <FaYoutube size={30} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
