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
  Box,
  Typography,
} from "@mui/material"

interface AddClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClient: (client: any) => void
}

export function AddClientModal({ open, onOpenChange, onAddClient }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "active",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddClient(formData)
    setFormData({ name: "", company: "", email: "", phone: "", status: "active", notes: "" })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} fullWidth maxWidth="sm">
      <DialogTitle>إضافة عميل جديد</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          أدخل معلومات العميل الجديد في النموذج أدناه
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="الاسم الكامل *"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            dir="rtl"
          />
          <TextField
            label="اسم الشركة *"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            required
            dir="rtl"
          />
          <TextField
            label="البريد الإلكتروني *"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            dir="ltr"
          />
          <TextField
            label="رقم الهاتف *"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            dir="ltr"
          />
          <TextField
            select
            label="الحالة"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <MenuItem value="active">نشط</MenuItem>
            <MenuItem value="inactive">غير نشط</MenuItem>
          </TextField>
          <TextField
            label="ملاحظات"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            multiline
            rows={3}
            dir="rtl"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onOpenChange(false)}>
          إلغاء
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          إضافة العميل
        </Button>
      </DialogActions>
    </Dialog>
  )
}
