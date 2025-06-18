"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, Bell, Moon, Palette, Shield, Target, Clock, Smartphone, Save, Grid3X3 } from "lucide-react"
import { CheckCircle, AlertTriangle } from "lucide-react"

export function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "",
    theme: "light",
    notifications: true,
    dailyGoal: 4,
    weeklyGoal: 28,
    bedtime: "22:00",
    wakeTime: "07:00",
    focusMode: true,
    strictMode: false,
    appCategories: ["Social Media", "Entertainment", "Productivity", "News"],
    customBlockingRules: [],
    personalizedInsights: true,
    dataExportEnabled: true,
    familyMode: false,
  })

  const [preferences, setPreferences] = useState({
    eyeBreakInterval: 20,
    focusSessionLength: 25,
    breakLength: 5,
    autoBlock: true,
    weekendMode: false,
    parentalControls: false,
    homeScreenWidgets: false,
    widgetAutoRefresh: false,
  })

  // Add these state variables at the top of the component
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const updateProfile = (key: string, value: any) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  const updatePreferences = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  // Add this save function before the return statement
  const saveChanges = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Validate required fields
      if (!profile.name.trim()) {
        throw new Error("Name is required")
      }
      if (!profile.email.trim() || !profile.email.includes("@")) {
        throw new Error("Valid email is required")
      }

      // Save to localStorage (in real app, this would be an API call)
      const settingsToSave = {
        profile,
        preferences,
        savedAt: new Date().toISOString(),
      }

      localStorage.setItem("mindguard-profile", JSON.stringify(settingsToSave))
      localStorage.setItem("mindguard-theme", profile.theme)

      // Apply theme immediately
      document.documentElement.classList.toggle("dark", profile.theme === "dark")

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaveStatus("success")

      // Show success notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Settings Saved", {
          body: "Your profile settings have been saved successfully!",
          icon: "/favicon.ico",
        })
      }
    } catch (error) {
      console.error("Save failed:", error)
      setSaveStatus("error")
      alert(`Failed to save settings: ${error.message}`)
    } finally {
      setIsSaving(false)

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  // Add this useEffect to load saved settings on component mount
  useEffect(() => {
    const loadSavedSettings = () => {
      try {
        const saved = localStorage.getItem("mindguard-profile")
        if (saved) {
          const { profile: savedProfile, preferences: savedPreferences } = JSON.parse(saved)
          setProfile((prev) => ({ ...prev, ...savedProfile }))
          setPreferences((prev) => ({ ...prev, ...savedPreferences }))
        }
      } catch (error) {
        console.error("Failed to load saved settings:", error)
      }
    }

    loadSavedSettings()
  }, [])

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>Manage your account and personalize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline">Change Photo</Button>
              <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </Label>
            <Select value={profile.theme} onValueChange={(value) => updateProfile("theme", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive alerts for app limits and focus sessions</p>
            </div>
            <Switch
              checked={profile.notifications}
              onCheckedChange={(checked) => updateProfile("notifications", checked)}
            />
          </div>

          {/* Focus Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Focus Mode
              </Label>
              <p className="text-sm text-muted-foreground">Block distracting apps during focus sessions</p>
            </div>
            <Switch checked={profile.focusMode} onCheckedChange={(checked) => updateProfile("focusMode", checked)} />
          </div>

          {/* Strict Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Strict Mode
              </Label>
              <p className="text-sm text-muted-foreground">Prevent bypassing app blocks and time limits</p>
            </div>
            <Switch checked={profile.strictMode} onCheckedChange={(checked) => updateProfile("strictMode", checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Usage Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Usage Goals
          </CardTitle>
          <CardDescription>Set your daily and weekly screen time targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Daily Screen Time Goal: {profile.dailyGoal} hours</Label>
            <Slider
              value={[profile.dailyGoal]}
              onValueChange={(value) => updateProfile("dailyGoal", value[0])}
              max={12}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Weekly Screen Time Goal: {profile.weeklyGoal} hours</Label>
            <Slider
              value={[profile.weeklyGoal]}
              onValueChange={(value) => updateProfile("weeklyGoal", value[0])}
              max={84}
              min={7}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sleep Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Sleep Schedule
          </CardTitle>
          <CardDescription>Set your sleep times for better digital wellness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedtime">Bedtime</Label>
              <Input
                id="bedtime"
                type="time"
                value={profile.bedtime}
                onChange={(e) => updateProfile("bedtime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={profile.wakeTime}
                onChange={(e) => updateProfile("wakeTime", e.target.value)}
              />
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Sleep Tip:</strong> Avoid screens 1 hour before bedtime for better sleep quality. We'll
              automatically enable Do Not Disturb mode during your sleep hours.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom App Categories</CardTitle>
          <CardDescription>Create and manage your own app categories</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Allow users to add/edit/delete custom app categories */}
          {/* Show current categories with edit/delete options */}
          {/* Add input field for new categories */}
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Eye Break Interval: {preferences.eyeBreakInterval} minutes</Label>
            <Slider
              value={[preferences.eyeBreakInterval]}
              onValueChange={(value) => updatePreferences("eyeBreakInterval", value[0])}
              max={60}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Focus Session Length: {preferences.focusSessionLength} minutes</Label>
            <Slider
              value={[preferences.focusSessionLength]}
              onValueChange={(value) => updatePreferences("focusSessionLength", value[0])}
              max={60}
              min={15}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Break Length: {preferences.breakLength} minutes</Label>
            <Slider
              value={[preferences.breakLength]}
              onValueChange={(value) => updatePreferences("breakLength", value[0])}
              max={15}
              min={3}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-Block Apps</Label>
              <p className="text-sm text-muted-foreground">Automatically block apps when time limits are reached</p>
            </div>
            <Switch
              checked={preferences.autoBlock}
              onCheckedChange={(checked) => updatePreferences("autoBlock", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Weekend Mode</Label>
              <p className="text-sm text-muted-foreground">Relax restrictions on weekends</p>
            </div>
            <Switch
              checked={preferences.weekendMode}
              onCheckedChange={(checked) => updatePreferences("weekendMode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Widget Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Widget Settings
          </CardTitle>
          <CardDescription>Customize your home screen widgets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Home Screen Widgets</Label>
                <p className="text-sm text-muted-foreground">Show MindGuard widgets on your device home screen</p>
              </div>
              <Switch
                checked={preferences.homeScreenWidgets}
                onCheckedChange={(checked) => updatePreferences("homeScreenWidgets", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Widget Auto-Refresh</Label>
                <p className="text-sm text-muted-foreground">Automatically update widget data</p>
              </div>
              <Switch
                checked={preferences.widgetAutoRefresh}
                onCheckedChange={(checked) => updatePreferences("widgetAutoRefresh", checked)}
              />
            </div>

            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Customize Widgets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Account Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-green-600">Focus Sessions</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23h</div>
              <div className="text-sm text-blue-600">Time Saved</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-purple-600">Goal Achievement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Settings saved successfully!</span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Failed to save settings</span>
            </div>
          )}
        </div>

        <Button onClick={saveChanges} disabled={isSaving} className="px-8">
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
