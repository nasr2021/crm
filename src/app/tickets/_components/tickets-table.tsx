"use client"

import React, { useState } from "react"
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
} from "@mui/material"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
} from "lucide-react"

// Mock data
const mockTickets = [
  {
    id: "1",
    subject: "مشكلة في تسجيل الدخول",
    client: "شركة التقنية المتقدمة",
    status: "open",
    priority: "high",
    assignedTo: "أحمد محمد",
    createdAt: "2024-03-01",
    description: "العميل يواجه صعوبة في تسجيل الدخول إلى النظام.",
  },
  {
    id: "2",
    subject: "طلب تعديل في التقرير",
    client: "مؤسسة الابتكار",
    status: "in-progress",
    priority: "medium",
    assignedTo: "فاطمة أحمد",
    createdAt: "2024-02-28",
    description: "العميل يطلب إضافة حقول جديدة في التقرير.",
  },
]

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

export function TicketsTable() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [menuTicketId, setMenuTicketId] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.includes(searchTerm) ||
      ticket.client.includes(searchTerm) ||
      ticket.assignedTo.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, ticketId: string) => {
    setMenuAnchor(event.currentTarget)
    setMenuTicketId(ticketId)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
    setMenuTicketId(null)
  }

  const handleViewTicket = (ticket: typeof mockTickets[0]) => {
    setSelectedTicket(ticket)
    setIsDrawerOpen(true)
    handleCloseMenu()
  }

  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((t) => t.id !== ticketId))
    handleCloseMenu()
  }

  return (
    <Box dir="rtl">
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">
              قائمة التذاكر ({filteredTickets.length})
            </Typography>
          }
          action={
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="البحث في التذاكر..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outlined" startIcon={<Filter />}>
                الحالة: {statusFilter === "all" ? "الكل" : statusLabels[statusFilter]}
              </Button>
              <Button variant="outlined" startIcon={<Filter />}>
                الأولوية: {priorityFilter === "all" ? "الكل" : priorityLabels[priorityFilter]}
              </Button>
              <Button variant="contained" color="primary" startIcon={<Plus />} onClick={() => setIsAddDialogOpen(true)}>
                إضافة تذكرة
              </Button>
            </Stack>
          }
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>الموضوع</TableCell>
                  <TableCell>العميل</TableCell>
                  <TableCell>الحالة</TableCell>
                  <TableCell>الأولوية</TableCell>
                  <TableCell>مُكلف إلى</TableCell>
                  <TableCell>تاريخ الإنشاء</TableCell>
                  <TableCell>الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.client}</TableCell>
                    <TableCell>
                      <Chip label={statusLabels[ticket.status]} color={statusColors[ticket.status]} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={priorityLabels[ticket.priority]} color={priorityColors[ticket.priority]} size="small" />
                    </TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>{new Date(ticket.createdAt).toLocaleDateString("ar-EG")}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, ticket.id)}>
                        <MoreHorizontal size={16} />
                      </IconButton>
                      <Menu anchorEl={menuAnchor} open={menuTicketId === ticket.id && Boolean(menuAnchor)} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => handleViewTicket(ticket)}>
                          <Eye size={16} style={{ marginLeft: 8 }} />
                          عرض التفاصيل
                        </MenuItem>
                        <MenuItem>
                          <Edit size={16} style={{ marginLeft: 8 }} />
                          تعديل
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteTicket(ticket.id)} style={{ color: "red" }}>
                          <Trash2 size={16} style={{ marginLeft: 8 }} />
                          حذف
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Ticket Detail Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6">{selectedTicket?.subject}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>{selectedTicket?.description}</Typography>
        </Box>
      </Drawer>

      {/* Add Ticket Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
        <DialogTitle>إضافة تذكرة جديدة</DialogTitle>
        <DialogContent>
          <TextField label="الموضوع" fullWidth margin="dense" />
          <TextField label="العميل" fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
          <Button variant="contained" color="primary">حفظ</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
