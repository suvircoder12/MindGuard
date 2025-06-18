"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Target, Zap, MessageCircle } from "lucide-react"

export function AICoachTab() {
  const [insights] = useState([
    {
      id: 1,
      type: "warning",
      title: "Peak Usage Pattern Detected",
      description: "You tend to use social media most between 8-10 PM, which may affect your sleep quality.",
      recommendation: "Consider setting a focus session during this time or enabling Do Not Disturb mode.",
      impact: "high",
      category: "Sleep Health",
    },
    {
      id: 2,
      type: "success",
      title: "Excellent Morning Routine",
      description:
        "Your morning routine has improved by 40% this week. You're checking your phone 30 minutes later than usual.",
      recommendation: "Keep this momentum going! Try extending your phone-free morning time by another 15 minutes.",
      impact: "medium",
      category: "Digital Wellness",
    },
    {
      id: 3,
      type: "info",
      title: "Focus Session Optimization",
      description: "Your productivity peaks during 25-minute focus sessions rather than longer periods.",
      recommendation: "Stick to 25-minute Pomodoro sessions for maximum efficiency.",
      impact: "medium",
      category: "Productivity",
    },
    {
      id: 4,
      type: "warning",
      title: "Weekend Usage Spike",
      description: "Your weekend screen time is 60% higher than weekdays, particularly on Sunday evenings.",
      recommendation: "Plan engaging offline activities for Sunday evenings to reduce mindless scrolling.",
      impact: "medium",
      category: "Balance",
    },
  ])

  const [personalizedTips] = useState([
    "Based on your usage patterns, you're most vulnerable to distractions at 3 PM. Schedule important tasks before this time.",
    "Your focus sessions are 23% more effective when you take a 5-minute walk beforehand.",
    "You've successfully reduced Instagram usage by 35% this month. Consider applying the same strategies to YouTube.",
    "Your sleep quality improves by 18% when you stop using devices 90 minutes before bed instead of 60 minutes.",
  ])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      default:
        return <Brain className="h-5 w-5 text-purple-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-orange-200 bg-orange-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-purple-200 bg-purple-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Coach Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 bg-indigo-600">
              <AvatarFallback className="text-white text-xl">
                <Brain className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl text-indigo-900">AI Wellness Coach</CardTitle>
              <CardDescription className="text-indigo-700">
                Your personal digital wellness assistant powered by advanced behavioral analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">94%</div>
              <div className="text-sm text-indigo-700">Prediction Accuracy</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">127</div>
              <div className="text-sm text-indigo-700">Insights Generated</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">23h</div>
              <div className="text-sm text-indigo-700">Time Saved This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Current Insights
          </CardTitle>
          <CardDescription>AI-powered analysis of your digital behavior patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {insight.category}
                      </Badge>
                      <Badge variant={insight.impact === "high" ? "destructive" : "secondary"} className="text-xs">
                        {insight.impact} impact
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                  <div className="p-3 bg-white/70 rounded border-l-4 border-indigo-400">
                    <p className="text-sm font-medium text-indigo-900">💡 Recommendation:</p>
                    <p className="text-sm text-indigo-800 mt-1">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Behavioral Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Behavioral Patterns
          </CardTitle>
          <CardDescription>AI-detected patterns in your digital habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Positive Patterns</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Consistent Sleep Schedule</p>
                    <p className="text-sm text-green-700">95% adherence to bedtime routine</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Morning Phone Delay</p>
                    <p className="text-sm text-green-700">Average 45min delay after waking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Focus Session Consistency</p>
                    <p className="text-sm text-green-700">Daily average: 4.2 sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-orange-800">Areas for Improvement</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Evening Usage Spike</p>
                    <p className="text-sm text-orange-700">Peak usage: 8-10 PM daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Weekend Overuse</p>
                    <p className="text-sm text-orange-700">60% higher than weekdays</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Stress-Triggered Usage</p>
                    <p className="text-sm text-orange-700">Correlates with high stress days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Tips
          </CardTitle>
          <CardDescription>Custom recommendations based on your unique usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {personalizedTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="p-1 bg-indigo-600 rounded-full mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <p className="text-sm text-indigo-900">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Score Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Wellness Score Prediction
          </CardTitle>
          <CardDescription>AI forecast of your digital wellness trajectory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Score</span>
              <span className="text-2xl font-bold text-green-600">85%</span>
            </div>
            <Progress value={85} className="h-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Predicted Score (Next Week)</span>
              <span className="text-2xl font-bold text-blue-600">89%</span>
            </div>
            <Progress value={89} className="h-3" />

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Positive Trajectory</span>
              </div>
              <p className="text-sm text-blue-800">
                Based on your recent improvements in morning routine and focus sessions, your wellness score is
                predicted to increase by 4% next week. Keep up the great work!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Ask Your AI Coach
          </CardTitle>
          <CardDescription>Get personalized advice and answers to your digital wellness questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">Recent conversations:</p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">You:</span> "Why do I use my phone more on Sundays?"
                </div>
                <div className="text-sm">
                  <span className="font-medium text-indigo-600">AI Coach:</span> "Sunday evening usage spikes are common
                  due to 'Sunday scaries' - anxiety about the upcoming week. Try planning enjoyable offline activities
                  for Sunday evenings."
                </div>
              </div>
            </div>
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start New Conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
