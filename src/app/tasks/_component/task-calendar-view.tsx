"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Badge,
  Box,
  Tooltip,
} from "@mui/material"
import { Grid } from "@mui/material"
import { ChevronLeft, ChevronRight, Person } from "@mui/icons-material"

interface Task {
  id: string
  title: string
  status: string
  priority: string
  dueDate: string
  client: string
  assignedTo: string
}

interface TaskCalendarViewProps {
  tasks: Task[]
  onUpdateTaskStatus: (taskId: string, status: string) => void
}

export function TaskCalendarView({ tasks, onUpdateTaskStatus }: TaskCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "default"
      case "in-progress":
        return "primary"
      case "completed":
        return "success"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "error"
      case "high":
        return "warning"
      case "medium":
        return "info"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "قيد الانتظار"
      case "in-progress":
        return "قيد التنفيذ"
      case "completed":
        return "مكتملة"
      case "cancelled":
        return "ملغية"
      default:
        return status
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "عاجل"
      case "high":
        return "عالية"
      case "medium":
        return "متوسطة"
      case "low":
        return "منخفضة"
      default:
        return priority
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))

    return days
  }

  const getTasksForDate = (date: Date | null) => {
    if (!date) return []
    const dateString = date.toISOString().split("T")[0]
    return tasks.filter((task) => task.dueDate === dateString)
  }

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      dir === "prev" ? newDate.setMonth(prev.getMonth() - 1) : newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
  ]
  const dayNames = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]

  const isToday = (date: Date | null) => date ? date.toDateString() === new Date().toDateString() : false
  const isOverdue = (date: Date | null) => date ? date < new Date() && date.toDateString() !== new Date().toDateString() : false

  return (
    <Card>
      <CardHeader
        title={`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
        action={
          <Box display="flex" gap={1}>
            <Button variant="outlined" size="small" onClick={() => navigateMonth("prev")}>
              <ChevronLeft fontSize="small" />
            </Button>
            <Button variant="outlined" size="small" onClick={() => navigateMonth("next")}>
              <ChevronRight fontSize="small" />
            </Button>
          </Box>
        }
      />
      <CardContent>
        {/* Days of the week */}
        <Box display="flex" justifyContent="space-between" mb={1}>
  {dayNames.map((day) => (
    <Box key={day} flex="1" textAlign="center">
      <Typography variant="body2" color="text.secondary">
        {day}
      </Typography>
    </Box>
  ))}
</Box>

        {/* Calendar dates */}
        <Grid container spacing={0.5} mt={1}>
          {days.map((date, idx) => {
            const dayTasks = getTasksForDate(date)
            const isCellToday = isToday(date)
            const isCellOverdue = isOverdue(date) && dayTasks.some((t) => t.status !== "completed")
            return (
             <Box
  key={idx}
  sx={{
    flex: "1 0 14.28%", // équivalent de 1/7 pour 7 colonnes
    minHeight: 120,
    border: 1,
    borderColor: date
      ? isCellToday
        ? "primary.main"
        : isCellOverdue
        ? "error.light"
        : "grey.300"
      : "grey.200",
    backgroundColor: date
      ? isCellToday
        ? "primary.light"
        : isCellOverdue
        ? "error.lighter"
        : "background.paper"
      : "grey.100",
    p: 1,
    borderRadius: 1,
    overflow: "hidden",
    boxSizing: "border-box",
  }}
>
                {date && (
                  <>
                    <Typography variant="body2" fontWeight="medium" color={isCellToday ? "primary.main" : "text.primary"}>
                      {date.getDate()}
                    </Typography>

                    <Box mt={0.5} display="flex" flexDirection="column" gap={0.5}>
                      {dayTasks.slice(0, 3).map((task) => (
                        <Tooltip key={task.id} title={task.title} arrow>
                          <Box
                            sx={{
                              p: 0.5,
                              border: 1,
                              borderColor: "grey.300",
                              borderRadius: 0.5,
                              cursor: "pointer",
                              "&:hover": { boxShadow: 2 },
                            }}
                            onClick={() => {
                              if (task.status === "todo") onUpdateTaskStatus(task.id, "in-progress")
                              else if (task.status === "in-progress") onUpdateTaskStatus(task.id, "completed")
                            }}
                          >
                            <Typography variant="caption" noWrap fontWeight="medium">{task.title}</Typography>
                            <Box display="flex" gap={0.5} mt={0.5} flexWrap="wrap">
                              <Badge color={getStatusColor(task.status)} badgeContent={getStatusText(task.status)} />
                              <Badge color={getPriorityColor(task.priority)} badgeContent={getPriorityText(task.priority)} />
                            </Box>
                            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                              <Person fontSize="small" />
                              <Typography variant="caption" noWrap>{task.client}</Typography>
                            </Box>
                          </Box>
                        </Tooltip>
                      ))}
                      {dayTasks.length > 3 && (
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                          +{dayTasks.length - 3} مهام أخرى
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}
