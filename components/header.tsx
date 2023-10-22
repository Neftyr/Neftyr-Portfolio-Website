"use client"

import Link from "next/link"
import custom from "@/styles/underline.module.css"
import clsx from "clsx" // Adding conditional styles
import { motion } from "framer-motion"
import { links } from "@/lib/data"
import { useActiveSectionContext } from "@/context/active-section-context"

export default function Header() {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

    return (
        <header className="relative z-[999]">
            <nav
                className={clsx("fixed flex top-0 left-0 h-[4rem] w-full items-center bg-black bg-opacity-60 backdrop-blur-[2px] duration-500", {
                    "pt-4 !bg-transparent": activeSection === "Home",
                })}
            >
                <motion.ul className="ml-[7rem]" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <Link
                        className="flex text-white text-5xl"
                        href="#home"
                        onClick={() => {
                            setActiveSection("Home")
                            setTimeOfLastClick(Date.now())
                        }}
                    >
                        Niferu <span className="text-orange-500">.</span>
                    </Link>
                </motion.ul>
                <motion.ul className="ml-auto flex flex-wrap sm:flex-nowrap gap-3 mr-[5rem]" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    {links.map((link) => (
                        <li key={link.hash} className="flex">
                            <Link
                                className={clsx(custom.underline, { "text-yellow-700": activeSection === link.name })}
                                href={link.hash}
                                onClick={() => {
                                    setActiveSection(link.name)
                                    setTimeOfLastClick(Date.now())
                                }}
                            >
                                {link.name}

                                {link.name === activeSection && (
                                    <motion.span
                                        className={clsx("flex absolute w-full h-[20%] rounded bg-stone-950 bottom-[-0.2rem]", {
                                            "!bg-transparent": activeSection === "Home",
                                        })}
                                        layoutId="activeSection"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    ></motion.span>
                                )}
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            </nav>
        </header>
    )
}
