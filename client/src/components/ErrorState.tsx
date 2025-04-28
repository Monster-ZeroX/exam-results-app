import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm p-6 text-center">
      <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-3" />
      <h3 className="text-lg font-medium text-red-800 mb-1">Error loading data</h3>
      <p className="text-red-600">{message}</p>
      <Button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      >
        Try Again
      </Button>
    </div>
  );
}
