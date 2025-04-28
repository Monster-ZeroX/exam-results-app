import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ value, onChange, isLoading }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        id="search"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-6 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition pl-4 pr-10"
        placeholder="Enter student name..."
        aria-label="Search by student name"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}
