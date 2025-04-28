import { useQuery } from "@tanstack/react-query";
import { Student } from "@/types";

export const useStudentSearch = (query: string) => {
  return useQuery<Student[]>({
    queryKey: ['/api/students/search', query],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return [];
      }
      const res = await fetch(`/api/students/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || res.statusText);
      }
      return res.json();
    },
    enabled: query.length >= 2,
  });
};
