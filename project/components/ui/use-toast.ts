"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT } from "sonner"

const toast = sonnerToast

function useToast() {
  return {
    toast,
    dismiss: toast.dismiss,
    error: toast.error,
    success: toast.success,
    loading: toast.loading,
    promise: toast.promise,
    custom: toast.custom,
  }
}

export { useToast, toast }