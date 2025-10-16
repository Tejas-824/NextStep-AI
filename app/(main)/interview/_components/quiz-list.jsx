"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl font-bold">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Track and review your quiz performance over time
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="self-start md:self-auto"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.length ? (
              assessments.map((assessment, i) => (
                <Card
                  key={assessment.id}
                  className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors shadow-sm hover:shadow-md rounded-lg"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <CardHeader>
                    <CardTitle className="gradient-title text-2xl font-semibold">
                      Quiz {i + 1}
                    </CardTitle>
                    <CardDescription className="flex justify-between w-full text-gray-700 dark:text-gray-300 text-sm">
                      <div>
                        Score:{" "}
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {assessment.quizScore.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        {format(
                          new Date(assessment.createdAt),
                          "MMMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  {assessment.improvementTip && (
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {assessment.improvementTip}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                You haven’t completed any quizzes yet. Start one to track your
                learning progress!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedQuiz ? `Quiz ${assessments.indexOf(selectedQuiz) + 1} Details` : ""}
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
