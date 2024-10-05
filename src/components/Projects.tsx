import githubIcon from "/assets/icon-github.png"
import openIcon from "/assets/icon-open.png"
import youtubeIcon from "/assets/icon-youtube.png"
import { motion, AnimatePresence } from "framer-motion";
import { ProjectsList } from "../utils/constants";
import { useState } from "react";
import { ArrowLeft } from "lucide-react"
import { ArrowRight } from "lucide-react"

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const selectProject = (index: number, newDirection: "left" | "right") => {
    setDirection(newDirection);

    if (index < 0) {
      setSelectedIndex(ProjectsList.length - 1); // Wrap to the last project
    } else if (index >= ProjectsList.length) {
      setSelectedIndex(0); // Wrap to the first project
    } else {
      setSelectedIndex(index);
    }
  };

  const projectVariants = {
    hidden: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100, // slide from the left or right
    }),
    visible: { opacity: 1, x: 0 }, // animation for entering
    exit: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? 100 : -100, // slide to the left or right
    }),
  };

  return (
    <section id="projects">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 1.5 }}
        className="my-10 md:mt-20 text-center text-[1.8rem] font-medium"
      >
        Projects
      </motion.h2>
      <motion.div className="px-4 md:px-8 xl:px-0 gap-x-7 max-w-[500px] mx-auto"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatePresence mode='wait' >
          {ProjectsList.map((item, idx) =>
            selectedIndex === idx ? (
              <div key={idx} className="relative">
                <motion.div
                  custom={direction}
                  className="mx-auto w-full mb-8 md:mx-0 flex flex-col max-w-[420px] md:max-w-none"
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <a href={item.liveLink} target="_blank">
                      <img
                        className="rounded-t-2xl hover:opacity-50 h-[250px] w-full"
                        src={item.image}
                        alt={item.alt}
                      />
                    </a>
                    {idx === 0 && (
                      <a
                        href='https://www.youtube.com/watch?v=Sp2cpRGX1OY'
                        target="_blank">
                        <img
                          className="max-w-[40px] hover:opacity-90 absolute left-2 top-2"
                          alt="Youtube"
                          src={youtubeIcon}
                        />
                      </a>
                    )}
                    <a
                      href={item.repositoryLink}
                      target="_blank"
                    >
                      <img
                        src={githubIcon}
                        alt="Github"
                        className="max-w-[40px] hover:opacity-90 absolute top-2 right-2"
                      />
                    </a>
                    <a href={item.liveLink} target="_blank">
                      <img
                        src={openIcon}
                        alt="Live Web"
                        className="w-full max-w-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    </a>
                  </div>
                  <div className="px-5 shadow-lg py-4 rounded-b-2xl flex-grow flex flex-col">
                    <h2 className="text-2xl">{item.name}</h2>
                    <div className="mt-2">
                      <p>{item.description}</p>
                      <ul className="list-disc mt-2 pl-4">
                        <li>{item.listOne}</li>
                        <li>{item.listTwo}</li>
                        {item.listThree && <li>{item.listThree}</li>}
                        {item.listFour && <li>{item.listFour}</li>}
                      </ul>
                    </div>
                    <div className="grid-techs">
                      {item.techs.map((tech, techIdx) => (
                        <div key={techIdx} className="flex">
                          <div className="flex items-center gap-2">
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-6 h-6"
                            />
                            <p className="text-sm">{tech.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <div className="hidden md:block">
                  <button
                    onClick={() => selectProject(selectedIndex - 1, "left")}
                    aria-label="Previous Project"
                    className="size-[40px] absolute left-[-62px] top-[50%] bg-gray-300 rounded-full bg-second-blue hover:opacity-70 text-white flex justify-center items-center"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={() => selectProject(selectedIndex + 1, "right")}
                    aria-label="Next Project"
                    className="size-[40px] bg-second-blue absolute right-[-60px] top-[50%] text-white flex justify-center items-center rounded-full hover:opacity-70"

                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>
      {/* Render buttons for each project */}
      <div className="flex justify-center items-center gap-8 mt-4">
        {ProjectsList.map((_, idx) => (
          <button
            key={idx}
            aria-pressed={selectedIndex === idx}
            aria-label={`Tab ${ProjectsList[idx].name}`}
            className={`w-[10px] h-[10px] md:w-[15px] md:h-[15px] rounded-full hover:bg-success-two ${selectedIndex === idx ? "bg-success " : "bg-thirdgray hover:opacity-70"
              }`}
            onClick={() => selectProject(idx, idx > selectedIndex ? "right" : "left")}
          />
        ))}
      </div>
    </section >
  )
}

export default Projects