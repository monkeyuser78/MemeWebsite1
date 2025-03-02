
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
            <div className="mb-12 text-center">
              <motion.h2 
                className="text-4xl font-bold mb-3 text-gradient inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Top Memes of the Month
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-4"
              />
              <motion.p 
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                The most upvoted content from r/memes this month
              </motion.p>
            </div>
            
            <MemeGrid 
              memes={memes} 
              isLoading={isLoading} 
              error={error} 
            />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="mt-20 mb-8 text-center">
        <div className="glass-card py-5 px-6 inline-block rounded-full">
          <p className="text-sm text-muted-foreground">
            Data sourced from Reddit's r/memes subreddit • Not affiliated with Reddit Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
