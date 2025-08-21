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
import { useClients } from "@/hooks/clientHook"
import { useClientMutation, useClientUpdateMutation, useClientDeleteMutation } from "@/app/mutation/client-mutation"


export function ClientsTable() {
  const {mutate:deleteClient} = useClientDeleteMutation()

  // Move all hooks to the top level
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<any | null>(null);

  // Data fetching with React Query
  const {data, isLoading, isError} = useClients({});
  


  // Loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error loading clients data</div>;
  }





  const handleDeleteClient = (clientId: string) => {
    deleteClient(clientId)
  }



  return (
    <Box>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} gap={2}>
        <Typography variant="h6">
          قائمة العملاء ({data?.data?.length})
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
              <TableCell sx={{ cursor: "pointer" }}>الاسم</TableCell>
              <TableCell  sx={{ cursor: "pointer" }}>الشركة</TableCell>
              <TableCell>البريد الإلكتروني</TableCell>
              <TableCell>الهاتف</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell  sx={{ cursor: "pointer" }}>تاريخ الإنشاء</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((client:any) => (

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
                  <IconButton onClick={() => setIsDetailDrawerOpen(true)}>

                    <Visibility />
                  </IconButton>
                  <IconButton onClick={()=>{setIsAddModalOpen(true); setSelectedClient(client)}} >


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

      <AddClientModal data={selectedClient} open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddClient={() => setIsAddModalOpen(false)} />


<ClientDetailDrawer
  client={deleteClient ? { ...deleteClient } : undefined}
  open={isDetailDrawerOpen}
  onOpenChange={setIsDetailDrawerOpen}
/>

    </Box>
  )
}
