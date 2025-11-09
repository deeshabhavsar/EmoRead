import React from 'react';

export const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export const BookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
);

export const ChapterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 12h-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8h.01" />
    </svg>
);

export const MicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-12 0H3a7.001 7.001 0 006 6.93V17H7v1h6v-1h-2v-2.07z" clipRule="evenodd" />
  </svg>
);

export const RecordIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

export const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

export const UploadIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ShareIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" />
    </svg>
);

export const PlayIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

export const PauseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

export const PlusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const BookDoodle1 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 15C25 12.2386 27.2386 10 30 10H70C72.7614 10 75 12.2386 75 15V85C75 87.7614 72.7614 90 70 90H30C27.2386 90 25 87.7614 25 85V15Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M25 20H75" stroke="black" strokeWidth="2"/>
        <path d="M50 10V90" stroke="black" strokeWidth="2"/>
        <path d="M35 30H45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M35 40H45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle2 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80C20 74.4772 24.4772 70 30 70H80C85.5228 70 90 74.4772 90 80V85H20V80Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M25 70V30C25 24.4772 29.4772 20 35 20H75C80.5228 20 85 24.4772 85 30V70" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M55 30H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 40H70" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 50H60" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle3 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 20H30C24.4772 20 20 24.4772 20 30V70C20 75.5228 24.4772 80 30 80H80C85.5228 80 90 75.5228 90 70V30C90 24.4772 85.5228 20 80 20Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 35H90" stroke="black" strokeWidth="2"/>
        <path d="M60 45H75" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M60 55H70" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M35 45L45 65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M45 45L35 65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle4 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 70H75V80H25V70Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M30 55H80V65H30V55Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 40H70V50H20V40Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M25 70V80" stroke="black" strokeWidth="2"/>
        <path d="M30 55V65" stroke="black" strokeWidth="2"/>
        <path d="M20 40V50" stroke="black" strokeWidth="2"/>
    </svg>
);

export const BookDoodle5 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 20C25 20 20 30 20 50C20 70 25 80 50 80" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 20C75 20 80 30 80 50C80 70 75 80 50 80" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M50 20V80" stroke="black" strokeWidth="2"/>
        <path d="M30 35H45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 45H40" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 35H70" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 45H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 55H70" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle6 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 25V85H30C27.2386 85 25 82.7614 25 80V30C25 27.2386 27.2386 25 30 25H75Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M75 25H30" stroke="black" strokeWidth="2"/>
        <path d="M50 15V45H55V15H50Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M35 40H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M35 50H60" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M35 60H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle7 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 25H25C22.2386 25 20 27.2386 20 30V70C20 72.7614 22.2386 75 25 75H80C82.7614 75 85 72.7614 85 70V30C85 27.2386 82.7614 25 80 25Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M35 20C35 17.2386 37.2386 15 40 15H60C62.7614 15 65 17.2386 65 20V25H35V20Z" stroke="black" strokeWidth="2"/>
        <path d="M40 40C42.7614 40 45 37.7614 45 35C45 32.2386 42.7614 30 40 30" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M60 40C57.2386 40 55 37.7614 55 35C55 32.2386 57.2386 30 60 30" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M45 35H55" stroke="black" strokeWidth="2"/>
    </svg>
);

export const BookDoodle8 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 15H45V85H35C32.2386 85 30 82.7614 30 80V20C30 17.2386 32.2386 15 35 15Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M45 15H65C67.7614 15 70 17.2386 70 20V80C70 82.7614 67.7614 85 65 85H45V15Z" fill="#FF8F00" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M50 25H60" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 70H60" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle9 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 75L50 85L80 75V25L50 15L20 25V75Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M50 15V85" stroke="black" strokeWidth="2"/>
        <path d="M28 35H45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 45H42" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 55H45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 30H72" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 40H68" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 50H72" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 60H68" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle10 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78 20V80H33C30.2386 80 28 77.7614 28 75V25C28 22.2386 30.2386 20 33 20H78Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M55 12V35" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M52 35H58" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M52 38C52 41.3137 55 44 55 44C55 44 58 41.3137 58 38" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 44V48" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const BookDoodle11 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 85L20 80V20L25 15H75L80 20V80L75 85H25Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M25 15V85" stroke="black" strokeWidth="2"/>
        <path d="M35 25H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M35 75H65" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M25 20H75" stroke="black" strokeWidth="1.5" />
        <path d="M25 25H75" stroke="black" strokeWidth="1.5" />
        <path d="M25 75H75" stroke="black" strokeWidth="1.5" />
        <path d="M25 80H75" stroke="black" strokeWidth="1.5" />
    </svg>
);

export const BookDoodle12 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35L50 20L80 35L50 50L20 35Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 35V65L50 80V50" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M80 35V65L50 80" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M30 40H45" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M55 40H70" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);