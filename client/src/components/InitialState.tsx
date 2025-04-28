import { FileText } from "lucide-react";

export default function InitialState() {
  return (
    <div className="text-center py-10 px-4">
      <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No student selected</h3>
      <p className="text-gray-500">Search for a student by name to view their results</p>
    </div>
  );
}
