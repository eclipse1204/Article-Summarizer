import logo from '../assets/logo-14.jpg';

function Hero() {
  return (
    <header className='w-full flex justify-center items-center mb-10 pt-3 flex-col'>
      <nav className='flex justify-between items-center flex-col'>
        <img className='w-28 object-contain' src={logo} alt="Logo" />
      </nav>
      <h1 className='head_text orange_gradient'>
        Summarize Websites <br /> with Article Summarizer
      </h1>
      <h2 className='desc'>
        Simplify your reading with Article Extractor and Summarizer API,
        that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  )
}

export default Hero