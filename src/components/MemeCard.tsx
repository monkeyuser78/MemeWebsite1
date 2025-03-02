
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
        className="glass-card glass-card-hover h-full rounded-2xl overflow-hidden flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="p-4 border-b border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Posted by u/{meme.author} • {formatRelativeTime(meme.created)}
          </p>
          <h3 className="font-medium line-clamp-2 h-12">{meme.title}</h3>
        </div>
        
        <div className="relative flex-grow">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          
          {!imageError ? (
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                !imageLoaded && "opacity-0",
                imageLoaded && "opacity-100"
              )}
              style={{ aspectRatio: "16/9", objectFit: "cover" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/30 p-4 text-center text-muted-foreground">
              Unable to load image
            </div>
          )}
        </div>
        
        <div className="p-4 flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <ArrowUpFromLine className="w-4 h-4 mr-1 text-orange-500" />
              <span>{formatNumber(meme.upvotes)}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <MessageSquare className="w-4 h-4 mr-1 text-blue-500" />
              <span>{formatNumber(meme.commentCount)}</span>
            </div>
          </div>
          
          <a
            href={meme.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center text-muted-foreground hover:text-primary transition-colors"
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
