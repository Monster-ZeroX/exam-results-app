import { Student } from "@/types";
import { useEffect, useRef } from "react";

interface SuggestionsListProps {
  suggestions: Student[];
  onSelect: (student: Student) => void;
  noResults: boolean;
}

export default function SuggestionsList({
  suggestions,
  onSelect,
  noResults,
}: SuggestionsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      const options = Array.from(
        containerRef.current.querySelectorAll('button[role="option"]')
      ) as HTMLButtonElement[];
      
      if (options.length === 0) return;
      
      const focusedOption = document.activeElement as HTMLButtonElement;
      const focusedIndex = options.indexOf(focusedOption);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (focusedIndex < 0 || focusedIndex === options.length - 1) {
            options[0].focus();
          } else {
            options[focusedIndex + 1].focus();
          }
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          if (focusedIndex <= 0) {
            options[options.length - 1].focus();
          } else {
            options[focusedIndex - 1].focus();
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [suggestions]);

  if (suggestions.length === 0 && !noResults) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 divide-y divide-gray-100 max-h-80 overflow-y-auto"
      role="listbox"
      aria-label="Search suggestions"
    >
      {noResults ? (
        <div className="px-4 py-6 text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">No students found</p>
          <p className="mt-1">Try adjusting your search criteria</p>
        </div>
      ) : (
        suggestions.map((student) => (
          <button
            key={student.index_number}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition"
            onClick={() => onSelect(student)}
            role="option"
          >
            <div className="font-medium">{student.name}</div>
            <div className="text-sm text-gray-600">Index: {student.index_number}</div>
          </button>
        ))
      )}
    </div>
  );
}
