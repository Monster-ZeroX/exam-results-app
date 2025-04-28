import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import StudentDetail from "@/components/StudentDetail";
import InitialState from "@/components/InitialState";
import ErrorState from "@/components/ErrorState";
import { Student } from "@/types";
import { useStudentSearch } from "@/hooks/useStudentSearch";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const {
    students: suggestions,
    isLoading,
    isError,
    error,
    refetch
  } = useStudentSearch(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSelectedStudent(null);
    }
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchQuery("");
  };

  const handleRetry = () => {
    refetch();
  };

  const showSuggestions = searchQuery.length >= 2 && !selectedStudent;
  const showNoResults = searchQuery.length >= 2 && suggestions.length === 0 && !isLoading && !isError;
  const showInitialState = !selectedStudent && !isError;
  const showStudentDetail = !!selectedStudent && !isError;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Search Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Find Student Results</h2>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Search by name to find detailed student information and examination results
        </p>
      </div>
      
      {/* Search and Suggestions */}
      <div className="relative mb-8">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          isLoading={isLoading}
        />
        
        {showSuggestions && (
          <SuggestionsList
            suggestions={suggestions}
            onSelect={handleSelectStudent}
            noResults={showNoResults}
          />
        )}
      </div>
      
      {/* Student Detail or Initial/Error State */}
      {showStudentDetail && <StudentDetail student={selectedStudent} />}
      {showInitialState && !showStudentDetail && <InitialState />}
      {isError && (
        <ErrorState
          message={error?.message || "Failed to load data. Please try again."}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
