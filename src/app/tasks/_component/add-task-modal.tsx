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
  InputLabel,
  FormControl,
  Box,
} from "@mui/material"

// Mock clients data
const mockClients = [
  { id: "1", name: "شركة التقنية المتقدمة" },
  { id: "2", name: "مؤسسة الابتكار" },
  { id: "3", name: "شركة البناء الحديث" },
  { id: "4", name: "مكتب الاستشارات القانونية" },
]

// Mock users for assignment
const mockUsers = [
  { id: "user1", name: "أحمد محمد" },
  { id: "user2", name: "فاطمة أحمد" },
  { id: "user3", name: "محمد علي" },
  { id: "user4", name: "سارة خالد" },
]

interface Task {
  id: string // <-- Corrigez ici : 'id' doit être obligatoire et de type 'string'
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  client: string
  clientId: string
  assignedTo: string
  assignedToId: string
  category: string
}

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddTask: (task: Task) => void
}

export function AddTaskModal({ open, onOpenChange, onAddTask }: AddTaskModalProps) {
  const [formData, setFormData] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    client: "",
    clientId: "",
    assignedTo: "",
    assignedToId: "",
    category: "development",
  })

  const handleInputChange = (field: keyof Task, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const selectedClient = mockClients.find((client) => client.id === formData.clientId)
    const selectedUser = mockUsers.find((user) => user.id === formData.assignedToId)

    // Correction: Ajout d'un id unique pour la nouvelle tâche
    const newTask: Task = {
      ...formData,
      client: selectedClient?.name || "",
      assignedTo: selectedUser?.name || "",
      id: Date.now().toString(),
    }

    onAddTask(newTask)

    setFormData({
        id: "",
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      client: "",
      clientId: "",
      assignedTo: "",
      assignedToId: "",
      category: "development",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} fullWidth maxWidth="sm">
      <DialogTitle>إضافة مهمة جديدة</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="عنوان المهمة *"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
            dir="rtl"
          />
          <TextField
            label="وصف المهمة"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            multiline
            rows={3}
            dir="rtl"
          />
          <TextField
            label="تاريخ الاستحقاق *"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
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
            <InputLabel>الفئة</InputLabel>
            <Select
              value={formData.category}
              label="الفئة"
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <MenuItem value="development">تطوير</MenuItem>
              <MenuItem value="testing">اختبار</MenuItem>
              <MenuItem value="documentation">توثيق</MenuItem>
              <MenuItem value="presentation">عرض</MenuItem>
              <MenuItem value="training">تدريب</MenuItem>
              <MenuItem value="other">أخرى</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>العميل المرتبط</InputLabel>
            <Select
              value={formData.clientId}
              label="العميل المرتبط"
              onChange={(e) => handleInputChange("clientId", e.target.value)}
            >
              {mockClients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>تكليف إلى *</InputLabel>
            <Select
              value={formData.assignedToId}
              label="تكليف إلى"
              onChange={(e) => handleInputChange("assignedToId", e.target.value)}
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
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onOpenChange(false)}>
          إلغاء
        </Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          إضافة المهمة
        </Button>
      </DialogActions>
    </Dialog>
  )
}
