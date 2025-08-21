"use client"

import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@mui/material"
import { useClientMutation, useClientUpdateMutation } from "@/app/mutation/client-mutation"
import { useForm, Controller, Form } from "react-hook-form"
interface AddClientModalProps {
onOpenChange:(open: boolean) => void
  data?:any

}

export function FormClientModal({data ,onOpenChange}: AddClientModalProps) {
  const {mutate:createClient} = useClientMutation()
  const {mutate:updateClient} = useClientUpdateMutation() 
console.log('data',data)
  const methods = useForm({
    defaultValues: {
      id: data?.id || "",
      name: data?.name || "",
      company: data?.company || "",
      email: data?.email || "",
      phone: data?.phone || "",
      status: data?.status || "active",
      notes: data?.notes || "",

    },
  })
  const {control, handleSubmit, reset} = methods

const onSubmit = (values: any) => {
    if (values.id) {
      updateClient(values)
    } else {
      const{id, ...rest} = values
      createClient(rest)
    
    }
 
    onOpenChange(false)
    reset()
  }



  return (

        <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
       
        <Box  sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
           <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="الاسم الكامل *"
              required
              dir="rtl"
              {...field}
            />
          )}
        />
          <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              label="اسم الشركة *"
              required
              dir="rtl"
              {...field}
            />
          )}
          />
          <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="البريد الإلكتروني *"
              type="email"
             
              required
              dir="ltr"
              {...field}
            />
          )}
          />
       <Controller
       name="phone"
       control={control}
       render={({ field }) => (
        <TextField
            label="رقم الهاتف *"
     
            required
            dir="ltr"
            {...field}
          />
       )}
          />
          <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="الحالة"
              {...field}
            >
              <MenuItem value="active">نشط</MenuItem>
              <MenuItem value="inactive">غير نشط</MenuItem>
            </TextField>
          )}
          />    
          <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              label="ملاحظات"
           
              multiline
              rows={3}
              dir="rtl"
              {...field}
            />
          )}
          />
        </Box>
          <Button type="submit" variant="contained" color="primary" >
          {data?.id ? "تحديث العميل" : "إضافة العميل"}
        </Button>
        </form>
        </Form>
    
   
   
  )
}
