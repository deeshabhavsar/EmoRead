import React from 'react';

interface NavbarProps {
  activePage: 'results' | 'community';
  onNavigate: (page: 'results' | 'community') => void;
  onNewAnalysis: () => void;
  hasAnalysis: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onNewAnalysis, hasAnalysis }) => {
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-white/70 text-[#4A5568] shadow-sm";
  const inactiveLinkClasses = "text-gray-500 hover:text-[#4A5568]";
  const disabledLinkClasses = "text-gray-400 cursor-not-allowed";

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-[#4A5568] font-poppins">EmoRead</span>
            </div>
          </div>
          <div className="flex-grow flex justify-center">
            <div className="flex items-baseline space-x-2 bg-gray-200/50 p-1 rounded-lg">
               <button
                onClick={() => hasAnalysis && onNavigate('results')}
                className={`${navLinkClasses} ${activePage === 'results' ? activeLinkClasses : hasAnalysis ? inactiveLinkClasses : disabledLinkClasses}`}
                disabled={!hasAnalysis}
                aria-current={activePage === 'results' ? 'page' : undefined}
              >
                Results
              </button>
              <button
                onClick={() => onNavigate('community')}
                className={`${navLinkClasses} ${activePage === 'community' ? activeLinkClasses : inactiveLinkClasses}`}
                aria-current={activePage === 'community' ? 'page' : undefined}
              >
                Community
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={onNewAnalysis}
              className="bg-gradient-to-r from-[#E0D4F7]/80 to-[#C8E4F6]/80 text-[#4A5568] font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-px transition-all duration-200"
            >
              New Analysis
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
