"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Title */}
      <h1 className="flex items-center gap-2 text-3xl md:text-4xl gradient-title font-bold">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-extrabold text-blue-600">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="w-full h-4 rounded-lg bg-blue-100 dark:bg-blue-900"
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold">Improvement Tip:</p>
            <p className="text-gray-700 dark:text-gray-300">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium">Your answer:</span> {q.userAnswer}
                </p>
                {!q.isCorrect && (
                  <p>
                    <span className="font-medium">Correct answer:</span> {q.answer}
                  </p>
                )}
              </div>
              <div className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md border-l-2 border-gray-300 dark:border-gray-700">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
