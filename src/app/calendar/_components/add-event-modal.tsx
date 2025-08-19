"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Box,
} from "@mui/material"

// Mock clients et users
const mockClients = [
  { id: "1", name: "شركة التقنية المتقدمة" },
  { id: "2", name: "مؤسسة الابتكار" },
  { id: "3", name: "شركة البناء الحديث" },
  { id: "4", name: "مكتب الاستشارات القانونية" },
]

const mockUsers = [
  { id: "user1", name: "أحمد محمد" },
  { id: "user2", name: "فاطمة أحمد" },
  { id: "user3", name: "محمد علي" },
  { id: "user4", name: "سارة خالد" },
]

interface AddEventModalProps {
  open: boolean
  onClose: () => void
  onAddEvent: (event: any) => void
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ open, onClose, onAddEvent }) => {
  const [eventType, setEventType] = useState<"meeting" | "task" | "deal">("meeting")
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    date: "",
    time: "",
    clientId: "",
    client: "",
    // Deal
    amount: "",
    status: "potential",
    // Task
    assignedToId: "",
    assignedTo: "",
    priority: "medium",
    // Meeting
    location: "",
    attendees: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleClientChange = (clientId: string) => {
    const client = mockClients.find((c) => c.id === clientId)
    setFormData((prev: any) => ({ ...prev, clientId, client: client?.name || "" }))
  }

  const handleUserChange = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId)
    setFormData((prev: any) => ({ ...prev, assignedToId: userId, assignedTo: user?.name || "" }))
  }

  const handleAttendeesChange = (value: string) => {
    const list = value.split(",").map((s) => s.trim()).filter(Boolean)
    setFormData((prev: any) => ({ ...prev, attendees: list }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const baseEvent = {
      title: formData.title,
      description: formData.description,
      type: eventType,
      date: formData.date,
      time: formData.time,
      client: formData.client,
      clientId: formData.clientId,
    }

    let specificData = {}
    if (eventType === "deal") {
      specificData = { amount: parseFloat(formData.amount), status: formData.status }
    } else if (eventType === "task") {
      specificData = {
        assignedTo: formData.assignedTo,
        assignedToId: formData.assignedToId,
        priority: formData.priority,
        status: "todo",
      }
    } else if (eventType === "meeting") {
      specificData = { location: formData.location, attendees: formData.attendees }
    }

    onAddEvent({ ...baseEvent, ...specificData })

    // Reset form
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      clientId: "",
      client: "",
      amount: "",
      status: "potential",
      assignedToId: "",
      assignedTo: "",
      priority: "medium",
      location: "",
      attendees: [],
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle>إضافة حدث جديد</DialogTitle>
      <DialogContent>
        <Tabs
          value={eventType}
          onChange={(e, newValue) => setEventType(newValue)}
          variant="fullWidth"
        >
          <Tab label="اجتماع" value="meeting" />
          <Tab label="مهمة" value="task" />
          <Tab label="صفقة" value="deal" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="العنوان *"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
            fullWidth
            dir="rtl"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="التاريخ *"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="الوقت *"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>العميل</InputLabel>
            <Select
              value={formData.clientId}
              label="العميل"
              onChange={(e) => handleClientChange(e.target.value)}
            >
              {mockClients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Type-specific fields */}
          {eventType === "deal" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="قيمة الصفقة (شيكل) *"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                required
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>حالة الصفقة</InputLabel>
                <Select
                  value={formData.status}
                  label="حالة الصفقة"
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <MenuItem value="potential">محتملة</MenuItem>
                  <MenuItem value="negotiation">تفاوض</MenuItem>
                  <MenuItem value="won">مربوحة</MenuItem>
                  <MenuItem value="lost">خاسرة</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {eventType === "task" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select
                  value={formData.priority}
                  label="الأولوية"
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                >
                  <MenuItem value="urgent">عاجل</MenuItem>
                  <MenuItem value="high">عالية</MenuItem>
                  <MenuItem value="medium">متوسطة</MenuItem>
                  <MenuItem value="low">منخفضة</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>تكليف إلى *</InputLabel>
                <Select
                  value={formData.assignedToId}
                  label="تكليف إلى"
                  onChange={(e) => handleUserChange(e.target.value)}
                  required
                >
                  {mockUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {eventType === "meeting" && (
            <>
              <TextField
                label="المكان"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                fullWidth
              />
              <TextField
                label="الحضور (مفصولة بفواصل)"
                value={formData.attendees.join(", ")}
                onChange={(e) => handleAttendeesChange(e.target.value)}
                fullWidth
              />
            </>
          )}

          <TextField
            label="الوصف"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <DialogActions sx={{ justifyContent: "flex-start" }}>
            <Button variant="outlined" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" variant="contained" color="primary">
              إضافة الحدث
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
