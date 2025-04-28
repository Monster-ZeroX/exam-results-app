import { Student } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface StudentDetailProps {
  student: Student;
}

export default function StudentDetail({ student }: StudentDetailProps) {
  // Function to determine badge color based on grade
  const getGradeBadgeClasses = (grade: string) => {
    switch (grade) {
      case 'A':
        return "bg-green-100 text-green-800";
      case 'B':
        return "bg-green-100 text-green-800";
      case 'C':
        return "bg-yellow-100 text-yellow-800";
      case 'S':
        return "bg-blue-100 text-blue-800";
      case 'F':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
        <p className="text-gray-600 text-sm mt-1">Index Number: {student.index_number}</p>
      </div>
      
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">NIC Number</div>
            <div className="font-medium">{student.nic_number}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">Z-Score</div>
            <div className="font-medium">{student.z_score || '-'}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">District Rank</div>
            <div className="font-medium">{student.district_rank || '-'}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">Island Rank</div>
            <div className="font-medium">{student.island_rank || '-'}</div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Subject Results</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {student.subjects && Object.entries(student.subjects as Record<string, string>).map(([subject, grade]) => (
                <tr key={subject}>
                  <td className="px-4 py-3 text-sm">{subject}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge variant="outline" className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeBadgeClasses(grade)}`}>
                      {grade}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
