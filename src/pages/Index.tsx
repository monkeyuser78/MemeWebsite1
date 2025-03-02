
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import MemeGrid from '@/components/MemeGrid';
import { fetchMemes, RedditMeme } from '@/services/redditService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [memes, setMemes] = useState<RedditMeme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getMemes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch more than we need to account for filtering
        const fetchedMemes = await fetchMemes(25);
        setMemes(fetchedMemes);
        
        toast({
          title: "Memes loaded successfully",
          description: `Showing ${fetchedMemes.length} top memes from r/memes`,
          duration: 3000,
        });
      } catch (err) {
        console.error('Failed to fetch memes:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        
        toast({
          variant: "destructive",
          title: "Error loading memes",
          description: "Could not fetch memes from Reddit. Please try again later.",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getMemes();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 max-w-7xl mx-auto">
      <Header />
      
      <main>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Top Memes of the Month</h2>
              <p className="text-muted-foreground">The most upvoted content from r/memes this month</p>
            </div>
            
            <MemeGrid 
              memes={memes} 
              isLoading={isLoading} 
              error={error} 
            />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="mt-16 mb-8 text-center text-sm text-muted-foreground">
        <p>Data sourced from Reddit's r/memes subreddit • Not affiliated with Reddit Inc.</p>
      </footer>
    </div>
  );
};

export default Index;
