"use client"

import React, { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import { Plus, DollarSign, User, Calendar } from "lucide-react"
import { MoreHoriz } from "@mui/icons-material"

// Mock data
const initialDeals = [
  {
    id: "1",
    title: "مشروع تطوير الموقع",
    amount: 15000,
    client: "شركة التقنية المتقدمة",
    stage: "potential",
    expectedCloseDate: "2024-03-15",
    description: "تطوير موقع إلكتروني متكامل للشركة",
  },
  {
    id: "2",
    title: "خدمات الاستشارة التقنية",
    amount: 8500,
    client: "مؤسسة الابتكار",
    stage: "negotiation",
    expectedCloseDate: "2024-02-28",
    description: "استشارات تقنية لتحسين الأنظمة",
  },
  {
    id: "3",
    title: "تطبيق الهاتف المحمول",
    amount: 25000,
    client: "شركة البناء الحديث",
    stage: "won",
    expectedCloseDate: "2024-01-30",
    description: "تطوير تطبيق إدارة المشاريع",
  },
  {
    id: "4",
    title: "نظام إدارة المخزون",
    amount: 12000,
    client: "مكتب الاستشارات القانونية",
    stage: "lost",
    expectedCloseDate: "2024-02-15",
    description: "نظام متكامل لإدارة المخزون",
  },
]

const stages = [
  { id: "potential", title: "محتملة", color: "info.main" },
  { id: "negotiation", title: "تفاوض", color: "warning.main" },
  { id: "won", title: "مربوحة", color: "success.main" },
  { id: "lost", title: "خاسرة", color: "error.main" },
]

export default function DealsKanban() {
  const [deals, setDeals] = useState(initialDeals)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDeal(dealId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault()
    if (draggedDeal) {
      setDeals((prevDeals) =>
        prevDeals.map((deal) => (deal.id === draggedDeal ? { ...deal, stage: newStage } : deal))
      )
      setDraggedDeal(null)
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("ar-EG", { style: "currency", currency: "ILS" }).format(amount)

  const handleAddDeal = (deal: any) => {
    setDeals([...deals, { ...deal, id: Date.now().toString() }])
    setIsAddModalOpen(false)
  }

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((deal) => deal.id !== dealId))
  }

  return (
    <Box>
      {/* Stages Badges */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box display="flex" gap={2}>
          {stages.map((stage) => {
            const count = deals.filter((d) => d.stage === stage.id).length
            return (
              <Badge key={stage.id} badgeContent={count} color="primary">
                <Typography>{stage.title}</Typography>
              </Badge>
            )
          })}
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setIsAddModalOpen(true)}
        >
          إضافة صفقة
        </Button>
      </Box>

      {/* Kanban Columns */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {stages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.id)
          return (
            <Box
              key={stage.id}
              flex="1 1 22%"
              minHeight={500}
              bgcolor="grey.100"
              borderRadius={1}
              p={2}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <Typography variant="h6" mb={2}>
                {stage.title} ({stageDeals.length})
              </Typography>
              {stageDeals.map((deal) => (
                <Card
                  key={deal.id}
                  sx={{ mb: 2, cursor: "move" }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                >
                  <CardHeader
                    title={<Typography variant="subtitle2">{deal.title}</Typography>}
                    action={
                      <IconButton onClick={() => handleDeleteDeal(deal.id)}>
                        <MoreHoriz fontSize="small" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <DollarSign fontSize="small" color="success" />
                      <Typography fontWeight="bold">{formatCurrency(deal.amount)}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <User fontSize="small" />
                      <Typography fontSize="body2" noWrap>
                        {deal.client}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Calendar fontSize="small" />
                      <Typography fontSize="caption">
                        {new Date(deal.expectedCloseDate).toLocaleDateString("ar-EG")}
                      </Typography>
                    </Box>
                    {deal.description && (
                      <Typography variant="body2" mt={1} noWrap>
                        {deal.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )
        })}
      </Box>

      {/* Add Deal Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>إضافة صفقة جديدة</DialogTitle>
        <DialogContent>
          {/* Form inputs ici (titre, montant, client, stage...) */}
          <Typography variant="body2">Formulaire de création de deal à compléter ici</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddModalOpen(false)}>إلغاء</Button>
          <Button onClick={() => handleAddDeal({ title: "صفقة جديدة", amount: 1000, client: "عميل جديد", stage: "potential" })}>
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
