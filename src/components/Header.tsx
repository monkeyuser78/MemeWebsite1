
import React from 'react';
import { ArrowDownToLine, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="py-6 px-6 sm:px-8 glass-card rounded-2xl mb-8 mx-auto max-w-7xl w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="mr-3 bg-primary/10 p-2 rounded-xl">
            <ArrowDownToLine className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Meme Fetcher Pro</h1>
            <p className="text-sm text-muted-foreground">Top memes from r/memes</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-button px-4 py-2 rounded-xl text-sm font-medium hover:text-primary flex items-center"
          >
            <Github className="w-4 h-4 mr-2" />
            Source Code
          </a>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Refresh Memes
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
