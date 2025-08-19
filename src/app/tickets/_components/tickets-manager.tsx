"use client"

import { useState } from "react"
import {
  Box,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from "@mui/material"
import { Plus, List, Edit, Delete, User, User2, TimerIcon, Calendar1 } from "lucide-react"
import { TaskCalendarView } from "../../tasks/_component/task-calendar-view"
import { AddTaskModal } from "../../tasks/_component/add-task-modal"

// Définir le type Task pour correspondre à AddTaskModal
interface Task {
  id: string
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
  createdAt?: string
}

export function TasksManager() {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "مراجعة المتطلبات الفنية",
      description: "مراجعة وتحليل المتطلبات الفنية للمشروع الجديد",
      status: "todo",
      priority: "high",
      dueDate: "2024-03-15",
      client: "شركة التقنية المتقدمة",
      clientId: "1",
      assignedTo: "أحمد محمد",
      assignedToId: "user1",
      createdAt: "2024-03-01",
      category: "development",
    },
    {
      id: "2",
      title: "إعداد العرض التقديمي",
      description: "تحضير عرض تقديمي للعميل حول الحلول المقترحة",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-03-12",
      client: "مؤسسة الابتكار",
      clientId: "2",
      assignedTo: "فاطمة أحمد",
      assignedToId: "user2",
      createdAt: "2024-02-28",
      category: "presentation",
    },
    {
      id: "3",
      title: "اختبار النظام",
      description: "إجراء اختبارات شاملة للنظام قبل التسليم",
      status: "completed",
      priority: "high",
      dueDate: "2024-03-08",
      client: "شركة البناء الحديث",
      clientId: "3",
      assignedTo: "محمد علي",
      assignedToId: "user3",
      createdAt: "2024-02-25",
      category: "testing",
    },
    {
      id: "4",
      title: "تدريب فريق العميل",
      description: "تنظيم جلسة تدريبية لفريق العميل على استخدام النظام",
      status: "todo",
      priority: "medium",
      dueDate: "2024-03-20",
      client: "مكتب الاستشارات القانونية",
      clientId: "4",
      assignedTo: "سارة خالد",
      assignedToId: "user4",
      createdAt: "2024-03-02",
      category: "training",
    },
    {
      id: "5",
      title: "كتابة التوثيق الفني",
      description: "إعداد دليل المستخدم والتوثيق الفني للنظام",
      status: "in-progress",
      priority: "low",
      dueDate: "2024-03-25",
      client: "شركة التقنية المتقدمة",
      clientId: "1",
      assignedTo: "أحمد محمد",
      assignedToId: "user1",
      createdAt: "2024-03-03",
      category: "documentation",
    },
  ]
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeView, setActiveView] = useState(0)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "قيد الانتظار"
      case "in-progress":
        return "قيد التنفيذ"
      case "completed":
        return "مكتملة"
      case "cancelled":
        return "ملغية"
      default:
        return status
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "عاجل"
      case "high":
        return "عالية"
      case "medium":
        return "متوسطة"
      case "low":
        return "منخفضة"
      default:
        return priority
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  // Ajout de la tâche avec date de création
  const handleAddTask = (task: Task) => {
    setTasks([...tasks, { ...task, createdAt: new Date().toISOString().slice(0, 10) }])
  }

  return (
    <Box sx={{ p: 3, dir: "rtl" }}>
      {/* Header */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1}>
          <TextField
            placeholder="البحث في المهام..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small">
            <InputLabel>الحالة</InputLabel>
            <Select value={statusFilter} label="الحالة" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="todo">قيد الانتظار</MenuItem>
              <MenuItem value="in-progress">قيد التنفيذ</MenuItem>
              <MenuItem value="completed">مكتملة</MenuItem>
              <MenuItem value="cancelled">ملغية</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>الأولوية</InputLabel>
            <Select value={priorityFilter} label="الأولوية" onChange={(e) => setPriorityFilter(e.target.value)}>
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="urgent">عاجل</MenuItem>
              <MenuItem value="high">عالية</MenuItem>
              <MenuItem value="medium">متوسطة</MenuItem>
              <MenuItem value="low">منخفضة</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" startIcon={<Plus />} onClick={() => setIsAddModalOpen(true)}>
          إضافة مهمة
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs value={activeView} onChange={(e, val) => setActiveView(val)}>
        <Tab icon={<List size={16} />} label="عرض القائمة" />
        <Tab icon={<Calendar1 size={16} />} label="عرض التقويم" />
      </Tabs>
      <Divider sx={{ my: 2 }} />

      {activeView === 0 && (
        <Stack spacing={2}>
          {filteredTasks.length === 0 && <Typography textAlign="center">لا توجد مهام تطابق المعايير المحددة</Typography>}
          {filteredTasks.map((task) => (
            <Card key={task.id} sx={{ border: isOverdue(task.dueDate) && task.status !== "completed" ? "1px solid red" : undefined }}>
              <CardHeader
                title={task.title}
                subheader={
                  <Stack direction="row" spacing={1}>
                    <Chip label={getStatusText(task.status)} size="small" color={task.status === "completed" ? "success" : task.status === "in-progress" ? "info" : "default"} />
                    <Chip label={getPriorityText(task.priority)} size="small" color={task.priority === "high" ? "warning" : task.priority === "urgent" ? "error" : "default"} />
                  </Stack>
                }
                action={
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" startIcon={<Edit />} />
                    <Button size="small" variant="outlined" color="error" startIcon={<Delete />} />
                  </Stack>
                }
              />
              <CardContent>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {task.description}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <User size={14} />
                  <Typography variant="caption">{task.client}</Typography>
                  <TimerIcon size={14} />
                  <Typography variant="caption">
                    {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                    {isOverdue(task.dueDate) && task.status !== "completed" && " (متأخرة)"}
                  </Typography>
                  <User2 size={14} />
                  <Typography variant="caption">مُكلف إلى: {task.assignedTo}</Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {activeView === 1 && <TaskCalendarView tasks={filteredTasks} onUpdateTaskStatus={() => {}} />}

      <AddTaskModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddTask={handleAddTask} />
    </Box>
  )
}
