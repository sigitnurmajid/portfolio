import {FaLinkedinIn, FaGithub, FaYoutube} from 'react-icons/fa'
import { AiOutlineMail} from 'react-icons/ai'
import Link from 'next/link'

export default function Main() {
  return (
    <div className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase tracking-widest text-gray-500 py-4">let&apos;s build something together</p>
          <h1 className="py-4">
            Hi, I&apos;m <span className="text-blue-700 mb-4">Sigit</span>
          </h1>
          <h2 className="uppercase text-gray-600 py-4">
            a man who lives as backend developer
          </h2>
          <p className="text-gray-700 max-w-2xl m-auto py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quo aspernatur architecto facere repellendus deleniti fugiat magni dolorum tempore totam harum deserunt dicta, laboriosam at magnam reprehenderit blanditiis voluptas tempora.
          </p>
          <div className="hidden md:flex items-center justify-between py-4 w-full max-w-sm m-auto">
            <div className="rounded-full bg-gray-100 shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-150 ease-in duration-300">
              <Link href={"https://www.linkedin.com/in/sigit-nurmajid-858181160"}><FaLinkedinIn size={30}/></Link>
              
            </div>
            <div className="rounded-full bg-gray-100 shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-150 ease-in duration-300">
              <Link href={"https://github.com/sigitnurmajid"}><FaGithub size={30}/></Link>
            </div>
            <div className="rounded-full bg-gray-100 shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-150 ease-in duration-300">
              <Link href={"mailto:sigitnurmajid32@gmail.com"}><AiOutlineMail size={30}/></Link>
            </div>
            <div className="rounded-full bg-gray-100 shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-150 ease-in duration-300">
              <Link href={"https://youtube.com/channel/UCIRErnyZjR3GVdM7qyq88Tw"}><FaYoutube size={30}/></Link>             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}