import React from "react"
import { useState, useEffect } from "react"
import { Copy, X } from "lucide-react"
import axios from "axios"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as SwitchPrimitives from "@radix-ui/react-switch"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { variant?: "default" | "outline" }
>(({ className, variant = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const defaultVariantClasses = "bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
  const outlineVariantClasses = "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"

  const buttonClasses = `${baseClasses} ${variant === "outline" ? outlineVariantClasses : defaultVariantClasses} ${className || ''}`;

  return (
    <button
      className={buttonClasses}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"


// Dialog Components
const Dialog = DialogPrimitive.Root
// const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
// const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className || ''}`}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ${className || ''}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ''}`}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`text-sm text-muted-foreground ${className || ''}`}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName


// Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className || ''}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"


// Label Component
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName


// Switch Component
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${className || ''}`}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 ${className || ''}`}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName


// Main ShareBrainModal Component
interface ShareBrainModalProps {
  isOpen: boolean
  onClose: () => void
}

const API_BASE_URL = "http://localhost:3000/api/v1";

const ShareBrainModal: React.FC<ShareBrainModalProps> = ({ isOpen, onClose }) => {
  const [isSharing, setIsSharing] = useState(false)
  const [shareHash, setShareHash] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [initialCheckDone, setInitialCheckDone] = useState(false)

  const getAuthToken = (): string => {
    const token = localStorage.getItem("authorization")
    if (!token) {
      throw new Error("Please login to share content")
    }
    return token
  }

  useEffect(() => {
    if (isOpen && !initialCheckDone) {
      checkCurrentShareStatus()
      setInitialCheckDone(true)
    }
    return () => {
      if (!isOpen) setInitialCheckDone(false)
    }
  }, [isOpen, initialCheckDone])

  const checkCurrentShareStatus = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const token = getAuthToken()

      const response = await axios.post(
        `${API_BASE_URL}/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      
      if (response.data.hash) {
        setIsSharing(true)
        setShareHash(response.data.hash)
      }
    } catch (err: any) {
      if (err.response?.data?.hash) {
        setIsSharing(true)
        setShareHash(err.response.data.hash)
      } else {
        setIsSharing(false)
        setShareHash(null)
        if (!err.response?.data?.hash) {
          setError(err.message || "Failed to check sharing status")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSharing = async () => {
    try {
      setIsLoading(true)
      setError("")

      const token = getAuthToken()

      const response = await axios.post(
        `${API_BASE_URL}/brain/share`,
        { share: !isSharing },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )

      if (!isSharing) {
        setIsSharing(true)
        setShareHash(response.data.hash)
      } else {
        setIsSharing(false)
        setShareHash(null)
      }
    } catch (err: any) {
      console.error("Failed to toggle sharing", err)
      setError(err.message || "Failed to toggle sharing")
      setIsSharing(prev => !prev) // Revert the toggle on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = () => {
    if (shareHash) {
      const shareLink = `${window.location.origin}/brain/${shareHash}`
      // Using document.execCommand('copy') as navigator.clipboard.writeText() might not work in some iframe contexts
      const el = document.createElement('textarea');
      el.value = shareLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      navigator.clipboard.writeText(el.value);
      document.body.removeChild(el);

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[85vw] max-w-[90vw] sm:max-w-[425px] font-inter p-4 sm:p-6 rounded-xl border border-gray-600 bg-white">
        <DialogHeader className="text-left">
          <DialogTitle className="font-satoshi text-lg sm:text-xl">
            Share Your Brain
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Share your brain with others. They'll see your content but won't be able to modify it.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mb-3 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between py-3 sm:py-4">
          <Label htmlFor="sharing-toggle" className="text-sm sm:text-base font-medium">
            {isSharing ? "Sharing enabled" : "Sharing disabled"}
          </Label>
          <Switch 
            id="sharing-toggle" 
            checked={isSharing} 
            onCheckedChange={toggleSharing} 
            disabled={isLoading} 
            className="scale-90 sm:scale-100 bg-gray-300"
          />
        </div>

        {isSharing && shareHash && (
          <div className="space-y-2">
            <Label htmlFor="share-link" className="text-sm sm:text-base">Share Link</Label>
            <div className="flex flex-row sm:flex-row gap-2">
              <Input
                id="share-link"
                value={`${window.location.origin}/brain/${shareHash}`}
                readOnly
                className="rounded sm:rounded-r-none sm:rounded-lg text-xs"
              />
              <Button 
                type="button" 
                onClick={handleCopyLink} 
                className="rounded sm:rounded-md bg-[#3b73ed] hover:bg-[#2a5cc9]"
                disabled={isLoading}
              >
                {copied ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-6 flex justify-end">
          <Button 
            onClick={onClose} 
            variant="outline" 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareBrainModal