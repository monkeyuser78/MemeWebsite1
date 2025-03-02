
import React from 'react';
import { RedditMeme } from '@/services/redditService';
import MemeCard from './MemeCard';
import Loader from './Loader';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface MemeGridProps {
  memes: RedditMeme[];
  isLoading: boolean;
  error: Error | null;
}

const MemeGrid = ({ memes, isLoading, error }: MemeGridProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center">
        <Loader size="lg" message="Fetching the freshest memes..." />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="min-h-[40vh] flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8 rounded-2xl max-w-md shadow-lg border-2 border-destructive/20">
          <div className="mb-4 bg-destructive/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <AlertCircle className="text-destructive w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-destructive">Error Loading Memes</h3>
          <p className="text-muted-foreground mb-6">
            {error.message || "Unable to fetch memes from Reddit. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  if (memes.length === 0) {
    return (
      <motion.div 
        className="min-h-[40vh] flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8 rounded-2xl max-w-md shadow-lg">
          <div className="mb-4 bg-muted p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <AlertCircle className="text-muted-foreground w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Memes Found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any memes. This might be due to API limitations or filter settings.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {memes.map((meme, index) => (
        <MemeCard key={meme.id} meme={meme} index={index} />
      ))}
    </div>
  );
};

export default MemeGrid;
