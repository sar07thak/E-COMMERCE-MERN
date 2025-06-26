import React, { useEffect, useState } from 'react';
import Backgound from '../components/Baclground';
import Hero from '../components/Hero';

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Backgound heroCount={heroCount} />
      <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
    </div>
  );
}

export default Home;
