import { FaCircle } from 'react-icons/fa';

function Hero({ heroData, heroCount, setHeroCount }) {
  const isDarkBg = heroCount === 2 || heroCount === 3; // adjust if needed
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center px-6 md:px-20 z-10">
      <div>
        <p className={`text-3xl md:text-6xl font-bold transition-all duration-300 text-white`}>
          {heroData.text1}
        </p>
        <p className={`text-xl md:text-3xl mt-2 text-gray-200`}>
          {heroData.text2}
        </p>
      </div>
      <div className="flex gap-3 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            className={`w-[12px] h-[12px] cursor-pointer ${heroCount === i ? 'fill-white' : 'fill-gray-400'}`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
