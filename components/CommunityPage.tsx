import React, { useState } from 'react';
import { Post, Comment, EMOTION_COLORS } from '../types';
import { UserIcon } from './icons/Icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, userName: string, text: string) => void;
  onViewDetails: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment, onViewDetails }) => {
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && userName.trim()) {
      onAddComment(post.id, userName, commentText);
      setCommentText('');
      setUserName('');
      setIsCommenting(false);
    }
  };
  
  const duration = post.emotionTimeline[post.emotionTimeline.length - 1]?.time || 1;
  const ticks = Array.from({ length: 5 }, (_, i) => Math.round((i + 1) * duration / 5));

  const emotions = Object.keys(EMOTION_COLORS);

  const maxEmotionValue = post.emotionTimeline.reduce((max, point) => {
      const pointMax = emotions.reduce((currentPointMax, emotion) => Math.max(currentPointMax, point[emotion]), 0);
      return Math.max(max, pointMax);
  }, 0);

  const yAxisDomainMax = maxEmotionValue > 0 ? Math.min(1, Math.ceil(maxEmotionValue * 10) / 10) : 0.1;
  
  let peakValue = 0;
  let peakEmotion = '';
  let peakTime = 0;

  if (post.emotionTimeline.length > 0) {
      post.emotionTimeline.forEach(point => {
          emotions.forEach(emotion => {
              if (point[emotion] > peakValue) {
                  peakValue = point[emotion];
                  peakEmotion = emotion;
                  peakTime = point.time;
              }
          });
      });
  }


  return (
    <div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        onClick={() => onViewDetails(post)}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <UserIcon className="text-black" />
          </div>
          <div>
            <p className="font-bold text-gray-800">{post.studentName}</p>
            <p className="text-sm text-gray-600">{post.bookName} {post.chapter && `| Ch. ${post.chapter}`}</p>
          </div>
        </div>
        
        <div className="h-64 -mx-6 my-4 bg-gray-50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={post.emotionTimeline} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="time" unit="s" fontSize={12} ticks={ticks} />
              <YAxis domain={[0, yAxisDomainMax]} fontSize={12} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
              {peakEmotion && (
                // Fix: Removed invalid `isFront` prop from ReferenceDot. Reference dots are always rendered on top.
                <ReferenceDot x={peakTime} y={peakValue} r={5} fill={EMOTION_COLORS[peakEmotion]} stroke="white" strokeWidth={1} />
              )}
              {Object.keys(EMOTION_COLORS).map(emotion => (
                <Line key={emotion} type="monotone" dataKey={emotion} stroke={EMOTION_COLORS[emotion]} strokeWidth={2.5} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6" onClick={(e) => e.stopPropagation()}>
          <h4 className="font-semibold text-gray-800 mb-2">Comments ({post.comments.length})</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {post.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold text-sm text-black">{comment.user}</p>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
             {post.comments.length === 0 && <p className="text-sm text-gray-400">No comments yet.</p>}
          </div>

          <div className="mt-4">
            {isCommenting ? (
              <form onSubmit={handleCommentSubmit} className="space-y-2 animate-fade-in">
                 <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black"
                  required
                />
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black"
                  rows={2}
                  required
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsCommenting(false)} className="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="text-sm px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800">Post</button>
                </div>
              </form>
            ) : (
              <button onClick={() => setIsCommenting(true)} className="text-sm text-black font-semibold hover:underline">
                Add Comment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommunityPageProps {
  posts: Post[];
  onAddComment: (postId: string, userName: string, text: string) => void;
  onViewPostDetails: (post: Post) => void;
  onNewAnalysis: () => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ posts, onAddComment, onViewPostDetails, onNewAnalysis }) => {
  return (
    <main className="bg-white/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Discussion Board</h1>
          <button
              onClick={onNewAnalysis}
              className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-800 transform hover:-translate-y-px transition-all duration-200"
            >
              New Analysis
            </button>
        </header>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onAddComment={onAddComment} onViewDetails={onViewPostDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">The community board is empty.</h2>
              <p className="text-gray-600 mt-2">Be the first to share an analysis!</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default CommunityPage;