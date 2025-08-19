"use client"

import React, { useState } from "react"
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material"
import { Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert("يجب الموافقة على الشروط والأحكام.")
      return
    }
    if (password !== confirmPassword) {
      alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين.")
      return
    }

    setIsLoading(true)
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      alert("تم إنشاء الحساب بنجاح!")
      window.location.href = "/login"
    }, 1500)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 400, mx: "auto", mt: 8 }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center">
          إنشاء حساب جديد
        </Typography>

        <TextField
          label="اسم المستخدم"
          placeholder="أدخل اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <User size={20} />
              </InputAdornment>
            ),
          }}
        />

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

        <TextField
          label="تأكيد كلمة المرور"
          placeholder="أعد إدخال كلمة المرور"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          }
          label="أوافق على الشروط والأحكام"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </Button>

        <Typography variant="body2" textAlign="center">
          لديك حساب بالفعل؟{" "}
          <Link href="/" style={{ color: "#1976d2", textDecoration: "underline" }}>
            تسجيل الدخول
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
