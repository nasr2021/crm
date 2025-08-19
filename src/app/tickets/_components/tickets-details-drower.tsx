"use client"

import { useState } from "react"
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material"

import { Ticket, User, Calendar, Clock, MessageSquare, Edit, Save } from "lucide-react"

interface TicketDetailDrawerProps {
  ticket: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateTicket: (ticket: any) => void
  users: Array<{ id: string; name: string }>
}

export function TicketDetailDrawer({ ticket, open, onOpenChange, onUpdateTicket, users }: TicketDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    status: "",
    priority: "",
    assignedToId: "",
    assignedTo: "",
    description: "",
  })

  if (!ticket) return null

  const handleEdit = () => {
    setEditData({
      status: ticket.status,
      priority: ticket.priority,
      assignedToId: ticket.assignedToId,
      assignedTo: ticket.assignedTo,
      description: ticket.description,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    const selectedUser = users.find((user) => user.id === editData.assignedToId)
    const updatedTicket = {
      ...ticket,
      ...editData,
      assignedTo: selectedUser?.name || editData.assignedTo,
      updatedAt: new Date().toISOString().split("T")[0],
    }
    onUpdateTicket(updatedTicket)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      status: "",
      priority: "",
      assignedToId: "",
      assignedTo: "",
      description: "",
    })
  }

  const statusLabels: Record<string, string> = {
    open: "مفتوحة",
    "in-progress": "قيد المعالجة",
    resolved: "محلولة",
    closed: "مغلقة",
  }

  const priorityLabels: Record<string, string> = {
    urgent: "عاجل",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
  }

  const statusColors: Record<string, "error" | "info" | "success" | "default"> = {
    open: "error",
    "in-progress": "info",
    resolved: "success",
    closed: "default",
  }

  const priorityColors: Record<string, "error" | "warning" | "info" | "success"> = {
    urgent: "error",
    high: "warning",
    medium: "info",
    low: "success",
  }

  return (
    <Drawer anchor="right" open={open} onClose={() => onOpenChange(false)}>
      <Box sx={{ width: 450, p: 3 }} dir="rtl">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">{ticket.subject}</Typography>
            <Typography variant="body2" color="textSecondary">
              تذكرة رقم: #{ticket.id}
            </Typography>
          </Box>
          {!isEditing ? (
            <Button variant="outlined" size="small" startIcon={<Edit />} onClick={handleEdit}>
              تعديل
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={handleCancel}>
                إلغاء
              </Button>
              <Button variant="contained" size="small" color="primary" startIcon={<Save />} onClick={handleSave}>
                حفظ
              </Button>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Ticket Info */}
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Ticket size={18} />
            <Typography variant="subtitle2">العميل:</Typography>
            <Typography variant="body2">{ticket.client}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">الحالة:</Typography>
            {isEditing ? (
              <FormControl fullWidth size="small">
                <InputLabel>الحالة</InputLabel>
                <Select
                  value={editData.status}
                  label="الحالة"
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                >
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Chip label={statusLabels[ticket.status]} color={statusColors[ticket.status]} size="small" />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">الأولوية:</Typography>
            {isEditing ? (
              <FormControl fullWidth size="small">
                <InputLabel>الأولوية</InputLabel>
                <Select
                  value={editData.priority}
                  label="الأولوية"
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                >
                  {Object.entries(priorityLabels).map(([key, label]) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Chip label={priorityLabels[ticket.priority]} color={priorityColors[ticket.priority]} size="small" />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <User size={18} />
            <Typography variant="subtitle2">مُكلف إلى:</Typography>
            {isEditing ? (
              <FormControl fullWidth size="small">
                <InputLabel>الموظف</InputLabel>
                <Select
                  value={editData.assignedToId}
                  label="الموظف"
                  onChange={(e) => {
                    const selectedUser = users.find((u) => u.id === e.target.value)
                    setEditData({
                      ...editData,
                      assignedToId: e.target.value,
                      assignedTo: selectedUser?.name || "",
                    })
                  }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography variant="body2">{ticket.assignedTo}</Typography>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Calendar size={18} />
            <Typography variant="subtitle2">تاريخ الإنشاء:</Typography>
            <Typography variant="body2">{new Date(ticket.createdAt).toLocaleDateString("ar-EG")}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Clock size={18} />
            <Typography variant="subtitle2">آخر تحديث:</Typography>
            <Typography variant="body2">{new Date(ticket.updatedAt).toLocaleDateString("ar-EG")}</Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MessageSquare size={18} />
              <Typography variant="subtitle2">وصف المشكلة:</Typography>
            </Stack>
            {isEditing ? (
              <TextField
                multiline
                minRows={4}
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {ticket.description}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  )
}
