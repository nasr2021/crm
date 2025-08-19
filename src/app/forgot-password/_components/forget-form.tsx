"use client"

import React, { useState } from "react"
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton
} from "@mui/material"
import { Mail } from "lucide-react"
import Link from "next/link"

export function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simulate sending reset link
    setTimeout(() => {
      setIsLoading(false)
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.")
    }, 1500)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 350, mx: "auto", mt: 8 }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center">
          نسيت كلمة المرور؟
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور
        </Typography>

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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
        </Button>

        {message && (
          <Typography variant="body2" color="success.main" textAlign="center">
            {message}
          </Typography>
        )}

        <Typography variant="body2" textAlign="center">
          <Link href="/" style={{ color: "#1976d2", textDecoration: "underline" }}>
            العودة لتسجيل الدخول
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
