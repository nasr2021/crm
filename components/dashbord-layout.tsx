"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  Stack
} from "@mui/material"
import {
  LayoutDashboard,
  Users,
  Handshake,
  Ticket,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
  Search,
  Bell,
  Menu as MenuIcon,
  LogOut,
  User
} from "lucide-react"

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "العملاء", href: "/clients", icon: Users },
  { name: "الصفقات", href: "/deals", icon: Handshake },
  { name: "التذاكر", href: "/tickets", icon: Ticket },
  { name: "المهام", href: "/tasks", icon: CheckSquare },
  { name: "التقويم", href: "/calendar", icon: Calendar },
  { name: "التحليلات", href: "/analytics", icon: BarChart3 },
  { name: "الإعدادات", href: "/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const drawerWidth = 240

  const SidebarContent = (
    <Box sx={{ width: drawerWidth }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        نظام CRM
      </Typography>
      <Divider />
      <List>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
              >
                <ListItemIcon>
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Desktop Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {SidebarContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {SidebarContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* AppBar */}
        <AppBar position="static" color="default" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <InputBase
                placeholder="البحث..."
                startAdornment={<Search size={18} />}
                sx={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: 1,
                  pl: 1,
                  pr: 1,
                  width: 250
                }}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton color="inherit">
                <Badge color="error" variant="dot">
                  <Bell size={20} />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={handleAvatarClick}>
                <Avatar alt="Ahmed" src="/placeholder.svg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <User size={18} />
                  </ListItemIcon>
                  الملف الشخصي
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings size={18} />
                  </ListItemIcon>
                  الإعدادات
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <LogOut size={18} />
                  </ListItemIcon>
                  تسجيل الخروج
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
