"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BriefcaseIcon, LineChart, TrendingUp, TrendingDown, Brain } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-400" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-none">
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold">Market Outlook</CardTitle>
            <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold">Industry Growth</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
            <Progress value={insights.growthRate} className="mt-2 h-2 rounded-full bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold">Demand Level</CardTitle>
            <BriefcaseIcon className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`}
            />
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold">Top Skills</CardTitle>
            <Brain className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>Minimum, median, and maximum salaries (in thousands)</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border rounded-lg p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        {payload.map((item) => (
                          <p key={item.name} className="text-sm">
                            {item.name}: ${item.value}K
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="min" fill="#60A5FA" name="Min Salary (K)" />
              <Bar dataKey="median" fill="#3B82F6" name="Median Salary (K)" />
              <Bar dataKey="max" fill="#1E40AF" name="Max Salary (K)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Industry Trends & Recommended Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>Current trends shaping the industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-blue-500 text-blue-600"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
