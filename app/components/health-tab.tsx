"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Activity, Eye, Brain, Droplets, TrendingUp, TrendingDown, Play, Pause, RotateCcw } from "lucide-react"

export function HealthTab() {
  // Automatic step tracking
  const [steps, setSteps] = useState(8420)
  const [stepGoal] = useState(10000)

  // Mood tracking
  const [currentMood, setCurrentMood] = useState(7)
  const [moodHistory, setMoodHistory] = useState([6, 7, 8, 7, 6, 8, 7])
  const [showMoodDialog, setShowMoodDialog] = useState(false)

  // Quick walk functionality
  const [walkSession, setWalkSession] = useState({
    isActive: false,
    duration: 0, // in seconds
    steps: 0,
    startSteps: 0,
  })

  const [customMetrics, setCustomMetrics] = useState([
    { name: "Water Intake", current: 6, goal: 8, unit: "glasses", icon: "💧" },
    { name: "Eye Breaks", current: 8, goal: 12, unit: "breaks", icon: "👁️" },
    { name: "Sleep", current: 7.5, goal: 8, unit: "hours", icon: "😴" },
    { name: "Meditation", current: 15, goal: 20, unit: "minutes", icon: "🧘" },
  ])

  const [healthData, setHealthData] = useState({
    screenTime: 4.2,
    eyeBreaks: 8,
    eyeBreakGoal: 12,
    sleep: 7.5,
    sleepGoal: 8,
    water: 6,
    waterGoal: 8,
    stress: 4,
    posture: 6,
  })

  // Simulate automatic step counting
  useEffect(() => {
    const stepInterval = setInterval(() => {
      // Simulate step counting (in real app, this would use device sensors)
      const randomSteps = Math.floor(Math.random() * 3) // 0-2 steps per interval
      setSteps((prev) => {
        const newSteps = prev + randomSteps

        // Update walk session if active
        if (walkSession.isActive) {
          setWalkSession((session) => ({
            ...session,
            steps: newSteps - session.startSteps,
          }))
        }

        return newSteps
      })
    }, 5000) // Update every 5 seconds for demo

    return () => clearInterval(stepInterval)
  }, [walkSession.isActive, walkSession.startSteps])

  // Walk session timer
  useEffect(() => {
    let walkTimer: NodeJS.Timeout | null = null

    if (walkSession.isActive) {
      walkTimer = setInterval(() => {
        setWalkSession((session) => ({
          ...session,
          duration: session.duration + 1,
        }))
      }, 1000)
    }

    return () => {
      if (walkTimer) clearInterval(walkTimer)
    }
  }, [walkSession.isActive])

  const startQuickWalk = () => {
    setWalkSession({
      isActive: true,
      duration: 0,
      steps: 0,
      startSteps: steps,
    })
  }

  const stopQuickWalk = () => {
    setWalkSession((prev) => ({ ...prev, isActive: false }))
  }

  const resetQuickWalk = () => {
    setWalkSession({
      isActive: false,
      duration: 0,
      steps: 0,
      startSteps: steps,
    })
  }

  const formatWalkTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleMoodUpdate = (newMood: number) => {
    setCurrentMood(newMood)
    setMoodHistory((prev) => [...prev.slice(-6), newMood])
    setShowMoodDialog(false)

    // Show feedback based on mood
    if (newMood <= 4) {
      alert("Thanks for sharing. Consider taking a break or doing a quick walk to boost your mood! 🌟")
    } else if (newMood >= 8) {
      alert("Great to hear you're feeling good! Keep up the positive energy! 😊")
    } else {
      alert("Thanks for the update! Your mood has been recorded. 📝")
    }
  }

  const triggerEyeBreak = () => {
    alert(
      "👁️ Eye Break Time!\n\nLook at something 20 feet away for 20 seconds.\n\nThis helps reduce eye strain from screen time.",
    )
    setHealthData((prev) => ({ ...prev, eyeBreaks: prev.eyeBreaks + 1 }))
  }

  const logWater = () => {
    setHealthData((prev) => ({ ...prev, water: Math.min(prev.water + 1, prev.waterGoal + 2) }))
  }

  const getHealthScore = () => {
    const scores = [
      (healthData.eyeBreaks / healthData.eyeBreakGoal) * 100,
      (healthData.sleep / healthData.sleepGoal) * 100,
      (steps / stepGoal) * 100,
      (healthData.water / healthData.waterGoal) * 100,
      (currentMood / 10) * 100,
      ((10 - healthData.stress) / 10) * 100,
      (healthData.posture / 10) * 100,
    ]
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const moodEmojis = ["😢", "😞", "😐", "😐", "🙂", "🙂", "😊", "😊", "😄", "🤩"]
  const moodLabels = [
    "Terrible",
    "Bad",
    "Poor",
    "Below Average",
    "Okay",
    "Good",
    "Great",
    "Very Good",
    "Excellent",
    "Amazing",
  ]

  return (
    <div className="space-y-6">
      {/* Health Score Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Digital Wellness Score
          </CardTitle>
          <CardDescription>Your overall health score based on digital habits and wellness metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl font-bold text-green-600">{getHealthScore()}%</div>
            <Badge className="bg-green-100 text-green-800 border-green-200">Good Health</Badge>
          </div>
          <Progress value={getHealthScore()} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">+5% improvement from last week</p>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Automatic Steps Tracking */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps (Auto)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{steps.toLocaleString()}</div>
            <Progress value={(steps / stepGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Goal: {stepGoal.toLocaleString()} steps</p>
            <div className="text-xs text-green-600 mt-1">📱 Auto-tracking active</div>
          </CardContent>
        </Card>

        {/* Eye Health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eye Breaks</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {healthData.eyeBreaks}/{healthData.eyeBreakGoal}
            </div>
            <Progress value={(healthData.eyeBreaks / healthData.eyeBreakGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">20-20-20 rule breaks today</p>
          </CardContent>
        </Card>

        {/* Sleep Quality */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <span className="text-muted-foreground">😴</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthData.sleep}h</div>
            <Progress value={(healthData.sleep / healthData.sleepGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Last night's sleep duration</p>
          </CardContent>
        </Card>

        {/* Hydration */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hydration</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {healthData.water}/{healthData.waterGoal}
            </div>
            <Progress value={(healthData.water / healthData.waterGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Glasses of water today</p>
          </CardContent>
        </Card>

        {/* Mood Tracking */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {currentMood}/10
              <span className="text-2xl">{moodEmojis[currentMood - 1]}</span>
            </div>
            <Progress value={currentMood * 10} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{moodLabels[currentMood - 1]}</p>
          </CardContent>
        </Card>

        {/* Stress Level */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <span className="text-muted-foreground">😰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthData.stress}/10</div>
            <Progress value={healthData.stress * 10} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Walk Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Quick Walk Session
          </CardTitle>
          <CardDescription>Take a quick walk to boost your health and mood</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formatWalkTime(walkSession.duration)}</div>
              <div className="text-sm text-blue-600">Duration</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{walkSession.steps}</div>
              <div className="text-sm text-green-600">Steps This Walk</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {walkSession.duration > 0 ? Math.round((walkSession.steps / walkSession.duration) * 60) : 0}
              </div>
              <div className="text-sm text-purple-600">Steps/Min</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={walkSession.isActive ? stopQuickWalk : startQuickWalk}
              className={walkSession.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {walkSession.isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Walk
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Walk
                </>
              )}
            </Button>
            <Button onClick={resetQuickWalk} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {walkSession.isActive && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                🚶‍♂️ Walk session active! Your steps are being tracked automatically.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Screen Time Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Screen Time Health Impact</CardTitle>
          <CardDescription>How your digital habits affect your physical and mental wellbeing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Positive Trends</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Better Sleep Pattern</p>
                    <p className="text-sm text-green-700">No screens 1hr before bed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Regular Eye Breaks</p>
                    <p className="text-sm text-green-700">Following 20-20-20 rule</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-orange-800">Areas for Improvement</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Posture Awareness</p>
                    <p className="text-sm text-orange-700">Set hourly posture reminders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Physical Activity</p>
                    <p className="text-sm text-orange-700">Take more movement breaks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Eye Care</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Blink more frequently while using screens</li>
                <li>• Adjust screen brightness to match surroundings</li>
                <li>• Use blue light filters in the evening</li>
                <li>• Keep screens 20-26 inches away</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Mental Wellness</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Practice mindfulness during breaks</li>
                <li>• Limit news consumption before bed</li>
                <li>• Use apps for guided meditation</li>
                <li>• Connect with friends offline regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-16 flex-col gap-2" onClick={triggerEyeBreak}>
          <Eye className="h-5 w-5" />
          <span className="text-xs">Eye Break</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-2" onClick={logWater}>
          <Droplets className="h-5 w-5" />
          <span className="text-xs">Log Water</span>
        </Button>

        {/* Mood Check Dialog */}
        <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Brain className="h-5 w-5" />
              <span className="text-xs">Mood Check</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>How are you feeling?</DialogTitle>
              <DialogDescription>Rate your current mood from 1 (terrible) to 10 (amazing)</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{moodEmojis[currentMood - 1]}</div>
                <div className="text-lg font-semibold">{moodLabels[currentMood - 1]}</div>
                <div className="text-sm text-muted-foreground">Current: {currentMood}/10</div>
              </div>

              <div className="space-y-2">
                <Label>Mood Level: {currentMood}</Label>
                <Slider
                  value={[currentMood]}
                  onValueChange={(value) => setCurrentMood(value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMoodDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleMoodUpdate(currentMood)}>Save Mood</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" className="h-16 flex-col gap-2" onClick={startQuickWalk}>
          <Activity className="h-5 w-5" />
          <span className="text-xs">Quick Walk</span>
        </Button>
      </div>
    </div>
  )
}
