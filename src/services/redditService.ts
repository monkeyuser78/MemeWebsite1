
export interface RedditMeme {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  upvotes: number;
  imageUrl: string;
  permalink: string;
  created: number;
  commentCount: number;
}

export interface SubredditOption {
  label: string;
  value: string;
  description: string;
  color: string;
}

export const popularSubreddits: SubredditOption[] = [
  { label: "Memes", value: "memes", description: "The original and classic memes", color: "from-blue-500 to-indigo-600" },
  { label: "Dank Memes", value: "dankmemes", description: "Top tier dank memes", color: "from-green-500 to-emerald-600" },
  { label: "Wholesome Memes", value: "wholesomememes", description: "Memes that make you smile", color: "from-yellow-500 to-amber-600" },
  { label: "Programmer Humor", value: "ProgrammerHumor", description: "Coding jokes and memes", color: "from-purple-500 to-violet-600" },
  { label: "Me IRL", value: "me_irl", description: "Selfies of the soul", color: "from-red-500 to-rose-600" },
  { label: "Advice Animals", value: "AdviceAnimals", description: "Classic meme formats", color: "from-orange-500 to-amber-600" },
  { label: "History Memes", value: "HistoryMemes", description: "History-themed humor", color: "from-teal-500 to-cyan-600" },
];

export const timePeriods = [
  { label: "Past Day", value: "day" },
  { label: "Past Week", value: "week" },
  { label: "Past Month", value: "month" },
  { label: "Past Year", value: "year" },
  { label: "All Time", value: "all" },
];

export const fetchMemes = async (
  subreddit: string = "memes", 
  limit: number = 15,
  timePeriod: string = "month"
): Promise<RedditMeme[]> => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/top/.json?t=${timePeriod}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch memes: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the Reddit API response to our format
    const memes: RedditMeme[] = data.data.children
      .filter((post: any) => {
        // Filter out posts without images or that are deleted
        const url = post.data.url || '';
        return (
          !post.data.removed_by_category &&
          !post.data.removed &&
          (url.endsWith('.jpg') || 
           url.endsWith('.jpeg') || 
           url.endsWith('.png') || 
           url.endsWith('.gif') ||
           url.includes('imgur.com') ||
           url.includes('i.redd.it'))
        );
      })
      .map((post: any) => ({
        id: post.data.id,
        title: post.data.title,
        subreddit: post.data.subreddit,
        author: post.data.author,
        upvotes: post.data.ups,
        imageUrl: post.data.url,
        permalink: `https://reddit.com${post.data.permalink}`,
        created: post.data.created_utc,
        commentCount: post.data.num_comments
      }));

    console.log(`Fetched ${memes.length} memes from r/${subreddit} successfully`);
    return memes;
  } catch (error) {
    console.error(`Error fetching memes from r/${subreddit}:`, error);
    throw error;
  }
};

// Format large numbers (e.g., 15000 -> 15k)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  
  return `${Math.floor(diff / 31536000)} years ago`;
};
