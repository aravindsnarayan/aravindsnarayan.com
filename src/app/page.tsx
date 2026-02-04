import {
  Header,
  Hero,
  About,
  Impact,
  Skills,
  Projects,
  Contact,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Impact />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
