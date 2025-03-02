
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import MemeGrid from '@/components/MemeGrid';
import { fetchMemes, RedditMeme, popularSubreddits } from '@/services/redditService';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [memes, setMemes] = useState<RedditMeme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // New state for subreddit and time period selection
  const [selectedSubreddit, setSelectedSubreddit] = useState("memes");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("month");

  const fetchMemeData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the selected subreddit and time period
      const fetchedMemes = await fetchMemes(selectedSubreddit, 25, selectedTimePeriod);
      setMemes(fetchedMemes);
      
      const timePeriodText = selectedTimePeriod === "all" ? "all time" : `the past ${selectedTimePeriod}`;
      
      toast({
        title: "Memes loaded successfully",
        description: `Showing top memes from r/${selectedSubreddit} for ${timePeriodText}`,
        duration: 3000,
      });
    } catch (err) {
      console.error('Failed to fetch memes:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      
      toast({
        variant: "destructive",
        title: "Error loading memes",
        description: `Could not fetch content from r/${selectedSubreddit}. Please try again later.`,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedSubreddit, selectedTimePeriod]);

  useEffect(() => {
    fetchMemeData();
  }, [fetchMemeData]);

  const handleSubredditChange = (value: string) => {
    setSelectedSubreddit(value);
  };

  const handleTimePeriodChange = (value: string) => {
    setSelectedTimePeriod(value);
  };

  const handleRefresh = () => {
    fetchMemeData();
  };

  // Find the current subreddit details
  const currentSubreddit = popularSubreddits.find(
    (sub) => sub.value === selectedSubreddit
  ) || popularSubreddits[0];

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 max-w-7xl mx-auto transition-colors duration-300">
      <Header 
        subreddit={selectedSubreddit}
        onSubredditChange={handleSubredditChange}
        timePeriod={selectedTimePeriod}
        onTimePeriodChange={handleTimePeriodChange}
        onRefresh={handleRefresh}
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSubreddit}-${selectedTimePeriod}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-12 text-center overflow-hidden">
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${currentSubreddit.color} bg-clip-text text-transparent truncate`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Top Posts from r/{selectedSubreddit}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`w-24 h-1 bg-gradient-to-r ${currentSubreddit.color} mx-auto rounded-full mb-4`}
              />
              <motion.p 
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {selectedTimePeriod === "all" 
                  ? "Best content of all time" 
                  : `Most upvoted content from the past ${selectedTimePeriod}`}
              </motion.p>
            </div>
            
            <MemeGrid 
              memes={memes} 
              isLoading={isLoading} 
              error={error} 
              subreddit={selectedSubreddit}
              timePeriod={selectedTimePeriod}
              onRetry={fetchMemeData}
            />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="mt-20 mb-8 text-center transition-all duration-300">
        <div className="glass-card py-5 px-6 inline-block rounded-full">
          <p className="text-sm text-muted-foreground">
            Data sourced from Reddit • Not affiliated with Reddit Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
