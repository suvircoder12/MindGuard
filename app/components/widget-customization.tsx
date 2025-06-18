"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, Smartphone, Grid3X3, Eye, Move, Monitor } from "lucide-react"

export function WidgetCustomization() {
  const [widgetSettings, setWidgetSettings] = useState({
    homeScreenWidgets: true,
    lockScreenWidgets: false,
    notificationWidgets: true,
    widgetTheme: "auto",
    widgetSize: "medium",
    refreshInterval: 30, // seconds
    showSensitiveData: false,
  })

  const [availableWidgets] = useState([
    {
      id: "habits",
      name: "Quick Habits",
      description: "Track daily habits with one tap",
      enabled: true,
      position: 1,
      size: "small",
    },
    {
      id: "focus",
      name: "Focus Timer",
      description: "Start focus sessions instantly",
      enabled: true,
      position: 2,
      size: "medium",
    },
    {
      id: "apps",
      name: "App Status",
      description: "View blocked apps and time remaining",
      enabled: true,
      position: 3,
      size: "small",
    },
    {
      id: "health",
      name: "Health Metrics",
      description: "Quick health tracking",
      enabled: false,
      position: 4,
      size: "medium",
    },
    {
      id: "summary",
      name: "Daily Summary",
      description: "Overview of your digital wellness",
      enabled: true,
      position: 5,
      size: "large",
    },
  ])

  const [widgets, setWidgets] = useState(availableWidgets)

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)))
  }

  const updateWidgetSize = (id: string, size: string) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, size } : w)))
  }

  const updateSetting = (key: string, value: any) => {
    setWidgetSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Widget Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Widget Settings
          </CardTitle>
          <CardDescription>Configure how widgets appear and behave</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Widget Locations */}
          <div className="space-y-4">
            <h4 className="font-semibold">Widget Locations</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Home Screen Widgets
                </Label>
                <p className="text-sm text-muted-foreground">Show widgets on device home screen</p>
              </div>
              <Switch
                checked={widgetSettings.homeScreenWidgets}
                onCheckedChange={(checked) => updateSetting("homeScreenWidgets", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Lock Screen Widgets
                </Label>
                <p className="text-sm text-muted-foreground">Quick access from lock screen</p>
              </div>
              <Switch
                checked={widgetSettings.lockScreenWidgets}
                onCheckedChange={(checked) => updateSetting("lockScreenWidgets", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notification Panel Widgets</Label>
                <p className="text-sm text-muted-foreground">Show in notification dropdown</p>
              </div>
              <Switch
                checked={widgetSettings.notificationWidgets}
                onCheckedChange={(checked) => updateSetting("notificationWidgets", checked)}
              />
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold">Appearance</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Widget Theme</Label>
                <Select
                  value={widgetSettings.widgetTheme}
                  onValueChange={(value) => updateSetting("widgetTheme", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Widget Size</Label>
                <Select value={widgetSettings.widgetSize} onValueChange={(value) => updateSetting("widgetSize", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (2x2)</SelectItem>
                    <SelectItem value="medium">Medium (4x2)</SelectItem>
                    <SelectItem value="large">Large (4x4)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="space-y-4">
            <h4 className="font-semibold">Privacy & Data</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Show Sensitive Data
                </Label>
                <p className="text-sm text-muted-foreground">Display specific app names and usage times</p>
              </div>
              <Switch
                checked={widgetSettings.showSensitiveData}
                onCheckedChange={(checked) => updateSetting("showSensitiveData", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Refresh Interval: {widgetSettings.refreshInterval} seconds</Label>
              <Slider
                value={[widgetSettings.refreshInterval]}
                onValueChange={(value) => updateSetting("refreshInterval", value[0])}
                max={300}
                min={10}
                step={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Lower values provide more real-time data but may impact battery life
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Widgets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Available Widgets
          </CardTitle>
          <CardDescription>Enable and configure individual widgets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Switch checked={widget.enabled} onCheckedChange={() => toggleWidget(widget.id)} />
                  <div>
                    <h4 className="font-medium">{widget.name}</h4>
                    <p className="text-sm text-muted-foreground">{widget.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Position {widget.position}
                  </Badge>

                  <Select
                    value={widget.size}
                    onValueChange={(value) => updateWidgetSize(widget.id, value)}
                    disabled={!widget.enabled}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" size="sm" disabled={!widget.enabled}>
                    <Move className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Widget Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Widget Preview
          </CardTitle>
          <CardDescription>See how your widgets will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {widgets
              .filter((w) => w.enabled)
              .map((widget) => (
                <div
                  key={widget.id}
                  className={`bg-white rounded-lg border p-3 ${
                    widget.size === "large" ? "col-span-2" : widget.size === "medium" ? "col-span-2 md:col-span-1" : ""
                  }`}
                >
                  <div className="text-xs font-medium mb-2">{widget.name}</div>
                  <div className="h-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Widget Content</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Widget Installation</CardTitle>
          <CardDescription>How to add MindGuard widgets to your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📱 iOS Instructions</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Long press on your home screen</li>
                <li>Tap the "+" button in the top corner</li>
                <li>Search for "MindGuard" in the widget gallery</li>
                <li>Select your preferred widget size and tap "Add Widget"</li>
                <li>Position the widget and tap "Done"</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">🤖 Android Instructions</h4>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Long press on an empty area of your home screen</li>
                <li>Tap "Widgets" from the menu</li>
                <li>Find "MindGuard" in the widget list</li>
                <li>Long press and drag your chosen widget to the home screen</li>
                <li>Resize if needed and tap outside to finish</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button className="px-8">
          <Settings className="h-4 w-4 mr-2" />
          Save Widget Settings
        </Button>
      </div>
    </div>
  )
}
