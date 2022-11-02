import { FaFrog, FaNodeJs } from "react-icons/fa";
import { SiJavascript , SiTypescript, SiAdonisjs, SiPostgresql} from "react-icons/si";
import { ImDatabase} from "react-icons/im";
import { GiSatelliteCommunication} from "react-icons/gi";
import { FcElectricity} from "react-icons/fc";

export default function Skills() {
  return (
    <div id="skills" className="w-full h-screen p-2">
      <div className='max-w-[1240px] m-auto flex flex-col justify-center h-full'>
        <h2 className="mx-auto mt-20 mb-10 md:my-20 uppercase text-gray-600">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto md:gap-x-96 gap-y-10">
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <SiJavascript size={40} />
            <p className="uppercase m-auto text-xl font-semibold">javascript</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <SiTypescript size={40} />
            <p className="uppercase m-auto text-xl font-semibold">typescript</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <FaNodeJs size={40} />
            <p className="uppercase m-auto text-xl font-semibold text-center">node js</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <SiAdonisjs size={40} />
            <p className="uppercase m-auto text-xl font-semibold">adonis js</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <SiPostgresql size={40} />
            <p className="uppercase m-auto text-xl font-semibold">sql</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <ImDatabase size={40} />
            <p className="uppercase m-auto text-xl font-semibold">timeseries database</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <GiSatelliteCommunication size={40} />
            <p className="uppercase m-auto text-xl font-semibold">mqtt</p>
          </div>
          <div className="w-96 h-20 border-2 border-black rounded-md shadow-md shadow-gray-400 p-4 flex">
            <FcElectricity size={40} />
            <p className="uppercase m-auto text-xl font-semibold">electrical engineering</p>
          </div>
        </div>
      </div>
    </div>
  )
}