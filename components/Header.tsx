import React, { useState, useEffect } from 'react';
import LockIcon from './icons/LockIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      console.log('isMenuOpen:', !prev);
      return !prev;
    });
  };


  const navLinks = [
    { name: 'Início', href: '/' }
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#' },
    { name: 'GitHub', href: '#' },
  ];

  const navAnimationDelay = 0.25;
  const navStagger = 0.15;
  const numNavLinks = navLinks.length;
  const contentAnimationDelay = navAnimationDelay + numNavLinks * navStagger;
  const footerButtonsDelay = contentAnimationDelay + 0.12;
  const socialLinksDelay = footerButtonsDelay + 0.12;

  const getAnimationStyle = (delay: number) => ({
    animation: isMenuOpen
      ? `premiumFadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards`
      : 'none',
    opacity: isMenuOpen ? 0 : 1,
  });

  return (
    <>
      <header
        className={`bg-gray-100/80 backdrop-blur-md sticky top-0 z-[100] transition-all duration-300 ${
          hasScrolled ? 'shadow-md border-b border-slate-200' : 'border-b border-transparent'
        }`}
      >
        <div className="container mx-auto max-w-screen-2xl px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-slate-900 sm:text-2xl">Recarga Fácil</span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </a>
              ))}
            </nav>

            {/* Botões desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300"
              >
                Login
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
              >
                Registre-se
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-slate-600 z-[120] bg-gray-100/80 relative transition-all duration-300 hover:opacity-75"
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMenuOpen}
              >
                <div className="space-y-1.5">
                  <span
                    className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-slate-800 transition-opacity duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-[4rem] inset-x-0 bottom-0 bg-gradient-to-br bg-gray-100 via-slate-50 to-slate-100 z-[90] transform transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ backgroundSize: '200% 200%', animation: isMenuOpen ? 'subtleGradient 15s ease infinite' : 'none' }}
  
      >
        <div className="h-full flex flex-col px-6">


          <div className="flex-grow overflow-y-auto py-8">

            <nav className="flex flex-col space-y-2 mb-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-2xl font-semibold text-slate-700 rounded-md hover:bg-slate-100/80 transition-all duration-300 hover:scale-[1.02] opacity-0"
                  style={getAnimationStyle(navAnimationDelay + i * navStagger)}
                >
                  {link.name}
                </a>
              ))}
            </nav>


            <div className="border-t border-slate-200 pt-8 space-y-4">
              <div
                className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-100/80 transition-all duration-300 hover:scale-[1.02] opacity-0"
                style={getAnimationStyle(contentAnimationDelay)}
              >
                <div className="flex-shrink-0 text-slate-500 mt-1 group-hover:text-slate-800 transition-all duration-300 group-hover:scale-110">
                  <LockIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Recarga Segura</p>
                  <p className="text-sm text-slate-500">Suas recargas com total segurança.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-t border-slate-200">
            <div
              className="flex flex-col space-y-4 opacity-0"
              style={getAnimationStyle(footerButtonsDelay)}
            >
              <a
                href="#"
                className="w-full text-center px-4 py-3 text-md font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
              >
                Registre-se
              </a>
              <a
                href="#"
                className="w-full text-center px-4 py-3 text-md font-semibold text-slate-700 bg-slate-200/80 rounded-md hover:bg-slate-200 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </a>
            </div>
            <div
              className="flex justify-center items-center space-x-6 mt-8 opacity-0"
              style={getAnimationStyle(socialLinksDelay)}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 transform hover:scale-105 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes premiumFadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(25px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes subtleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 20px;
          border: 3px solid #f1f5f9; /* slate-100 */
          background-clip: padding-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; /* slate-400 */
        }
      `}</style>
    </>
  );
};

export default Header;