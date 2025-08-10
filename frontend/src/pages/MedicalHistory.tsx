
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface HistoryEntry {
  id: string;
  date: string;
  diagnosisDate: string;
  result: {
    isColoboma: boolean;
    confidence: number;
  };
}

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(userString);
    setUser(userData);

    // Get history from localStorage
    const historyString = localStorage.getItem("medicalHistory");
    if (historyString) {
      setHistory(JSON.parse(historyString));
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Medical History</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Patient: {user.name}
            </p>
          </div>
          <Button onClick={() => navigate("/upload")}>New Diagnosis</Button>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis Date</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {new Date(entry.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{entry.diagnosisDate}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.result.isColoboma
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {entry.result.isColoboma
                            ? "Coloboma Detected"
                            : "No Coloboma Detected"}
                        </span>
                      </TableCell>
                      <TableCell>{entry.result.confidence}%</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/results?id=${entry.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                No medical history found. Upload an image for diagnosis.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate("/upload")}
              >
                Start Diagnosis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistory;
