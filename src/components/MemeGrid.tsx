
import React from 'react';
import { RedditMeme } from '@/services/redditService';
import MemeCard from './MemeCard';
import Loader from './Loader';

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
      <div className="min-h-[40vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="glass-card p-8 rounded-2xl max-w-md">
          <h3 className="text-xl font-semibold mb-2 text-destructive">Error Loading Memes</h3>
          <p className="text-muted-foreground mb-4">
            {error.message || "Unable to fetch memes from Reddit. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (memes.length === 0) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="glass-card p-8 rounded-2xl max-w-md">
          <h3 className="text-xl font-semibold mb-2">No Memes Found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any memes. This might be due to API limitations or filter settings.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memes.map((meme, index) => (
        <MemeCard key={meme.id} meme={meme} index={index} />
      ))}
    </div>
  );
};

export default MemeGrid;
