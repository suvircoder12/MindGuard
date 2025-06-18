"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar, CheckCircle, Plus, Target, TrendingUp, Flame, Settings, Trash2 } from "lucide-react"

export function HabitsTab() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Morning Meditation",
      streak: 12,
      completedToday: true,
      weeklyGoal: 7,
      weeklyProgress: 6,
      category: "Wellness",
      color: "bg-purple-500",
      difficulty: "Easy",
      reminder: "08:00",
      notes: "Start with 5 minutes",
      customizable: true,
    },
    {
      id: 2,
      name: "Read for 30 minutes",
      streak: 5,
      completedToday: false,
      weeklyGoal: 5,
      weeklyProgress: 3,
      category: "Learning",
      color: "bg-blue-500",
      difficulty: "Medium",
      reminder: "20:00",
      notes: "Fiction or non-fiction",
      customizable: true,
    },
    {
      id: 3,
      name: "Exercise",
      streak: 8,
      completedToday: true,
      weeklyGoal: 4,
      weeklyProgress: 3,
      category: "Health",
      color: "bg-green-500",
      difficulty: "Hard",
      reminder: "07:00",
      notes: "30 min minimum",
      customizable: true,
    },
    {
      id: 4,
      name: "No social media before 10 AM",
      streak: 15,
      completedToday: true,
      weeklyGoal: 7,
      weeklyProgress: 7,
      category: "Digital Wellness",
      color: "bg-orange-500",
      difficulty: "Medium",
      reminder: "09:45",
      notes: "Check progress at 9:45 AM",
      customizable: true,
    },
  ])

  const [customCategories, setCustomCategories] = useState([
    "Wellness",
    "Learning",
    "Health",
    "Digital Wellness",
    "Productivity",
    "Creativity",
    "Social",
    "Finance",
  ])

  const [habitColors] = useState([
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
  ])

  const [selectedHabit, setSelectedHabit] = useState<number | null>(null)
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    category: "Wellness",
    weeklyGoal: 7,
    color: "bg-purple-500",
    difficulty: "Medium",
    reminder: "09:00",
    notes: "",
  })

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
              weeklyProgress: !habit.completedToday
                ? Math.min(habit.weeklyGoal, habit.weeklyProgress + 1)
                : Math.max(0, habit.weeklyProgress - 1),
            }
          : habit,
      ),
    )
  }

  const updateHabit = (id: number, updates: any) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit)))
  }

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id))
    setSelectedHabit(null)
  }

  const addHabit = () => {
    if (newHabit.name.trim()) {
      const newId = Math.max(...habits.map((h) => h.id)) + 1
      setHabits([
        ...habits,
        {
          id: newId,
          ...newHabit,
          streak: 0,
          completedToday: false,
          weeklyProgress: 0,
          customizable: true,
        },
      ])
      setNewHabit({
        name: "",
        category: "Wellness",
        weeklyGoal: 7,
        color: "bg-purple-500",
        difficulty: "Medium",
        reminder: "09:00",
        notes: "",
      })
      setShowAddHabit(false)
    }
  }

  const addCustomCategory = (category: string) => {
    if (category && !customCategories.includes(category)) {
      setCustomCategories([...customCategories, category])
    }
  }

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0)
  const completedToday = habits.filter((habit) => habit.completedToday).length

  return (
    <div className="space-y-6">
      {/* Habit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedToday}/{habits.length}
            </div>
            <Progress value={(completedToday / habits.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStreak}</div>
            <p className="text-xs text-muted-foreground">Combined days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(...habits.map((h) => h.streak))}</div>
            <p className="text-xs text-muted-foreground">Personal record</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((habits.reduce((sum, h) => sum + h.weeklyProgress / h.weeklyGoal, 0) / habits.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Habit List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} className={habit.completedToday ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${habit.color}`} />
                  <div>
                    <CardTitle className="text-lg">{habit.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary" className="text-xs mr-2">
                        {habit.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs mr-2">
                        {habit.difficulty}
                      </Badge>
                      {habit.streak} day streak
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedHabit(selectedHabit === habit.id ? null : habit.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={habit.completedToday ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleHabit(habit.id)}
                    className={habit.completedToday ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Weekly Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Week</span>
                  <span>
                    {habit.weeklyProgress}/{habit.weeklyGoal}
                  </span>
                </div>
                <Progress value={(habit.weeklyProgress / habit.weeklyGoal) * 100} className="h-2" />
              </div>

              {/* Habit Details */}
              {habit.notes && (
                <div className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">💡 {habit.notes}</div>
              )}

              {/* Expanded Settings */}
              {selectedHabit === habit.id && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Habit Name</Label>
                      <Input value={habit.name} onChange={(e) => updateHabit(habit.id, { name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={habit.category}
                        onValueChange={(value) => updateHabit(habit.id, { category: value })}
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
                    <div className="space-y-2">
                      <Label>Weekly Goal: {habit.weeklyGoal} times</Label>
                      <Slider
                        value={[habit.weeklyGoal]}
                        onValueChange={(value) => updateHabit(habit.id, { weeklyGoal: value[0] })}
                        max={7}
                        min={1}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select
                        value={habit.difficulty}
                        onValueChange={(value) => updateHabit(habit.id, { difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Reminder Time</Label>
                      <Input
                        type="time"
                        value={habit.reminder}
                        onChange={(e) => updateHabit(habit.id, { reminder: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <div className="flex gap-2">
                        {habitColors.map((color) => (
                          <button
                            key={color}
                            className={`w-6 h-6 rounded-full ${color} ${habit.color === color ? "ring-2 ring-gray-400" : ""}`}
                            onClick={() => updateHabit(habit.id, { color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Input
                      placeholder="Add notes or tips for this habit"
                      value={habit.notes}
                      onChange={(e) => updateHabit(habit.id, { notes: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Habit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedHabit(null)}>
                      Done
                    </Button>
                  </div>
                </div>
              )}

              {/* Streak Display */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{habit.streak} days</span>
                </div>
                {habit.completedToday && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">✓ Done Today</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Habit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Custom Habit
          </CardTitle>
          <CardDescription>Build personalized habits that support your goals</CardDescription>
        </CardHeader>
        <CardContent>
          {!showAddHabit ? (
            <Button onClick={() => setShowAddHabit(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Habit
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Habit Name</Label>
                  <Input
                    placeholder="e.g., Drink 8 glasses of water"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newHabit.category}
                    onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
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
                <div className="space-y-2">
                  <Label>Weekly Goal: {newHabit.weeklyGoal} times</Label>
                  <Slider
                    value={[newHabit.weeklyGoal]}
                    onValueChange={(value) => setNewHabit({ ...newHabit, weeklyGoal: value[0] })}
                    max={7}
                    min={1}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={newHabit.difficulty}
                    onValueChange={(value) => setNewHabit({ ...newHabit, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Reminder Time</Label>
                  <Input
                    type="time"
                    value={newHabit.reminder}
                    onChange={(e) => setNewHabit({ ...newHabit, reminder: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {habitColors.map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full ${color} ${newHabit.color === color ? "ring-2 ring-gray-400" : ""}`}
                        onClick={() => setNewHabit({ ...newHabit, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Input
                  placeholder="Add notes or tips for this habit"
                  value={newHabit.notes}
                  onChange={(e) => setNewHabit({ ...newHabit, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addHabit} className="flex-1">
                  Create Habit
                </Button>
                <Button variant="outline" onClick={() => setShowAddHabit(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Habit Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="space-y-1">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`w-6 h-6 rounded-full mx-auto ${
                      index < habit.weeklyProgress ? habit.color : "bg-gray-200"
                    }`}
                    title={habit.name}
                  />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
