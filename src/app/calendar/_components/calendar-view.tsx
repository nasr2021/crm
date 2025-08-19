"use client"

import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Box,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material"
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material"
import { AddEventModal } from "./add-event-modal"

interface Event {
  id: string
  title: string
  type: "deal" | "task" | "meeting"
  date: string
  time: string
  client?: string
  status?: string
  description?: string
}

const mockEvents: Event[] = [
  { id: "deal-1", title: "إغلاق صفقة مشروع التطوير", type: "deal", date: "2024-03-15", time: "14:00", client: "شركة التقنية المتقدمة", status: "potential", description: "موعد إغلاق صفقة تطوير الموقع الإلكتروني" },
  { id: "task-1", title: "مراجعة المتطلبات الفنية", type: "task", date: "2024-03-15", time: "09:00", client: "شركة التقنية المتقدمة", status: "todo", description: "مراجعة وتحليل المتطلبات الفنية للمشروع الجديد" },
  { id: "meeting-1", title: "اجتماع مع العميل الجديد", type: "meeting", date: "2024-03-18", time: "13:00", client: "شركة الحلول الذكية", description: "اجتماع تعريفي مع العميل الجديد لمناقشة المتطلبات" },
]

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [typeFilter, setTypeFilter] = useState<"all" | "deal" | "task" | "meeting">("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const filteredEvents = events.filter(e => typeFilter === "all" || e.type === typeFilter)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null)
    for (let day = 1; day <= lastDay.getDate(); day++) days.push(new Date(year, month, day))

    return days
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split("T")[0]
    return filteredEvents.filter(e => e.date === dateStr)
  }

  const navigateMonth = (dir: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (dir === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const monthNames = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
  const dayNames = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]
  const days = getDaysInMonth(currentDate)

  const getEventColor = (type: string) => {
    switch(type){
      case "deal": return "success"
      case "task": return "info"
      case "meeting": return "secondary"
      default: return "default"
    }
  }

  const isToday = (date: Date | null) => date ? date.toDateString() === new Date().toDateString() : false

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</Typography>}
        action={
          <Box display="flex" gap={1}>
            <IconButton onClick={() => navigateMonth("prev")}><ChevronLeft /></IconButton>
            <IconButton onClick={() => navigateMonth("next")}><ChevronRight /></IconButton>
          </Box>
        }
      />
      <CardContent>
        {/* Filter and Add */}
        <Box display="flex" gap={2} mb={2}>
          <FormControl size="small">
            <InputLabel>تصفية حسب النوع</InputLabel>
            <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)} label="تصفية حسب النوع">
              <MenuItem value="all">جميع الأحداث</MenuItem>
              <MenuItem value="deal">الصفقات</MenuItem>
              <MenuItem value="task">المهام</MenuItem>
              <MenuItem value="meeting">الاجتماعات</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsAddEventOpen(true)}
          >
            إضافة حدث
          </Button>
        </Box>

        {/* Days header */}
        <Box display="flex" gap={1} mb={1}>
          {dayNames.map(day => (
            <Box key={day} flex={1} textAlign="center">
              <Typography>{day}</Typography>
            </Box>
          ))}
        </Box>

        {/* Calendar */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {days.map((date, idx) => {
            const dayEvents = getEventsForDate(date)
            return (
              <Box
                key={idx}
                flex={`1 0 calc(100% / 7 - 8px)`}
                minWidth={0}
                p={1}
                minHeight={100}
                border={1}
                borderColor={isToday(date) ? "primary.main" : "grey.300"}
                borderRadius={1}
                sx={{ boxSizing: "border-box" }}
              >
                {date && (
                  <Typography variant="body2" color={isToday(date) ? "primary" : "textPrimary"}>
                    {date.getDate()}
                  </Typography>
                )}
                {dayEvents.map(ev => (
                  <Chip
                    key={ev.id}
                    label={`${ev.title} (${ev.time})`}
                    color={getEventColor(ev.type)}
                    size="small"
                    onClick={() => handleEventClick(ev)}
                    sx={{ mt: 0.5, width: '100%', textAlign: 'left' }}
                  />
                ))}
              </Box>
            )
          })}
        </Box>
      </CardContent>

      {/* Event Detail Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', bgcolor:'background.paper', p:3, borderRadius:2, width:400 }}>
          {selectedEvent && (
            <>
              <Typography variant="h6" mb={1}>{selectedEvent.title}</Typography>
              <Typography variant="body2" color="textSecondary" mb={1}>العميل: {selectedEvent.client || 'داخلي'}</Typography>
              <Typography variant="body2" color="textSecondary" mb={1}>التاريخ: {selectedEvent.date} - {selectedEvent.time}</Typography>
              <Typography variant="body2">{selectedEvent.description}</Typography>
              <Box mt={2}><Button variant="contained" fullWidth onClick={()=>setIsModalOpen(false)}>إغلاق</Button></Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Add Event Modal */}
      <AddEventModal
        open={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={(event) => {
          setEvents((prev) => [
            ...prev,
            { ...event, id: `${event.type}-${Date.now()}` }
          ])
          setIsAddEventOpen(false)
        }}
      />
    </Card>
  )
}
