"use client"
import React from "react"
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material"
import { Users, DollarSign, Handshake, Ticket } from "lucide-react"

const stats = [
  {
    title: "إجمالي العملاء",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "إجمالي المبيعات",
    value: "₪45,231",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "الصفقات المربوحة",
    value: "89",
    change: "+23%",
    changeType: "positive" as const,
    icon: Handshake,
  },
  {
    title: "التذاكر المفتوحة",
    value: "12",
    change: "-4%",
    changeType: "negative" as const,
    icon: Ticket,
  },
]

export function DashboardWidgets() {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2} // espace entre les cartes
      justifyContent="space-between"
    >
      {stats.map((stat) => (
        <Card key={stat.title} sx={{ flex: "1 1 calc(25% - 16px)", minWidth: 200 }}>
          <CardHeader
            title={
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography>
            }
            action={<stat.icon size={20} color="gray" />}
          />
          <CardContent>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                color={stat.changeType === "positive" ? "success.main" : "error.main"}
              >
                {stat.change} من الشهر الماضي
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
