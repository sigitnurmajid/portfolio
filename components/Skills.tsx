import { FaNodeJs } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiAdonisjs, SiPostgresql } from 'react-icons/si'
import { ImDatabase } from 'react-icons/im'
import { GiSatelliteCommunication } from 'react-icons/gi'
import { FcElectricity } from 'react-icons/fc'
import { motion } from 'framer-motion'

const skills = [
  { icon: SiJavascript, label: 'javascript' },
  { icon: SiTypescript, label: 'typescript' },
  { icon: FaNodeJs, label: 'node js' },
  { icon: SiAdonisjs, label: 'adonis js' },
  { icon: SiPostgresql, label: 'sql' },
  { icon: ImDatabase, label: 'timeseries database' },
  { icon: GiSatelliteCommunication, label: 'mqtt' },
  { icon: FcElectricity, label: 'electrical engineering' },
]

export default function Skills() {
  return (
    <div id="skills" className="w-full mb-20">
      <div className="max-w-[1240px] m-auto flex flex-col justify-center h-full px-4">
        <h2 className="mx-auto mt-20 mb-10 md:my-20 uppercase text-gray-300">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto md:gap-x-96 gap-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="w-86 h-20 border border-gray-700 rounded-lg bg-gray-900/60 backdrop-blur-sm shadow-md shadow-blue-500/5 p-4 flex hover:border-teal-400/50 hover:shadow-teal-400/10 transition-colors duration-300"
            >
              <skill.icon size={40} />
              <p className="uppercase m-auto text-xl font-semibold">{skill.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
