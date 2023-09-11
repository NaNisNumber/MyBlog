import penImg from "../../images/pen.png";
import libraryImg from "../../images/library.png";

const HeroSection = () => {
  return (
    <section className="flow-root px-5 pb-9 lg:px-8">
      <header className="flex items-center flex-col translate-y-2/3  relative z-30 ">
        <h1 className="text-white font-serif text-2xl font-bold sm:text-5xl lg:text-5xl">
          Welcome to my blog
        </h1>
      </header>
      <p
        style={{ lineHeight: "1.5" }}
        className="text-white font-serif translate-y-2/3 text-xl font-bold text-center tracking-wide sm:text-3xl lg:text-5xl opacity-90 relative z-40"
      >
        Here you can find usefull stuff<br></br> about{" "}
        <span className="relative px-3 py-1 before:-z-10 before:block before:absolute before:-inset-0  lg:before:-inset-1  before:-skew-y-3 before:bg-gold">
          everything{" "}
          {/* <div className="absolute w-full h-full bg-gold top-0 left-0 -z-10 -rotate-3 px-6 py-1 box-content"></div> */}
        </span>
      </p>

      <div className="grid grid-cols-2 justify-items-center gap-6 w-4/5 lg:w-3/5 m-0-auto">
        <div className="relative w-full">
          <img
            className="w-full relative z-10 object-cover h-full shadow-lg shadow-shadowBlack"
            src={libraryImg}
          />
          <div className="w-full h-full bg-darkPurple absolute top-8% right-8%"></div>
          <div className="w-full h-full bg-black opacity-30 absolute top-0 z-20"></div>
        </div>
        <div className="relative w-full">
          <img
            className="w-full relative z-10 object-cover h-full shadow-lg shadow-shadowBlack"
            src={penImg}
          />
          <div className="w-full h-full bg-darkPurple absolute top-8% left-8%"></div>
          <div className="w-full h-full bg-black opacity-30 absolute top-0 z-20"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
