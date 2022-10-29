import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineMail } from 'react-icons/ai'
import { FaLinkedinIn, FaGithub, FaYoutube, FaFrog } from 'react-icons/fa'

export default function Navbar() {
  const [nav, setNav] = useState<boolean>(false)

  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <div className="fixed w-full h-20 shadow-xl z-[100] ">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <FaFrog size={40} />
        <div>
          <ul className="hidden md:flex">
            <Link href='/'>
              <li className='ml-10 text-sm uppercase hover:border-b'>home</li>
            </Link>
            <Link href='/#skills'>
              <li className='ml-10 text-sm uppercase hover:border-b'>skills</li>
            </Link>
            <Link href='/'>
              <li className='ml-10 text-sm uppercase hover:border-b'>project</li>
            </Link>
            <Link href='/'>
              <li className='ml-10 text-sm uppercase hover:border-b'>contact</li>
            </Link>
          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""}>
        <div className={nav
          ? "md:hidden fixed left-0 top-0 w-[60%] sm:w-[50%] h-screen bg-white p-10 ease-in duration-500"
          : "fixed left-[-100%] top-0 w-[60%] p-10 sm:w-[50%] ease-in duration-500"
        }>
          <div className="flex w-full items-center justify-between">
            <FaFrog size={40} />
            <div onClick={handleNav} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
              <AiOutlineClose />
            </div>
          </div>
          <div className="border-b border-gray-400 my-4">
            <p className="uppercase w-[85%] md:w-[90%] py-4">let&apos;s make our journey</p>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/" onClick={handleNav}>
                <li className="py-4 text-sm">Home</li>
              </Link>
              <Link href='/#skills' onClick={handleNav}>
                <li className="py-4 text-sm">Skills</li>
              </Link>
              <Link href="/" onClick={handleNav}>
                <li className="py-4 text-sm">Project</li>
              </Link>
              <Link href="/" onClick={handleNav}>
                <li className="py-4 text-sm">Contact</li>
              </Link>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest">Let&apos;s Connect</p>
              <div className="flex items-center justify-between my-2 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Link href={"https://www.linkedin.com/in/sigit-nurmajid-858181160"}><FaLinkedinIn size={15} /></Link>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Link href={"https://github.com/sigitnurmajid"}><FaGithub size={15} /></Link>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Link href={"mailto:sigitnurmajid32@gmail.com"}><AiOutlineMail size={15} /></Link>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                  <Link href={"https://youtube.com/channel/UCIRErnyZjR3GVdM7qyq88Tw"}><FaYoutube size={15} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}