import About from "@/components/About";
import Application from "@/components/Application";
import ContactMe from "@/components/ContactMe";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import React from "react";

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <Application />
      <ContactMe />
    </article>
  );
};

export default Home;
