import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, X, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Helper function for conditionally joining class names
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

/* -----------------------------------------------------------------------------
 * Component: Dialog (Radix UI based)
 * -------------------------------------------------------------------------- */

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      // CRITICAL CHANGES FOR MODAL LAYOUT AND SCROLLABILITY
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-black/20 bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        "flex flex-col max-h-[90vh]", // Makes it a flex column container and limits its overall height
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  // ADDED: Padding to DialogHeader
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left px-6 pt-6 pb-4",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  // ADDED: Padding to DialogFooter
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 pt-4 pb-6",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-600 mt-1", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/* -----------------------------------------------------------------------------
 * Component: Select (Radix UI based)
 * -------------------------------------------------------------------------- */

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b73ed] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 text-gray-500" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white text-gray-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-gray-700", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: AddContentModal
 * -------------------------------------------------------------------------- */

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContentData {
  title: string;
  link: string;
  type: string;
  description?: string;
}

const AddContentModal = ({ isOpen, onClose }: AddContentModalProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("url");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { mutate: addContent, isPending, error } = useMutation({
    mutationFn: async (contentData: ContentData) => {
      console.log("Attempting to add content...", contentData); // Debug log
      const token = localStorage.getItem("authorization");
      console.log("Retrieved token:", token ? "Token found" : "No token found!"); // Debug log

      if (!token) {
        throw new Error("No auth token found. Please log in.");
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/content", // DOUBLE-CHECK THIS URL (http/https)
          contentData,
          {
            headers: {
              'authorization': token,
            },
          }
        );
        console.log("API response:", response.data); // Debug log
        return response.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data || err.message); // Log Axios specific error
          throw new Error(err.response?.data?.message || err.message || "Failed to add content due to network error.");
        } else if (err instanceof Error) {
          console.error("General error:", err.message); // Log general JS error
          throw new Error(err.message || "An unknown error occurred during content addition.");
        } else {
          console.error("Unexpected error type:", err); // Log unexpected error types
          throw new Error("An unexpected error occurred.");
        }
      }
    },
    onSuccess: () => {
      console.log("Content added successfully! Invalidating queries and closing modal."); // Debug log
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      setTitle("");
      setLink("");
      setType("url");
      setDescription("");
      onClose();
    },
    onError: (err) => { // Explicitly define onError for more robust error handling
      console.error("Mutation failed! Displaying error message:", err.message); // Debug log
      // The `error` state from useMutation will automatically be updated here.
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission reload
    console.log("handleSubmit triggered!"); // Debug log: Verify this fires
    addContent({ title, link, type, description });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);

    // Auto-detect content type based on URL
    if (url.includes("youtube.com")) { // Original YouTube check
      setType("youtube");
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setType("twitter");
    } else {
      setType("url");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DialogContent's className now includes 'flex flex-col' and 'max-h-[90vh]' from its definition */}
      <DialogContent className="sm:max-w-[425px] w-[90vw] max-w-md rounded-xl font-inter">

        {/* DialogHeader's className now includes its own padding */}
        <DialogHeader>
          <DialogTitle className="font-satoshi text-2xl font-bold text-gray-900">Add New Content</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a link to your second brain. We'll automatically detect the content type.
          </DialogDescription>
        </DialogHeader>

        {/* This div is the main scrollable body of the modal, filling available space */}
        <div className="flex-grow overflow-y-auto px-6 py-4">
            {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
                <p className="font-medium">Error: {error.message}</p>
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this content"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3b73ed] focus:border-[#3b73ed] sm:text-sm placeholder-gray-400 text-gray-900"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                id="link"
                type="url"
                value={link}
                onChange={handleLinkChange}
                placeholder="https://example.com"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3b73ed] focus:border-[#3b73ed] sm:text-sm placeholder-gray-400 text-gray-900"
                />
            </div>

            {type === "url" && (
                <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description for the URL (optional)"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3b73ed] focus:border-[#3b73ed] sm:text-sm placeholder-gray-400 text-gray-900 resize-y"
                ></textarea>
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="type">Content Type</label>
                <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="youtube">YouTube Video</SelectItem>
                    <SelectItem value="twitter">X / Twitter Post</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </form>
        </div> {/* End of scrollable content area */}

        {/* DialogFooter's className now includes its own padding */}
        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 mt-3 sm:mt-0"
          >
            Cancel
          </button>
          <button
            type="submit" // Keep type="submit" for accessibility and standard form behavior
            onClick={handleSubmit} // Explicitly call handleSubmit on click as a fallback/reinforcement
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-[#3b73ed] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#2a5cc9] focus:outline-none focus:ring-2 focus:ring-[#3b73ed] focus:ring-offset-2 transition-colors duration-200"
          >
            {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
                <Plus className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Adding..." : "Add Content"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentModal;