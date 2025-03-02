
import React from 'react';
import { ArrowDownToLine, Github, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import SubredditSelector from './SubredditSelector';
import TimeSelector from './TimeSelector';

interface HeaderProps {
  subreddit: string;
  onSubredditChange: (value: string) => void;
  timePeriod: string;
  onTimePeriodChange: (value: string) => void;
  onRefresh: () => void;
}

const Header = ({ subreddit, onSubredditChange, timePeriod, onTimePeriodChange, onRefresh }: HeaderProps) => {
  return (
    <motion.header 
      className="py-6 px-6 sm:px-8 glass-card rounded-2xl mb-8 mx-auto max-w-7xl w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center">
          <div className="mr-3 bg-gradient-to-br from-primary to-blue-600 p-3 rounded-xl shadow-md">
            <ArrowDownToLine className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Meme Fetcher Pro</h1>
            <p className="text-sm text-muted-foreground">Top posts from Reddit</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 sm:flex-nowrap items-center">
          <SubredditSelector value={subreddit} onChange={onSubredditChange} />
          <TimeSelector value={timePeriod} onChange={onTimePeriodChange} />
          
          <div className="flex gap-2">
            <ThemeToggle />
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button p-2.5 rounded-xl text-sm font-medium hover:text-primary flex items-center justify-center transition-all hover:shadow-md"
              aria-label="View source code"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <button 
              onClick={onRefresh}
              className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:opacity-90 p-2.5 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              aria-label="Refresh memes"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
