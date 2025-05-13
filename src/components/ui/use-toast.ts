
// Re-export the toast hooks from the original location
import * as React from "react"
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast"

// Re-export the toast hooks
export const useToast = useToastOriginal
export const toast = toastOriginal
