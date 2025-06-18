"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play, Pause, Shield, Heart, Target, Flame, Droplets, Eye, Plus, Minus } from "lucide-react"

// Quick Habit Widget
export function QuickHabitWidget() {
  const [todayHabits, setTodayHabits] = useState([
    { id: 1, name: "Morning Meditation", completed: true, streak: 12 },
    { id: 2, name: "Read 30min", completed: false, streak: 5 },
    { id: 3, name: "Exercise", completed: true, streak: 8 },
  ])

  const toggleHabit = (id: number) => {
    setTodayHabits((habits) =>
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 }
          : habit,
      ),
    )
  }

  const completedCount = todayHabits.filter((h) => h.completed).length

  return (
    <Card className="col-span-2 md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 dark:text-white">
          <Flame className="h-4 w-4 text-orange-500" />
          Quick Habits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-center mb-3">
          <div className="text-2xl font-bold dark:text-white">
            {completedCount}/{todayHabits.length}
          </div>
          <Progress value={(completedCount / todayHabits.length) * 100} className="h-2 mt-1" />
        </div>
        <div className="space-y-1">
          {todayHabits.slice(0, 2).map((habit) => (
            <div key={habit.id} className="flex items-center justify-between text-xs">
              <span className={`${habit.completed ? "line-through text-gray-500" : "dark:text-gray-300"}`}>
                {habit.name}
              </span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleHabit(habit.id)}>
                <CheckCircle className={`h-4 w-4 ${habit.completed ? "text-green-600" : "text-gray-400"}`} />
              </Button>
            </div>
          ))}
        </div>
        {todayHabits.length > 2 && (
          <div className="text-xs text-center text-muted-foreground dark:text-gray-400">
            +{todayHabits.length - 2} more habits
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Focus Timer Widget
export function FocusTimerWidget() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [isActive, setIsActive] = useState(false)
  const [sessionType, setSessionType] = useState("work")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Switch to break
      if (sessionType === "work") {
        setSessionType("break")
        setTimeLeft(5 * 60)
      } else {
        setSessionType("work")
        setTimeLeft(25 * 60)
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, sessionType])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress =
    sessionType === "work" ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 : ((5 * 60 - timeLeft) / (5 * 60)) * 100

  return (
    <Card className="col-span-2 md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 dark:text-white">
          <Target className="h-4 w-4 text-blue-500" />
          Focus Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <div className="text-xl font-mono font-bold dark:text-white">{formatTime(timeLeft)}</div>
        <Progress value={progress} className="h-2" />
        <Badge variant={sessionType === "work" ? "default" : "secondary"} className="text-xs">
          {sessionType === "work" ? "Work" : "Break"}
        </Badge>
        <Button variant="outline" size="sm" onClick={() => setIsActive(!isActive)} className="w-full h-8">
          {isActive ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
          {isActive ? "Pause" : "Start"}
        </Button>
      </CardContent>
    </Card>
  )
}

// App Status Widget
export function AppStatusWidget() {
  const [blockedApps] = useState([
    { name: "Instagram", timeLeft: "2h 15m", status: "blocked" },
    { name: "TikTok", timeLeft: "0m", status: "exceeded" },
    { name: "YouTube", timeLeft: "1h 30m", status: "active" },
  ])

  const blockedCount = blockedApps.filter((app) => app.status === "blocked" || app.status === "exceeded").length

  return (
    <Card className="col-span-2 md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 dark:text-white">
          <Shield className="h-4 w-4 text-red-500" />
          App Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-center mb-3">
          <div className="text-2xl font-bold text-red-600">{blockedCount}</div>
          <div className="text-xs text-muted-foreground dark:text-gray-400">Apps Blocked</div>
        </div>
        <div className="space-y-1">
          {blockedApps.slice(0, 2).map((app, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="truncate dark:text-gray-300">{app.name}</span>
              <Badge
                variant={app.status === "exceeded" ? "destructive" : app.status === "blocked" ? "secondary" : "outline"}
                className="text-xs"
              >
                {app.status === "exceeded" ? "🚫" : app.status === "blocked" ? "⏸️" : "✅"}
              </Badge>
            </div>
          ))}
        </div>
        <div className="text-xs text-center text-muted-foreground dark:text-gray-400">Reset at midnight</div>
      </CardContent>
    </Card>
  )
}

// Health Metric Widget - Fixed with automatic step tracking
export function HealthMetricWidget() {
  const [healthMetrics, setHealthMetrics] = useState([
    { name: "Steps", current: 8420, goal: 10000, unit: "steps", icon: Heart, color: "text-red-500" },
    { name: "Water", current: 6, goal: 8, unit: "glasses", icon: Droplets, color: "text-blue-500" },
    { name: "Eye Breaks", current: 8, goal: 12, unit: "breaks", icon: Eye, color: "text-green-500" },
  ])

  const [selectedMetric, setSelectedMetric] = useState(0)

  // Auto-increment steps every few seconds (simulating step tracking)
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setHealthMetrics((metrics) =>
        metrics.map((metric, index) =>
          index === 0 && metric.name === "Steps"
            ? { ...metric, current: metric.current + Math.floor(Math.random() * 3) }
            : metric,
        ),
      )
    }, 5000)

    return () => clearInterval(stepInterval)
  }, [])

  const updateMetric = (increment: boolean) => {
    setHealthMetrics((metrics) =>
      metrics.map((metric, index) =>
        index === selectedMetric
          ? { ...metric, current: increment ? metric.current + 1 : Math.max(0, metric.current - 1) }
          : metric,
      ),
    )
  }

  const currentMetric = healthMetrics[selectedMetric]
  const progress = (currentMetric.current / currentMetric.goal) * 100

  return (
    <Card className="col-span-2 md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm flex items-center gap-2 dark:text-white`}>
          <currentMetric.icon className={`h-4 w-4 ${currentMetric.color}`} />
          {currentMetric.name}
          {currentMetric.name === "Steps" && (
            <Badge variant="secondary" className="text-xs ml-1">
              Auto
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-center">
          <div className="text-2xl font-bold dark:text-white">
            {currentMetric.current.toLocaleString()}
            <span className="text-sm text-muted-foreground dark:text-gray-400">
              /{currentMetric.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2 mt-1" />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateMetric(false)}
            className="h-8 w-8 p-0"
            disabled={currentMetric.name === "Steps"} // Disable for auto-tracked steps
          >
            <Minus className="h-3 w-3" />
          </Button>

          <div className="flex gap-1">
            {healthMetrics.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedMetric(index)}
                className={`w-2 h-2 rounded-full ${index === selectedMetric ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => updateMetric(true)}
            className="h-8 w-8 p-0"
            disabled={currentMetric.name === "Steps"} // Disable for auto-tracked steps
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground dark:text-gray-400">
          {Math.round(progress)}% of daily goal
        </div>
      </CardContent>
    </Card>
  )
}

// Widget Collection Component for easy management
export function WidgetCollection() {
  const [widgets, setWidgets] = useState([
    { id: "habits", name: "Quick Habits", component: QuickHabitWidget, enabled: true },
    { id: "focus", name: "Focus Timer", component: FocusTimerWidget, enabled: true },
    { id: "apps", name: "App Status", component: AppStatusWidget, enabled: true },
    { id: "health", name: "Health Metrics", component: HealthMetricWidget, enabled: true },
  ])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {widgets
        .filter((w) => w.enabled)
        .map((widget) => {
          const WidgetComponent = widget.component
          return <WidgetComponent key={widget.id} />
        })}
    </div>
  )
}

// Home Screen Widget (for mobile home screen integration)
export function HomeScreenWidget({ type = "summary" }: { type?: "summary" | "habits" | "focus" | "apps" }) {
  if (type === "habits") return <QuickHabitWidget />
  if (type === "focus") return <FocusTimerWidget />
  if (type === "apps") return <AppStatusWidget />

  // Summary widget
  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 dark:text-white">
          <Shield className="h-4 w-4 text-indigo-500" />
          MindGuard Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">3/4</div>
            <div className="text-xs text-muted-foreground dark:text-gray-400">Habits</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">2</div>
            <div className="text-xs text-muted-foreground dark:text-gray-400">Blocked</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium dark:text-white">4.2h screen time today</div>
          <Progress value={70} className="h-2 mt-1" />
        </div>
        <Button variant="outline" size="sm" className="w-full h-8">
          Open MindGuard
        </Button>
      </CardContent>
    </Card>
  )
}
