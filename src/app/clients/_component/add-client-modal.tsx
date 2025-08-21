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
import { FormClientModal } from "./form"
interface AddClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClient: (client: any) => void
  data?:any

}

export function AddClientModal({ open, onOpenChange, onAddClient, data }: AddClientModalProps) {
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
    onAddClient(values)
    onOpenChange(false)
    reset()
  }



  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} fullWidth maxWidth="sm">
      <DialogTitle>{data?.id ? "تحديث العميل" : "إضافة العميل"}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          أدخل معلومات العميل الجديد في النموذج أدناه
        </Typography>
       <FormClientModal onOpenChange={onOpenChange} data={data}  />


      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onOpenChange(false)}>
          إلغاء
        </Button>
      
      </DialogActions>
    </Dialog>
  )
}


