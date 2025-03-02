
import React from 'react';
import { ArrowDownToLine, Github, RefreshCw } from 'lucide-react';
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
          <div className="mr-3 bg-gradient-to-br from-primary to-blue-600 p-3 rounded-xl shadow-md">
            <ArrowDownToLine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Meme Fetcher Pro</h1>
            <p className="text-sm text-muted-foreground">Top memes from r/memes</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-button px-4 py-2 rounded-xl text-sm font-medium hover:text-primary flex items-center transition-all hover:shadow-md"
          >
            <Github className="w-4 h-4 mr-2" />
            Source Code
          </a>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Memes
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
