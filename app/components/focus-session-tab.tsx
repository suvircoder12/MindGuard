"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Target, Clock, Zap, Settings, Shield, Plus } from "lucide-react"

export function FocusSessionTab() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [sessionType, setSessionType] = useState("work")
  const [completedSessions, setCompletedSessions] = useState(3)

  // Customizable session settings
  const [sessionSettings, setSessionSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4, // After how many work sessions
    autoStartBreaks: true,
    autoStartWork: false,
    playNotificationSound: true,
    blockAllApps: false,
    customBlockedApps: ["Instagram", "TikTok", "Twitter"],
    allowedApps: ["Spotify", "Notes", "Calculator"],
    focusGoal: "Deep Work Session",
    backgroundNoise: "none",
  })

  const [availableApps] = useState([
    "Instagram",
    "TikTok",
    "Twitter",
    "YouTube",
    "Facebook",
    "WhatsApp",
    "Spotify",
    "Notes",
    "Calculator",
    "Calendar",
    "Email",
    "Maps",
    "Weather",
  ])

  const [customGoals, setCustomGoals] = useState([
    "Deep Work Session",
    "Study Time",
    "Creative Work",
    "Reading",
    "Writing",
    "Coding",
    "Design Work",
  ])

  const [showSettings, setShowSettings] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const sessionTypes = {
    work: {
      duration: sessionSettings.workDuration * 60,
      label: `${sessionSettings.focusGoal}`,
      color: "bg-blue-500",
    },
    break: {
      duration: sessionSettings.shortBreakDuration * 60,
      label: "Short Break",
      color: "bg-green-500",
    },
    longBreak: {
      duration: sessionSettings.longBreakDuration * 60,
      label: "Long Break",
      color: "bg-purple-500",
    },
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setCompletedSessions((prev) => prev + 1)

      // Play notification sound
      if (sessionSettings.playNotificationSound) {
        // In real app, play actual sound
        console.log("🔔 Focus session completed!")
      }

      // Auto-switch logic
      if (sessionType === "work") {
        const shouldTakeLongBreak = completedSessions % sessionSettings.longBreakInterval === 0
        const nextSession = shouldTakeLongBreak ? "longBreak" : "break"
        setSessionType(nextSession)
        setTimeLeft(sessionTypes[nextSession].duration)

        if (sessionSettings.autoStartBreaks) {
          setIsActive(true)
        }
      } else if (sessionSettings.autoStartWork) {
        setSessionType("work")
        setTimeLeft(sessionTypes.work.duration)
        setIsActive(true)
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, sessionType, completedSessions, sessionSettings])

  // Block/unblock apps during focus session
  useEffect(() => {
    if (isActive && sessionType === "work") {
      blockAppsForFocus()
    } else {
      unblockAppsAfterFocus()
    }
  }, [isActive, sessionType])

  const blockAppsForFocus = () => {
    if (sessionSettings.blockAllApps) {
      console.log("🚫 Blocking ALL apps during focus session")
    } else {
      sessionSettings.customBlockedApps.forEach((app) => {
        console.log(`🚫 Blocking ${app} during focus session`)
      })
    }

    // Show notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Focus Session Started", {
        body: `${sessionSettings.customBlockedApps.length} apps blocked. Stay focused!`,
        icon: "/favicon.ico",
      })
    }
  }

  const unblockAppsAfterFocus = () => {
    console.log("✅ Unblocking apps - focus session ended")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => setIsActive(true)
  const handlePause = () => setIsActive(false)
  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(sessionTypes[sessionType as keyof typeof sessionTypes].duration)
  }

  const handleSessionTypeChange = (type: string) => {
    setSessionType(type)
    setTimeLeft(sessionTypes[type as keyof typeof sessionTypes].duration)
    setIsActive(false)
  }

  const updateSessionSettings = (key: string, value: any) => {
    setSessionSettings((prev) => ({ ...prev, [key]: value }))
  }

  const addCustomGoal = () => {
    if (newGoal.trim() && !customGoals.includes(newGoal)) {
      setCustomGoals([...customGoals, newGoal])
      setSessionSettings((prev) => ({ ...prev, focusGoal: newGoal }))
      setNewGoal("")
    }
  }

  const progress =
    ((sessionTypes[sessionType as keyof typeof sessionTypes].duration - timeLeft) /
      sessionTypes[sessionType as keyof typeof sessionTypes].duration) *
    100

  return (
    <div className="space-y-6">
      {/* Main Timer */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="h-6 w-6" />
            Customizable Focus Sessions
          </CardTitle>
          <CardDescription>Personalized focus sessions with smart app blocking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Type and Goal Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={sessionType} onValueChange={handleSessionTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    Work Session ({sessionSettings.workDuration}m)
                  </div>
                </SelectItem>
                <SelectItem value="break">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    Short Break ({sessionSettings.shortBreakDuration}m)
                  </div>
                </SelectItem>
                <SelectItem value="longBreak">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    Long Break ({sessionSettings.longBreakDuration}m)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sessionSettings.focusGoal}
              onValueChange={(value) => updateSessionSettings("focusGoal", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {customGoals.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timer Display */}
          <div className="space-y-4">
            <div className="text-6xl font-mono font-bold text-gray-800">{formatTime(timeLeft)}</div>
            <Progress value={progress} className="w-64 mx-auto h-3" />
            <Badge className={`${sessionTypes[sessionType as keyof typeof sessionTypes].color} text-white`}>
              {sessionTypes[sessionType as keyof typeof sessionTypes].label}
            </Badge>
          </div>

          {/* App Blocking Status */}
          {isActive && sessionType === "work" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-900">Focus Mode Active</span>
              </div>
              <p className="text-sm text-red-800">
                {sessionSettings.blockAllApps
                  ? "All apps are blocked during this session"
                  : `${sessionSettings.customBlockedApps.length} apps blocked: ${sessionSettings.customBlockedApps.join(", ")}`}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button onClick={isActive ? handlePause : handleStart} size="lg" className="px-8">
              {isActive ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
            <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="lg">
              <Settings className="h-5 w-5 mr-2" />
              Customize
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customization Settings */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Focus Session Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duration Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Work Duration: {sessionSettings.workDuration}m</Label>
                <Slider
                  value={[sessionSettings.workDuration]}
                  onValueChange={(value) => updateSessionSettings("workDuration", value[0])}
                  max={90}
                  min={15}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Short Break: {sessionSettings.shortBreakDuration}m</Label>
                <Slider
                  value={[sessionSettings.shortBreakDuration]}
                  onValueChange={(value) => updateSessionSettings("shortBreakDuration", value[0])}
                  max={15}
                  min={3}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Long Break: {sessionSettings.longBreakDuration}m</Label>
                <Slider
                  value={[sessionSettings.longBreakDuration]}
                  onValueChange={(value) => updateSessionSettings("longBreakDuration", value[0])}
                  max={30}
                  min={10}
                  step={5}
                />
              </div>
            </div>

            {/* App Blocking Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold">App Blocking During Focus</h4>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <Label>Block All Apps (Strict Mode)</Label>
                <Checkbox
                  checked={sessionSettings.blockAllApps}
                  onCheckedChange={(checked) => updateSessionSettings("blockAllApps", checked)}
                />
              </div>

              {!sessionSettings.blockAllApps && (
                <>
                  <div className="space-y-3">
                    <Label>Apps to Block During Focus:</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableApps.map((app) => (
                        <div key={app} className="flex items-center space-x-2">
                          <Checkbox
                            checked={sessionSettings.customBlockedApps.includes(app)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateSessionSettings("customBlockedApps", [...sessionSettings.customBlockedApps, app])
                              } else {
                                updateSessionSettings(
                                  "customBlockedApps",
                                  sessionSettings.customBlockedApps.filter((a) => a !== app),
                                )
                              }
                            }}
                          />
                          <Label className="text-sm">{app}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Always Allow These Apps:</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableApps
                        .filter((app) => !sessionSettings.customBlockedApps.includes(app))
                        .map((app) => (
                          <div key={app} className="flex items-center space-x-2">
                            <Checkbox
                              checked={sessionSettings.allowedApps.includes(app)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateSessionSettings("allowedApps", [...sessionSettings.allowedApps, app])
                                } else {
                                  updateSessionSettings(
                                    "allowedApps",
                                    sessionSettings.allowedApps.filter((a) => a !== app),
                                  )
                                }
                              }}
                            />
                            <Label className="text-sm text-green-700">{app}</Label>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Automation Settings */}
            <div className="space-y-3">
              <h4 className="font-semibold">Automation</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Auto-start breaks</Label>
                  <Checkbox
                    checked={sessionSettings.autoStartBreaks}
                    onCheckedChange={(checked) => updateSessionSettings("autoStartBreaks", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto-start work sessions</Label>
                  <Checkbox
                    checked={sessionSettings.autoStartWork}
                    onCheckedChange={(checked) => updateSessionSettings("autoStartWork", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Play notification sounds</Label>
                  <Checkbox
                    checked={sessionSettings.playNotificationSound}
                    onCheckedChange={(checked) => updateSessionSettings("playNotificationSound", checked)}
                  />
                </div>
              </div>
            </div>

            {/* Custom Goals */}
            <div className="space-y-3">
              <h4 className="font-semibold">Custom Focus Goals</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Learn Spanish"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomGoal()}
                />
                <Button onClick={addCustomGoal}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              Goal: {Math.ceil((8 * 60) / sessionSettings.workDuration)} sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(((completedSessions * sessionSettings.workDuration) / 60) * 10) / 10}h
            </div>
            <p className="text-xs text-muted-foreground">Deep work today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{sessionSettings.focusGoal}</div>
            <p className="text-xs text-muted-foreground">Active focus area</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
