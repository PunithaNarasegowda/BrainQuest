import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/Timer';
import About from './AboutUs';
import Sponsors from './Sponsors';
import Prizes from '../components/Prizes';
import Contact from '../components/Contact';
import logo from '../assets/logoRoboweek.png';
import SplashCursor from '../blocks/Animations/SplashCursor/SplashCursor.jsx';

const Home = () => {
  const theme = {
    themeOfEvent: "Rise of the Machines"
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="hero">
        <section className='relative w-full lg:min-h-screen min-h-[70vh] flex flex-col justify-center items-center '>
          <img src="https://res.cloudinary.com/dosnuagvu/image/upload/v1738154202/logoRoboweek_ye8gmy.png" alt="" className='lg:absolute lg:top-[25px] lg:right-[30px] absolute top-2 p-1 backdrop-blur-sm w-[100px] border border-white/20 rounded-full lg:scale-100 lg:w-[150px]' />
          <div className='flex flex-col justify-center items-center space-y-8 gap-205'>
            <h1 className='relative z-[100] text-white/80 font-squidFont lg:text-[8vw] mt-20 lg:leading-[8vw] leading-[14vw] text-[14vw] text-center'>ROBOWEEK 3.0</h1>
            <h2 className='font-squidFont text-white text-2xl lg:text-3xl'>MYRAID OF iNNOVATION</h2>
            <CountdownTimer />
          </div>
          <div className='mt-5'>
            <Link to="/sign">
              <Button text="Register Now" textSize="text-2xl" iconLink={<i className="ri-arrow-right-line"></i>} />
            </Link>
          </div>
        </section>
      </div>

      {/* Rest of your Home component code... */}
      {/* Features Section */}
      <section className="py-20 z-1000">
        {/* Your existing features section code */}
      </section>

      <About />
      <Prizes />
      <Sponsors />
      <Contact />
    </div>
  );
};

export default Home;