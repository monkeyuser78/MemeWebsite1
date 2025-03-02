
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { popularSubreddits, SubredditOption } from "@/services/redditService";

interface SubredditSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SubredditSelector = ({ value, onChange }: SubredditSelectorProps) => {
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full glass-button">
          <SelectValue placeholder="Select a subreddit" />
        </SelectTrigger>
        <SelectContent>
          {popularSubreddits.map((subreddit) => (
            <SelectItem 
              key={subreddit.value} 
              value={subreddit.value}
              className="flex items-start cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium">r/{subreddit.value}</span>
                <span className="text-xs text-muted-foreground">{subreddit.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubredditSelector;
