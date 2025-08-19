"use client"

import React, { useState } from "react"
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  Badge,
} from "@mui/material"
import { TrendingUp, TrendingDown, Users, BarChart, Download, Target, DollarSignIcon } from "lucide-react"

const salesData = [
  { month: "يناير", sales: 45000, deals: 12, clients: 8 },
  { month: "فبراير", sales: 52000, deals: 15, clients: 11 },
  { month: "مارس", sales: 48000, deals: 13, clients: 9 },
  { month: "أبريل", sales: 61000, deals: 18, clients: 14 },
  { month: "مايو", sales: 55000, deals: 16, clients: 12 },
  { month: "يونيو", sales: 67000, deals: 21, clients: 16 },
]

const topClients = [
  { name: "شركة التقنية المتقدمة", revenue: 25000, deals: 5 },
  { name: "مؤسسة الابتكار", revenue: 18000, deals: 3 },
  { name: "شركة المستقبل", revenue: 15000, deals: 4 },
  { name: "مجموعة النجاح", revenue: 12000, deals: 2 },
  { name: "شركة الرؤية", revenue: 10000, deals: 3 },
]

const dealsByStage = [
  { stage: "محتملة", count: 24, percentage: 35 },
  { stage: "تفاوض", count: 18, percentage: 26 },
  { stage: "مربوحة", count: 15, percentage: 22 },
  { stage: "خاسرة", count: 12, percentage: 17 },
]

export const AnalyticsContent: React.FC = () => {
  const [tab, setTab] = useState("sales")
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, dir: "rtl" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <MenuItem value="1month">شهر واحد</MenuItem>
          <MenuItem value="3months">3 أشهر</MenuItem>
          <MenuItem value="6months">6 أشهر</MenuItem>
          <MenuItem value="1year">سنة واحدة</MenuItem>
        </Select>
        <Button variant="outlined" startIcon={<Download />}>
          تصدير التقرير
        </Button>
      </Box>

      {/* Key Metrics */}
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {/* Total Sales */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2">إجمالي المبيعات</Typography>
              <DollarSignIcon size={20} />
            </Box>
            <Typography variant="h5" fontWeight="bold">₪328,000</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "green" }}>
              <TrendingUp size={14} />
              +12.5% من الشهر الماضي
            </Box>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2">معدل التحويل</Typography>
              <Target size={20} />
            </Box>
            <Typography variant="h5" fontWeight="bold">24.8%</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "green" }}>
              <TrendingUp size={14} />
              +2.1% من الشهر الماضي
            </Box>
          </CardContent>
        </Card>

        {/* Avg Deal Value */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2">متوسط قيمة الصفقة</Typography>
              <BarChart size={20} />
            </Box>
            <Typography variant="h5" fontWeight="bold">₪4,200</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "red" }}>
              <TrendingDown size={14} />
              -3.2% من الشهر الماضي
            </Box>
          </CardContent>
        </Card>

        {/* New Clients */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2">عملاء جدد</Typography>
              <Users size={20} />
            </Box>
            <Typography variant="h5" fontWeight="bold">47</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "green" }}>
              <TrendingUp size={14} />
              +8.3% من الشهر الماضي
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
          <Tab label="المبيعات" value="sales" />
          <Tab label="العملاء" value="clients" />
          <Tab label="الصفقات" value="deals" />
          <Tab label="الأداء" value="performance" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {tab === "sales" && (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">اتجاه المبيعات</Typography>
              {salesData.map((d, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                  <Typography variant="body2">{d.month}</Typography>
                  <Typography variant="body2" fontWeight="bold">₪{d.sales.toLocaleString()}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">أفضل العملاء</Typography>
              {topClients.map((c, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                  <Box>
                    <Typography variant="body2">{c.name}</Typography>
                    <Typography variant="caption">{c.deals} صفقات</Typography>
                  </Box>
                  <Badge badgeContent={`₪${c.revenue.toLocaleString()}`} color="secondary" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}

      {tab === "deals" && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">الصفقات حسب المرحلة</Typography>
            {dealsByStage.map((s, i) => (
              <Box key={i} sx={{ my: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">{s.stage}</Typography>
                  <Typography variant="body2">{s.count} صفقة</Typography>
                </Box>
                <LinearProgress variant="determinate" value={s.percentage} sx={{ height: 8, borderRadius: 2, mt: 0.5 }} />
                <Typography variant="caption">{s.percentage}%</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "clients" && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">نمو العملاء</Typography>
            {salesData.map((d, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                <Typography variant="body2">{d.month}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 100, height: 8, bgcolor: "grey.300", borderRadius: 1 }}>
                    <Box sx={{ width: `${(d.clients / 20) * 100}%`, height: "100%", bgcolor: "primary.main", borderRadius: 1 }} />
                  </Box>
                  <Typography variant="body2">{d.clients}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "performance" && (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">الهدف الشهري</Typography>
              <Typography variant="h6" fontWeight="bold">₪45,000 / ₪60,000</Typography>
              <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 2, my: 1 }} />
              <Typography variant="caption">75% من الهدف المحقق</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">متوسط وقت الإغلاق</Typography>
              <Typography variant="h6" fontWeight="bold">18 يوم</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "green" }}>
                <TrendingDown size={14} />
                تحسن بـ 3 أيام
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">رضا العملاء</Typography>
              <Typography variant="h6" fontWeight="bold">4.8/5</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 12, color: "green" }}>
                <TrendingUp size={14} />
                +0.2 من الشهر الماضي
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  )
}
