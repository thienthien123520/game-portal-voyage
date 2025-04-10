
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, Flag, Reply } from 'lucide-react';

interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  gameId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ gameId, comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        userName: 'Guest User',
        content: newComment,
        date: new Date().toLocaleDateString(),
        likes: 0,
        dislikes: 0
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      )
    );
  };

  const handleDislike = (commentId: string) => {
    setComments(
      comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, dislikes: comment.dislikes + 1 } 
          : comment
      )
    );
  };

  return (
    <div className="mt-8">
      <h3 className="section-title">Comments</h3>
      
      {/* Comment form */}
      <div className="mb-6 bg-gaming-card p-4 rounded-lg">
        <Textarea 
          placeholder="Share your thoughts about this game..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-gaming-bg border-gaming-primary/20 focus:border-gaming-primary mb-4"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="bg-gaming-primary hover:bg-gaming-secondary text-white"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gaming-muted">
            Be the first to comment on this game!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-gaming-card p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 border border-gaming-primary/20">
                  <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                  <AvatarFallback className="bg-gaming-primary/20 text-gaming-primary">
                    {comment.userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gaming-text">{comment.userName}</h4>
                      <p className="text-xs text-gaming-muted">{comment.date}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gaming-text">{comment.content}</p>
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center space-x-1 text-gaming-muted hover:text-gaming-primary transition-colors"
                    >
                      <ThumbsUp size={16} />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleDislike(comment.id)}
                      className="flex items-center space-x-1 text-gaming-muted hover:text-gaming-primary transition-colors"
                    >
                      <ThumbsDown size={16} />
                      <span>{comment.dislikes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gaming-muted hover:text-gaming-primary transition-colors">
                      <Reply size={16} />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gaming-muted hover:text-red-500 transition-colors ml-auto">
                      <Flag size={16} />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-12 space-y-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="bg-gaming-bg p-3 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8 border border-gaming-primary/20">
                          <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                          <AvatarFallback className="bg-gaming-primary/20 text-gaming-primary text-xs">
                            {reply.userName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gaming-text text-sm">{reply.userName}</h4>
                              <p className="text-xs text-gaming-muted">{reply.date}</p>
                            </div>
                          </div>
                          <p className="mt-2 text-gaming-text text-sm">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
