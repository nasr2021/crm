"use client"

import React from "react"
import {
  Drawer,
  Typography,
  IconButton,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Box,
  Button,
} from "@mui/material"
import {
  Edit,
  Person,
  Business,
  MailOutline,
  Phone,
  CalendarToday,
  Handshake,
  CheckCircleOutline,
  ConfirmationNumber,
} from "@mui/icons-material"

interface ClientDetailDrawerProps {
  client: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockDeals = [
  {
    id: "1",
    title: "مشروع تطوير الموقع",
    amount: "₪15,000",
    stage: "negotiation",
    expectedCloseDate: "2024-03-15",
  },
  {
    id: "2",
    title: "خدمات الاستشارة التقنية",
    amount: "₪8,500",
    stage: "won",
    expectedCloseDate: "2024-02-28",
  },
]

const mockTasks = [
  { id: "1", title: "مراجعة المتطلبات", status: "in-progress", dueDate: "2024-03-10" },
  { id: "2", title: "إعداد العرض التقديمي", status: "completed", dueDate: "2024-02-25" },
]

const mockTickets = [
  { id: "1", subject: "مشكلة في النظام", status: "open", createdAt: "2024-03-01" },
]

const getBadgeColor = (type: "stage" | "status", value: string) => {
  const mapping: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
    won: "success",
    negotiation: "warning",
    potential: "info",
    lost: "error",
    completed: "success",
    "in-progress": "info",
    open: "error",
  }
  return mapping[value] || "default"
}

export const ClientDetailDrawer: React.FC<ClientDetailDrawerProps> = ({ client, open, onOpenChange }) => {
  if (!client) return null

  return (
    <Drawer anchor="right" open={open} onClose={() => onOpenChange(false)}>
      <Box sx={{ width: { xs: 350, sm: 500 }, p: 2, direction: "rtl" }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">{client.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {client.company}
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<Edit />}>
            تعديل
          </Button>
        </Box>

        {/* Client Info */}
        <Card sx={{ mb: 2 }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <Person />
                <Typography variant="subtitle1">معلومات العميل</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Business />
                <Typography variant="body2" color="text.secondary">
                  الشركة:
                </Typography>
                <Typography variant="body1">{client.company}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <MailOutline />
                <Typography variant="body2" color="text.secondary">
                  البريد الإلكتروني:
                </Typography>
                <Typography variant="body1" dir="ltr">
                  {client.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Phone />
                <Typography variant="body2" color="text.secondary">
                  الهاتف:
                </Typography>
                <Typography variant="body1" dir="ltr">
                  {client.phone}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CalendarToday />
                <Typography variant="body2" color="text.secondary">
                  تاريخ الإنشاء:
                </Typography>
                <Typography variant="body1">
                  {new Date(client.createdAt).toLocaleDateString("ar-EG")}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="text.secondary">
                  الحالة:
                </Typography>
                <Chip
                  label={client.status === "active" ? "نشط" : "غير نشط"}
                  color={client.status === "active" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Divider sx={{ my: 2 }} />

        {/* Deals */}
        <Card sx={{ mb: 2 }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <Handshake />
                <Typography variant="subtitle1">الصفقات المرتبطة ({mockDeals.length})</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box>
              {mockDeals.map((deal) => (
                <Box key={deal.id} display="flex" justifyContent="space-between" p={1} border={1} borderRadius={1} borderColor="grey.300" mb={1}>
                  <Box>
                    <Typography variant="body1">{deal.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      تاريخ الإغلاق المتوقع: {new Date(deal.expectedCloseDate).toLocaleDateString("ar-EG")}
                    </Typography>
                  </Box>
                  <Box textAlign="left">
                    <Typography variant="body1" color="success.main" fontWeight="bold">
                      {deal.amount}
                    </Typography>
                    <Chip
                      label={
                        deal.stage === "won"
                          ? "مربوحة"
                          : deal.stage === "negotiation"
                          ? "تفاوض"
                          : "محتملة"
                      }
                      color={getBadgeColor("stage", deal.stage)}
                      size="small"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card sx={{ mb: 2 }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleOutline />
                <Typography variant="subtitle1">المهام المرتبطة ({mockTasks.length})</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box>
              {mockTasks.map((task) => (
                <Box key={task.id} display="flex" justifyContent="space-between" p={1} border={1} borderRadius={1} borderColor="grey.300" mb={1}>
                  <Box>
                    <Typography variant="body1">{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      تاريخ الاستحقاق: {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      task.status === "completed"
                        ? "مكتملة"
                        : task.status === "in-progress"
                        ? "قيد التنفيذ"
                        : "معلقة"
                    }
                    color={getBadgeColor("status", task.status)}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Tickets */}
        <Card sx={{ mb: 2 }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <ConfirmationNumber />
                <Typography variant="subtitle1">التذاكر المرتبطة ({mockTickets.length})</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box>
              {mockTickets.map((ticket) => (
                <Box key={ticket.id} display="flex" justifyContent="space-between" p={1} border={1} borderRadius={1} borderColor="grey.300" mb={1}>
                  <Box>
                    <Typography variant="body1">{ticket.subject}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      تاريخ الإنشاء: {new Date(ticket.createdAt).toLocaleDateString("ar-EG")}
                    </Typography>
                  </Box>
                  <Chip
                    label={ticket.status === "open" ? "مفتوحة" : "مغلقة"}
                    color={getBadgeColor("status", ticket.status)}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  )
}
