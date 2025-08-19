"use client"

import React, { useState } from "react"
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Typography,
  Link as MuiLink,
  Box,
  Stack
} from "@mui/material"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 350, mx: "auto", mt: 8 }}>
      <Stack spacing={3}>
        <TextField
          label="البريد الإلكتروني"
          placeholder="أدخل بريدك الإلكتروني"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={20} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="تذكرني"
          />
          <MuiLink component={Link} href="/forgot-password" underline="hover" color="primary">
            نسيت كلمة المرور؟
          </MuiLink>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </Stack>
    </Box>
  )
}
