"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, AlertTriangle, Plus, Settings, Power, Timer, Users } from "lucide-react"

export function AppControlTab() {
  const [apps, setApps] = useState([
    {
      name: "Instagram",
      timeLimit: 60,
      currentUsage: 83,
      blocked: true,
      icon: "📷",
      category: "Social Media",
      allowInFocus: false,
      shutdownTime: "22:00",
      weekendMultiplier: 1.5,
      lastReset: new Date().toDateString(),
    },
    {
      name: "YouTube",
      timeLimit: 90,
      currentUsage: 58,
      blocked: false,
      icon: "📺",
      category: "Entertainment",
      allowInFocus: true,
      shutdownTime: "23:00",
      weekendMultiplier: 2.0,
      lastReset: new Date().toDateString(),
    },
    {
      name: "Twitter",
      timeLimit: 45,
      currentUsage: 45,
      blocked: true,
      icon: "🐦",
      category: "Social Media",
      allowInFocus: false,
      shutdownTime: "21:30",
      weekendMultiplier: 1.2,
      lastReset: new Date().toDateString(),
    },
    {
      name: "TikTok",
      timeLimit: 30,
      currentUsage: 32,
      blocked: true,
      icon: "🎵",
      category: "Entertainment",
      allowInFocus: false,
      shutdownTime: "22:00",
      weekendMultiplier: 1.0,
      lastReset: new Date().toDateString(),
    },
    {
      name: "Spotify",
      timeLimit: 180,
      currentUsage: 45,
      blocked: false,
      icon: "🎵",
      category: "Productivity",
      allowInFocus: true,
      shutdownTime: "never",
      weekendMultiplier: 1.0,
      lastReset: new Date().toDateString(),
    },
  ])

  const [customCategories, setCustomCategories] = useState([
    "Social Media",
    "Entertainment",
    "Productivity",
    "News",
    "Shopping",
    "Games",
    "Education",
  ])

  const [selectedApp, setSelectedApp] = useState<number | null>(null)
  const [showAddApp, setShowAddApp] = useState(false)
  const [newApp, setNewApp] = useState({
    name: "",
    timeLimit: 60,
    category: "Social Media",
    allowInFocus: false,
    shutdownTime: "22:00",
    weekendMultiplier: 1.0,
  })

  // Check for daily reset
  useEffect(() => {
    const checkDailyReset = () => {
      const today = new Date().toDateString()
      const updatedApps = apps.map((app) => {
        if (app.lastReset !== today) {
          return {
            ...app,
            currentUsage: 0,
            blocked: false,
            lastReset: today,
          }
        }
        return app
      })
      setApps(updatedApps)
    }

    checkDailyReset()
    // Check every minute for daily reset
    const interval = setInterval(checkDailyReset, 60000)
    return () => clearInterval(interval)
  }, [])

  // Auto-block apps when time limit exceeded
  useEffect(() => {
    const updatedApps = apps.map((app) => {
      if (app.currentUsage >= app.timeLimit && !app.blocked) {
        // Simulate actual app shutdown
        simulateAppShutdown(app.name)
        return { ...app, blocked: true }
      }
      return app
    })
    setApps(updatedApps)
  }, [apps.map((app) => app.currentUsage).join(",")])

  const simulateAppShutdown = (appName: string) => {
    // In a real implementation, this would interface with the OS to close the app
    console.log(`🚫 SHUTTING DOWN ${appName} - Time limit exceeded!`)

    // Show system notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`${appName} has been blocked`, {
        body: `Daily time limit exceeded. App will be available tomorrow.`,
        icon: "/favicon.ico",
      })
    }
  }

  const toggleAppBlock = (index: number) => {
    const newApps = [...apps]
    newApps[index].blocked = !newApps[index].blocked

    if (newApps[index].blocked) {
      simulateAppShutdown(newApps[index].name)
    }

    setApps(newApps)
  }

  const updateAppSettings = (index: number, settings: any) => {
    const newApps = [...apps]
    newApps[index] = { ...newApps[index], ...settings }
    setApps(newApps)
  }

  const addNewApp = () => {
    if (newApp.name.trim()) {
      const newAppData = {
        ...newApp,
        currentUsage: 0,
        blocked: false,
        icon: "📱",
        lastReset: new Date().toDateString(),
      }
      setApps([...apps, newAppData])
      setNewApp({
        name: "",
        timeLimit: 60,
        category: "Social Media",
        allowInFocus: false,
        shutdownTime: "22:00",
        weekendMultiplier: 1.0,
      })
      setShowAddApp(false)
    }
  }

  const getEffectiveTimeLimit = (app: any) => {
    const isWeekend = [0, 6].includes(new Date().getDay())
    return isWeekend ? Math.round(app.timeLimit * app.weekendMultiplier) : app.timeLimit
  }

  return (
    <div className="space-y-6">
      {/* App Blocking Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Smart App Control Center
          </CardTitle>
          <CardDescription>Advanced app management with automatic shutdown and daily reset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{apps.filter((app) => app.blocked).length}</div>
              <div className="text-sm text-red-600">Apps Blocked</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {apps.filter((app) => app.currentUsage >= getEffectiveTimeLimit(app) * 0.8).length}
              </div>
              <div className="text-sm text-yellow-600">Near Limit</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {apps.filter((app) => app.currentUsage < getEffectiveTimeLimit(app) * 0.5).length}
              </div>
              <div className="text-sm text-green-600">Under Control</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  (apps.reduce((sum, app) => sum + (getEffectiveTimeLimit(app) - app.currentUsage), 0) / 60) * 10,
                ) / 10}
                h
              </div>
              <div className="text-sm text-blue-600">Time Remaining</div>
            </div>
          </div>

          {/* Auto-shutdown notification */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Power className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-900">Auto-Shutdown Active</span>
            </div>
            <p className="text-sm text-orange-800">
              Apps will automatically shut down when daily limits are exceeded. They'll be available again at midnight.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual App Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {apps.map((app, index) => {
          const effectiveLimit = getEffectiveTimeLimit(app)
          const isNearLimit = app.currentUsage >= effectiveLimit * 0.8
          const isOverLimit = app.currentUsage >= effectiveLimit

          return (
            <Card
              key={index}
              className={app.blocked ? "border-red-200 bg-red-50" : isNearLimit ? "border-yellow-200 bg-yellow-50" : ""}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {app.name}
                        {app.allowInFocus && (
                          <Badge variant="secondary" className="text-xs">
                            Focus OK
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {app.currentUsage}m / {effectiveLimit}m today • {app.category}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOverLimit && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApp(selectedApp === index ? null : index)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={app.blocked}
                      onCheckedChange={() => toggleAppBlock(index)}
                      disabled={isOverLimit}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Usage Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usage Progress</span>
                    <span>{Math.round((app.currentUsage / effectiveLimit) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isOverLimit ? "bg-red-500" : isNearLimit ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min((app.currentUsage / effectiveLimit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Settings */}
                {selectedApp === index && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Time Limit */}
                      <div className="space-y-2">
                        <Label className="text-sm">Weekday Limit: {app.timeLimit}m</Label>
                        <Slider
                          value={[app.timeLimit]}
                          onValueChange={(value) => updateAppSettings(index, { timeLimit: value[0] })}
                          max={300}
                          min={15}
                          step={15}
                          className="w-full"
                        />
                      </div>

                      {/* Weekend Multiplier */}
                      <div className="space-y-2">
                        <Label className="text-sm">Weekend Multiplier: {app.weekendMultiplier}x</Label>
                        <Slider
                          value={[app.weekendMultiplier]}
                          onValueChange={(value) => updateAppSettings(index, { weekendMultiplier: value[0] })}
                          max={3}
                          min={0.5}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label className="text-sm">Category</Label>
                        <Select
                          value={app.category}
                          onValueChange={(value) => updateAppSettings(index, { category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {customCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Shutdown Time */}
                      <div className="space-y-2">
                        <Label className="text-sm">Auto-shutdown Time</Label>
                        <Select
                          value={app.shutdownTime}
                          onValueChange={(value) => updateAppSettings(index, { shutdownTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="21:00">9:00 PM</SelectItem>
                            <SelectItem value="21:30">9:30 PM</SelectItem>
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                            <SelectItem value="22:30">10:30 PM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Focus Session Settings */}
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <Label className="font-medium">Allow During Focus Sessions</Label>
                        <p className="text-sm text-muted-foreground">This app can be used during focus sessions</p>
                      </div>
                      <Checkbox
                        checked={app.allowInFocus}
                        onCheckedChange={(checked) => updateAppSettings(index, { allowInFocus: checked })}
                      />
                    </div>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant={app.blocked ? "destructive" : "secondary"} className="text-xs">
                      {app.blocked ? "🚫 Blocked" : "✅ Active"}
                    </Badge>
                    {isOverLimit && (
                      <Badge variant="destructive" className="text-xs">
                        Limit Exceeded
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">Resets at midnight</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add New App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Custom App
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showAddApp ? (
            <Button onClick={() => setShowAddApp(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New App to Monitor
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>App Name</Label>
                  <Input
                    placeholder="e.g., WhatsApp"
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Daily Time Limit (minutes)</Label>
                  <Input
                    type="number"
                    value={newApp.timeLimit}
                    onChange={(e) => setNewApp({ ...newApp, timeLimit: Number.parseInt(e.target.value) || 60 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newApp.category} onValueChange={(value) => setNewApp({ ...newApp, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {customCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Auto-shutdown Time</Label>
                  <Select
                    value={newApp.shutdownTime}
                    onValueChange={(value) => setNewApp({ ...newApp, shutdownTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <Label>Allow During Focus Sessions</Label>
                <Checkbox
                  checked={newApp.allowInFocus}
                  onCheckedChange={(checked) => setNewApp({ ...newApp, allowInFocus: checked })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addNewApp} className="flex-1">
                  Add App
                </Button>
                <Button variant="outline" onClick={() => setShowAddApp(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Override */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">Emergency Override</CardTitle>
          <CardDescription className="text-orange-700">
            Temporarily disable all app blocks (use responsibly)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" className="border-orange-300 text-orange-800">
              <Timer className="h-4 w-4 mr-2" />
              Override for 15 minutes
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-800">
              <Users className="h-4 w-4 mr-2" />
              Family Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
