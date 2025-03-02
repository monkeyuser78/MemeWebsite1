# MemeWebsite – Top Memes of the Month

## Overview
MemeWebsite is an automated website that displays the top memes of the month by fetching data from Reddit's r/memes. This project demonstrates skills in API integration, backend scheduling, data storage, and responsive frontend development.

## Key Features
- **Automated Content Fetching:**  
  Retrieves the top posts from Reddit's r/memes for the past month using the Reddit API.
- **Backend Service:**  
  A Node.js/Express server manages API requests, processes meme data, and serves it through RESTful endpoints.
- **Frontend Display:**  
  A React-based interface displays meme cards, each showing the title, image, upvotes, and a link to the original Reddit post.
- **Data Storage:**  
  Meme data is stored in a JSON file to maintain persistence between updates (with an option to integrate a database later).
- **Scheduled Updates:**  
  A cron job (using node-cron) automatically fetches and updates the meme list at regular intervals (midnight on the first day of every month).

## Tech Stack
- **Backend:** Node.js, Express, axios, node-cron
- **Frontend:** React, CSS
- **Data Storage:** JSON file (optional: integrate MongoDB, SQLite, etc.)
- **API:** Reddit API for fetching memes

## Repository Structure
