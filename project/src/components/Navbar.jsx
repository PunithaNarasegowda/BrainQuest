import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', section: 'hero', href: '/Home', icon: 'ri-home-line' },
    { name: 'About', href: '/about', icon: 'ri-information-line' },
    { name: 'Events', href: '/events', icon: 'ri-calendar-event-line' },
    { name: 'Team', href: '/team', icon: 'ri-team-line' },
    { name: 'Sponsors', href: '/sponsors', icon: 'ri-money-dollar-circle-line' },
    { name: 'Conference', href: '/conference', icon: 'ri-slideshow-line' },
    { name: 'Contact', href: '#contact', icon: 'ri-mail-line' },
  ];

  const handleScrollToContact = (event) => {
    event.preventDefault();
    if (window.location.pathname !== '/Home') {
      navigate('/Home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href, event) => {
    event.preventDefault();
    setIsOpen(false);
    setIsMobileMenuOpen(false);
    navigate(href);
    window.scrollTo(0, 0);
  };

  const isActive = (path) => {
    if (path === '#contact') return false;
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-[1000] ${
          isOpen ? 'w-64' : 'w-12'
        } transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-pink-500/10`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="backdrop-blur-lg bg-black/20 border border-pink-500/30 rounded-2xl transition-all duration-500 ease-in-out hover:bg-black/30">
          <div className="flex flex-col items-center gap-3 py-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-300 transition-all duration-500 ease-in-out transform hover:text-pink-400 hover:bg-pink-500/10">
              {isOpen ? (
                <XMarkIcon className="h-8 w-8 transition-transform duration-500 ease-in-out" />
              ) : (
                <Bars3Icon className="h-8 w-8 transition-transform duration-500 ease-in-out" />
              )}
            </div>

            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.name === 'Contact' ? '#' : item.href}
                onClick={(e) =>
                  item.name === 'Contact'
                    ? handleScrollToContact(e)
                    : handleNavigation(item.href, e)
                }
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl
                  transition-all duration-500 ease-in-out transform
                  ${isActive(item.href) ? 'text-pink-400 bg-pink-500/10' : 'text-gray-300'}
                  hover:text-pink-400 hover:bg-pink-500/10 hover:scale-105
                  ${!isOpen && 'justify-center'} group relative`}
              >
                <i
                  className={`${
                    item.icon
                  } text-2xl transition-transform px-[3px] duration-500 ease-in-out group-hover:scale-110 ${
                    isActive(item.href) ? 'text-pink-400' : ''
                  }`}
                ></i>
                {isOpen ? (
                  <span className="text-base font-medium transition-opacity duration-500 ease-in-out">
                    {item.name}
                  </span>
                ) : (
                  <span className="absolute left-full ml-3 px-3 py-2 bg-black/80 text-pink-400 text-base rounded-lg 
                    opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out 
                    transform translate-x-2 group-hover:translate-x-0
                    whitespace-nowrap shadow-lg">
                    {item.name}
                  </span>
                )}
              </Link>
            ))}

            {/* Authentication Links */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 
                    transition-all duration-500 ease-in-out transform
                    hover:text-pink-400 hover:bg-pink-500/10 hover:scale-105
                    ${!isOpen && 'justify-center'} group relative`}
                >
                  <i className="ri-user-line text-2xl"></i>
                  {isOpen && <span>Profile</span>}
                </Link>
                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 
                    transition-all duration-500 ease-in-out transform
                    hover:text-pink-400 hover:bg-pink-500/10 hover:scale-105
                    ${!isOpen && 'justify-center'} group relative`}
                >
                  <i className="ri-logout-box-line text-2xl"></i>
                  {isOpen && <span>Logout</span>}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 
                  transition-all duration-500 ease-in-out transform
                  hover:text-pink-400 hover:bg-pink-500/10 hover:scale-105
                  ${!isOpen && 'justify-center'} group relative`}
              >
                <i className="ri-login-box-line text-2xl"></i>
                {isOpen && <span>Login</span>}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-[1001] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-lg border border-pink-500/30 text-white"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-[1000] md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.name === 'Contact' ? '#' : item.href}
              onClick={(e) =>
                item.name === 'Contact'
                  ? handleScrollToContact(e)
                  : handleNavigation(item.href, e)
              }
              className={`flex items-center gap-4 py-3 px-6 rounded-xl w-full max-w-sm
                transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-pink-400 bg-pink-500/10'
                    : 'text-gray-300'
                } hover:text-pink-400 hover:bg-pink-500/10`}
            >
              <i className={`${item.icon} text-2xl`}></i>
              <span className="text-lg font-medium">{item.name}</span>
            </Link>
          ))}
          
          {/* Mobile Authentication Links */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-4 py-3 px-6 rounded-xl w-full max-w-sm text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="ri-user-line text-2xl"></i>
                <span className="text-lg font-medium">Profile</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 py-3 px-6 rounded-xl w-full max-w-sm text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
              >
                <i className="ri-logout-box-line text-2xl"></i>
                <span className="text-lg font-medium">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-4 py-3 px-6 rounded-xl w-full max-w-sm text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ri-login-box-line text-2xl"></i>
              <span className="text-lg font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className={`z-[1000] md:hidden fixed backdrop-blur-lg bottom-0 left-0 right-0 bg-black/20 border-t border-pink-500/30 p-4 flex justify-around transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.name === 'Contact' ? '#' : item.href}
            onClick={(e) =>
              item.name === 'Contact'
                ? handleScrollToContact(e)
                : handleNavigation(item.href, e)
            }
            className={`flex flex-col items-center transition-colors duration-300 ${
              isActive(item.href) ? 'text-pink-400' : 'text-gray-300'
            } hover:text-pink-400`}
          >
            <i className={`${item.icon} text-2xl`}></i>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
        {user ? (
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-300 hover:text-pink-400 transition-colors duration-300"
          >
            <i className="ri-user-line text-2xl"></i>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center text-gray-300 hover:text-pink-400 transition-colors duration-300"
          >
            <i className="ri-login-box-line text-2xl"></i>
            <span className="text-xs mt-1">Login</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;