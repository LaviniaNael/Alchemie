import Hero from '../sections/Hero'
import Collection from '../sections/Collection'
import Formulation from '../sections/Formulation'
import Atelier from '../sections/Atelier'
import Marquee from '../components/Marquee'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee text="The Darkroom Collection" speed={1.2} direction="left" />
      <Collection />
      <Marquee text="Crafted in Grasse" speed={0.8} direction="right" separator="—" />
      <Formulation />
      <Marquee text="Seven Fragrances" speed={1} direction="left" />
      <Atelier />
    </>
  )
}
