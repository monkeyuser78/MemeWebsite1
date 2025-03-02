
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { timePeriods } from "@/services/redditService";

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full glass-button">
          <SelectValue placeholder="Time period" />
        </SelectTrigger>
        <SelectContent>
          {timePeriods.map((period) => (
            <SelectItem 
              key={period.value} 
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelector;
