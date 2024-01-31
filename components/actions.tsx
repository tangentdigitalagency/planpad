"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ConfirmModal } from "./confirm-modal";
import { api } from "@/convex/_generated/api";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {


  const { mutate, pending } = useApiMutation(api.board.remove)
  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link to clipboard"));
  }

  const onDelete = () => {

    mutate({ id })
      .then(() => {
        toast.success("Pad deleted")
       
      })
      .catch(() => toast.error("Failed to delete Pad"))

  }


  return (
   
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy Pad Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename This Pad
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ConfirmModal header="Delete Pad" description={`Are you sure you want to delete ${title}?`} onConfirm={onDelete} disabled={pending}>
        <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start hover:bg-destructive hover:text-white">
          <Trash2 className="h-4 w-4 mr-2 bg-white rounded-sm text-destructive" />
         Delete This Pad
          </Button>
          </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
