"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material"
import { Search, Filter, MoreVert, Edit, Delete, Visibility, Add } from "@mui/icons-material"
import { ClientDetailDrawer } from "./client-detail-drawer"
import { AddClientModal } from "./add-client-modal"
// Mock data
const mockClients = [
  {
    id: "1",
    name: "أحمد محمد",
    company: "شركة التقنية المتقدمة",
    email: "ahmed@tech-advanced.com",
    phone: "+970-59-123-4567",
    createdAt: "2024-01-15",
    status: "active",
    deals: 3,
    tasks: 2,
    tickets: 1,
  },
  {
    id: "2",
    name: "فاطمة أحمد",
    company: "مؤسسة الابتكار",
    email: "fatima@innovation.ps",
    phone: "+970-59-234-5678",
    createdAt: "2024-01-20",
    status: "active",
    deals: 1,
    tasks: 0,
    tickets: 0,
  },
  {
    id: "3",
    name: "محمد علي",
    company: "شركة البناء الحديث",
    email: "mohammed@modern-build.com",
    phone: "+970-59-345-6789",
    createdAt: "2024-02-01",
    status: "inactive",
    deals: 0,
    tasks: 1,
    tickets: 2,
  },
  {
    id: "4",
    name: "سارة خالد",
    company: "مكتب الاستشارات القانونية",
    email: "sara@legal-consult.ps",
    phone: "+970-59-456-7890",
    createdAt: "2024-02-10",
    status: "active",
    deals: 2,
    tasks: 3,
    tickets: 0,
  },
]

export function ClientsTable() {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof typeof mockClients[0]>("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)

  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1
      return aValue < bValue ? 1 : -1
    })

  const handleSort = (field: keyof typeof mockClients[0]) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const handleViewClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client)
    setIsDetailDrawerOpen(true)
  }

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((c) => c.id !== clientId))
  }

  const handleAddClient = (newClient: any) => {
    const client = {
      ...newClient,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      deals: 0,
      tasks: 0,
      tickets: 0,
    }
    setClients([...clients, client])
  }

  return (
    <Box>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} gap={2}>
        <Typography variant="h6">
          قائمة العملاء ({filteredClients.length})
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <TextField
            placeholder="البحث بالاسم أو الشركة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{ startAdornment: <Search /> }}
            dir="rtl"
          />
          <Button variant="outlined" startIcon={<Filter />}>
            ترتيب حسب
          </Button>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setIsAddModalOpen(true)}>
            إضافة عميل
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("name")} sx={{ cursor: "pointer" }}>الاسم</TableCell>
              <TableCell onClick={() => handleSort("company")} sx={{ cursor: "pointer" }}>الشركة</TableCell>
              <TableCell>البريد الإلكتروني</TableCell>
              <TableCell>الهاتف</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell onClick={() => handleSort("createdAt")} sx={{ cursor: "pointer" }}>تاريخ الإنشاء</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.company}</TableCell>
                <TableCell dir="ltr">{client.email}</TableCell>
                <TableCell dir="ltr">{client.phone}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: client.status === "active" ? "success.main" : "grey.500",
                      color: "white",
                      px: 1,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    {client.status === "active" ? "نشط" : "غير نشط"}
                  </Box>
                </TableCell>
                <TableCell>{new Date(client.createdAt).toLocaleDateString("ar-EG")}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewClient(client)}>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClient(client.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddClientModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddClient={handleAddClient} />
      <ClientDetailDrawer client={selectedClient} open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen} />
    </Box>
  )
}
