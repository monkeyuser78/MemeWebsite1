
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

export const fetchMemes = async (limit: number = 10): Promise<RedditMeme[]> => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/memes/top/.json?t=month&limit=${limit}`
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

    console.log(`Fetched ${memes.length} memes successfully`);
    return memes;
  } catch (error) {
    console.error("Error fetching memes:", error);
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
