
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpFromLine, MessageSquare, ExternalLink } from 'lucide-react';
import { formatNumber, formatRelativeTime } from '@/services/redditService';
import { cn } from "@/lib/utils";
import { RedditMeme } from '@/services/redditService';

interface MemeCardProps {
  meme: RedditMeme;
  index: number;
}

const MemeCard = ({ meme, index }: MemeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <motion.div 
        className="glass-card glass-card-hover h-full rounded-2xl overflow-hidden flex flex-col shadow-md"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="p-5 border-b border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
            <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-br from-primary/80 to-blue-500/80 mr-2"></span>
            Posted by u/{meme.author} • {formatRelativeTime(meme.created)}
          </p>
          <h3 className="font-medium line-clamp-2 h-12 text-lg">{meme.title}</h3>
        </div>
        
        <div className="relative flex-grow">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          
          {!imageError ? (
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                !imageLoaded ? "opacity-0 blur-md" : "opacity-100 blur-0"
              )}
              style={{ aspectRatio: "16/9", objectFit: "cover" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/30 p-6 text-center text-muted-foreground">
              <span className="bg-secondary p-3 rounded-lg">Image unavailable</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex items-center justify-between mt-auto bg-gradient-to-r from-background/50 to-background/70 backdrop-blur-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm font-medium">
              <ArrowUpFromLine className="w-4 h-4 mr-2 text-orange-500" />
              <span>{formatNumber(meme.upvotes)}</span>
            </div>
            
            <div className="flex items-center text-sm font-medium">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
              <span>{formatNumber(meme.commentCount)}</span>
            </div>
          </div>
          
          <a
            href={meme.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full text-primary transition-colors"
          >
            <span className="mr-1">View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemeCard;
