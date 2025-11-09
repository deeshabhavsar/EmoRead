import React, { useState, useCallback } from 'react';
import { Page, AnalysisResult, Post } from './types';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import CommunityPage from './components/CommunityPage';
import { BookDoodle1, BookDoodle2, BookDoodle3, BookDoodle4, BookDoodle5, BookDoodle6, BookDoodle7, BookDoodle8, BookDoodle9, BookDoodle10, BookDoodle11, BookDoodle12 } from './components/icons/Icons';

const DoodleBackground = () => {
  const doodles = [
    { Doodle: BookDoodle1, style: { top: '10vh', left: '5vw', transform: 'rotate(-15deg) scale(0.8)' } },
    { Doodle: BookDoodle2, style: { top: '5vh', right: '10vw', transform: 'rotate(20deg) scale(1)' } },
    { Doodle: BookDoodle3, style: { top: '30vh', left: '15vw', transform: 'rotate(5deg) scale(0.6)' } },
    { Doodle: BookDoodle1, style: { bottom: '15vh', right: '5vw', transform: 'rotate(-25deg) scale(0.9)' } },
    { Doodle: BookDoodle2, style: { bottom: '25vh', left: '8vw', transform: 'rotate(10deg) scale(0.7)' } },
    { Doodle: BookDoodle3, style: { top: '50vh', right: '15vw', transform: 'rotate(15deg) scale(0.5)' } },
    { Doodle: BookDoodle1, style: { top: '70vh', left: '20vw', transform: 'rotate(-5deg) scale(1.1)' } },
    { Doodle: BookDoodle2, style: { bottom: '5vh', left: '50vw', transform: 'rotate(30deg) scale(0.8)' } },
    { Doodle: BookDoodle4, style: { top: '15vh', right: '25vw', transform: 'rotate(-10deg) scale(0.7)' } },
    { Doodle: BookDoodle5, style: { bottom: '10vh', left: '30vw', transform: 'rotate(15deg) scale(0.9)' } },
    { Doodle: BookDoodle6, style: { top: '65vh', right: '8vw', transform: 'rotate(25deg) scale(0.6)' } },
    { Doodle: BookDoodle4, style: { bottom: '35vh', right: '20vw', transform: 'rotate(5deg) scale(1.0)' } },
    { Doodle: BookDoodle5, style: { top: '80vh', left: '5vw', transform: 'rotate(-20deg) scale(0.75)' } },
    { Doodle: BookDoodle6, style: { top: '40vh', left: '40vw', transform: 'rotate(0deg) scale(0.5)' } },
    { Doodle: BookDoodle7, style: { top: '2vh', left: '30vw', transform: 'rotate(10deg) scale(0.6)' } },
    { Doodle: BookDoodle8, style: { bottom: '2vh', right: '40vw', transform: 'rotate(-5deg) scale(0.8)' } },
    { Doodle: BookDoodle9, style: { top: '55vh', left: '2vw', transform: 'rotate(-25deg) scale(0.7)' } },
    { Doodle: BookDoodle7, style: { top: '85vh', right: '25vw', transform: 'rotate(15deg) scale(0.9)' } },
    { Doodle: BookDoodle8, style: { top: '10vh', left: '70vw', transform: 'rotate(20deg) scale(0.5)' } },
    { Doodle: BookDoodle9, style: { bottom: '45vh', left: '45vw', transform: 'rotate(0deg) scale(1.0)' } },
    { Doodle: BookDoodle1, style: { top: '35vh', right: '35vw', transform: 'rotate(25deg) scale(0.7)' } },
    { Doodle: BookDoodle4, style: { bottom: '5vh', right: '65vw', transform: 'rotate(-15deg) scale(0.9)' } },
    { Doodle: BookDoodle5, style: { top: '90vh', left: '50vw', transform: 'rotate(5deg) scale(0.6)' } },
    { Doodle: BookDoodle6, style: { top: '5vh', left: '55vw', transform: 'rotate(-10deg) scale(0.8)' } },
    { Doodle: BookDoodle10, style: { top: '20vh', left: '45vw', transform: 'rotate(-20deg) scale(0.8)' } },
    { Doodle: BookDoodle11, style: { bottom: '20vh', right: '30vw', transform: 'rotate(18deg) scale(0.7)' } },
    { Doodle: BookDoodle12, style: { top: '75vh', left: '35vw', transform: 'rotate(10deg) scale(0.9)' } },
    { Doodle: BookDoodle10, style: { top: '2vh', right: '2vw', transform: 'rotate(5deg) scale(0.6)' } },
    { Doodle: BookDoodle11, style: { bottom: '40vh', left: '18vw', transform: 'rotate(-12deg) scale(1.0)' } },
    { Doodle: BookDoodle12, style: { top: '50vh', right: '45vw', transform: 'rotate(30deg) scale(0.75)' } },
    { Doodle: BookDoodle7, style: { top: '25vh', right: '5vw', transform: 'rotate(-8deg) scale(0.65)' } },
    { Doodle: BookDoodle8, style: { bottom: '1vh', left: '15vw', transform: 'rotate(22deg) scale(0.7)' } },
    { Doodle: BookDoodle9, style: { top: '90vh', right: '10vw', transform: 'rotate(-18deg) scale(0.8)' } },
    { Doodle: BookDoodle10, style: { bottom: '30vh', left: '60vw', transform: 'rotate(15deg) scale(0.9)' } },
    { Doodle: BookDoodle11, style: { top: '1vh', left: '10vw', transform: 'rotate(-5deg) scale(0.8)' } },
    { Doodle: BookDoodle12, style: { top: '40vh', left: '80vw', transform: 'rotate(45deg) scale(0.9)' } },
    { Doodle: BookDoodle3, style: { bottom: '5vh', right: '50vw', transform: 'rotate(-30deg) scale(0.7)' } },
    { Doodle: BookDoodle2, style: { top: '85vh', left: '75vw', transform: 'rotate(12deg) scale(0.85)' } },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
      {doodles.map((d, i) => (
        <d.Doodle key={i} className="absolute" style={d.style} />
      ))}
    </div>
  );
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);

  const handleAnalysisComplete = useCallback((result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentPage('results');
  }, []);

  const handlePostToCommunity = useCallback(() => {
    if (analysisResult) {
      const newPost: Post = {
        ...analysisResult,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
        comments: [],
      };
      setCommunityPosts(prevPosts => [newPost, ...prevPosts]);
      setCurrentPage('community');
    }
  }, [analysisResult]);
  
  const handleNewAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setCurrentPage('landing');
  }, []);
  
  const handleViewPostDetails = useCallback((post: Post) => {
    setAnalysisResult(post);
    setCurrentPage('results');
  }, []);

  const handleBackToCommunity = useCallback(() => {
    setCurrentPage('community');
  }, []);

  const handleAddComment = useCallback((postId: string, userName: string, text: string) => {
    setCommunityPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? {
              ...post,
              comments: [
                ...post.comments,
                { user: userName, text, timestamp: new Date().toISOString() }
              ]
            }
          : post
      )
    );
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onAnalysisComplete={handleAnalysisComplete} />;
      case 'results':
        return analysisResult && (
          <ResultsPage
            result={analysisResult}
            onPostToCommunity={handlePostToCommunity}
            onBackToCommunity={handleBackToCommunity}
          />
        );
      case 'community':
        return (
           <CommunityPage
            posts={communityPosts}
            onAddComment={handleAddComment}
            onViewPostDetails={handleViewPostDetails}
            onNewAnalysis={handleNewAnalysis}
           />
        );
      default:
        return <LandingPage onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="relative min-h-screen text-gray-800">
      <DoodleBackground />
      <div className="relative z-10">
       {renderPage()}
      </div>
    </div>
  );
};

export default App;