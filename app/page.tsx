"use client"

import { useState, useEffect, createContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Clock,
  Target,
  Brain,
  Calendar,
  Heart,
  Settings,
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
  Moon,
  Sun,
} from "lucide-react"
import { AppControlTab } from "./components/app-control-tab"
import { FocusSessionTab } from "./components/focus-session-tab"
import { HabitsTab } from "./components/habits-tab"
import { HealthTab } from "./components/health-tab"
import { ProfileTab } from "./components/profile-tab"
import { AICoachTab } from "./components/ai-coach-tab"
import { InstallPrompt } from "./components/install-prompt"
import { QuickHabitWidget, FocusTimerWidget, AppStatusWidget, HealthMetricWidget } from "./components/widgets"

// Theme Context
const ThemeContext = createContext<{
  theme: string
  setTheme: (theme: string) => void
}>({
  theme: "light",
  setTheme: () => {},
})

export default function ScreenTimeApp() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dailyUsage, setDailyUsage] = useState(4.2) // hours
  const [weeklyGoal] = useState(28) // hours per week
  const [focusStreak, setFocusStreak] = useState(7)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("mindguard-theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("mindguard-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const weeklyUsage = dailyUsage * 7
  const goalProgress = (weeklyUsage / weeklyGoal) * 100

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-blue-50 to-indigo-100"
        } p-4`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-indigo-500" : "bg-indigo-600"}`}>
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>MindGuard</h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Your Digital Wellness Companion
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <div className="text-right">
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Today</p>
                <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6 pb-20">
            {/* Main content area */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Widgets Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <QuickHabitWidget />
                <FocusTimerWidget />
                <AppStatusWidget />
                <HealthMetricWidget />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : ""}`}>
                      Today's Usage
                    </CardTitle>
                    <Clock className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : ""}`}>{dailyUsage}h</div>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>
                      {dailyUsage > 4 ? "+12%" : "-8%"} from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : ""}`}>
                      Weekly Goal
                    </CardTitle>
                    <Target className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : ""}`}>
                      {Math.round(goalProgress)}%
                    </div>
                    <Progress value={goalProgress} className="mt-2" />
                  </CardContent>
                </Card>

                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : ""}`}>
                      Focus Streak
                    </CardTitle>
                    <Zap className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : ""}`}>
                      {focusStreak} days
                    </div>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>
                      Personal best!
                    </p>
                  </CardContent>
                </Card>

                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : ""}`}>
                      AI Insights
                    </CardTitle>
                    <Brain className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : ""}`}>3</div>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>
                      New recommendations
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* App Usage Today */}
                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>App Usage Today</CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : ""}>
                      Time spent on different applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Instagram", time: "1h 23m", color: "bg-pink-500", blocked: false },
                      { name: "YouTube", time: "58m", color: "bg-red-500", blocked: true },
                      { name: "Twitter", time: "45m", color: "bg-blue-500", blocked: false },
                      { name: "TikTok", time: "32m", color: "bg-black", blocked: true },
                    ].map((app, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${app.color}`} />
                          <span className={`font-medium ${theme === "dark" ? "text-white" : ""}`}>{app.name}</span>
                          {app.blocked && (
                            <Badge variant="destructive" className="text-xs">
                              Blocked
                            </Badge>
                          )}
                        </div>
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>
                          {app.time}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* AI Coach Insights */}
                <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : ""}`}>
                      <Brain className="h-5 w-5 text-indigo-600" />
                      AI Wellness Coach
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : ""}>
                      Personalized insights and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className={`p-4 rounded-lg border ${
                        theme === "dark" ? "bg-indigo-900/20 border-indigo-800" : "bg-indigo-50 border-indigo-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-indigo-300" : "text-indigo-900"}`}>
                            Peak Usage Alert
                          </p>
                          <p className={`text-sm mt-1 ${theme === "dark" ? "text-indigo-400" : "text-indigo-700"}`}>
                            You tend to use social media most between 8-10 PM. Consider setting a focus session during
                            this time.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${
                        theme === "dark" ? "bg-green-900/20 border-green-800" : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className={`font-medium ${theme === "dark" ? "text-green-300" : "text-green-900"}`}>
                            Great Progress!
                          </p>
                          <p className={`text-sm mt-1 ${theme === "dark" ? "text-green-400" : "text-green-700"}`}>
                            Your morning routine has improved by 40% this week. Keep it up!
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Brain className="h-4 w-4 mr-2" />
                      View All AI Insights
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Recent Activity</CardTitle>
                  <CardDescription className={theme === "dark" ? "text-gray-400" : ""}>
                    Your digital wellness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "2 hours ago", action: "Completed 25-minute focus session", icon: Target },
                      { time: "4 hours ago", action: "Instagram blocked after reaching daily limit", icon: Shield },
                      { time: "Yesterday", action: "Achieved daily step goal (8,000 steps)", icon: Heart },
                      { time: "2 days ago", action: "Started new habit: Morning meditation", icon: Calendar },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                          <activity.icon
                            className={`h-4 w-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : ""}`}>
                            {activity.action}
                          </p>
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents */}
            <TabsContent value="apps">
              <AppControlTab />
            </TabsContent>

            <TabsContent value="focus">
              <FocusSessionTab />
            </TabsContent>

            <TabsContent value="habits">
              <HabitsTab />
            </TabsContent>

            <TabsContent value="health">
              <HealthTab />
            </TabsContent>

            <TabsContent value="ai-coach">
              <AICoachTab />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>

            {/* Bottom Navigation */}
            <div
              className={`fixed bottom-0 left-0 right-0 border-t px-4 py-2 z-50 ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <TabsList
                className={`grid w-full grid-cols-7 h-16 ${theme === "dark" ? "bg-gray-700" : "bg-transparent"}`}
              >
                <TabsTrigger
                  value="dashboard"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="text-xs">Home</span>
                </TabsTrigger>
                <TabsTrigger
                  value="apps"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Apps</span>
                </TabsTrigger>
                <TabsTrigger
                  value="focus"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Target className="h-4 w-4" />
                  <span className="text-xs">Focus</span>
                </TabsTrigger>
                <TabsTrigger
                  value="habits"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">Habits</span>
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">Health</span>
                </TabsTrigger>
                <TabsTrigger
                  value="ai-coach"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Brain className="h-4 w-4" />
                  <span className="text-xs">AI Coach</span>
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className={`flex-col gap-1 h-full ${
                    theme === "dark"
                      ? "data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-300 text-gray-300"
                      : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span className="text-xs">Profile</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Install Prompt */}
        <InstallPrompt />
      </div>
    </ThemeContext.Provider>
  )
}

// Export theme context for use in other components
export { ThemeContext }
