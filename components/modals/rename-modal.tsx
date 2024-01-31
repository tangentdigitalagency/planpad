"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal";
import { FormEventHandler, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


export const RenameModal = () => {

  const {mutate, pending} = useApiMutation(api.board.update)
  const {isOpen, onClose, initialValues} = useRenameModal()

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title)
  
  }, [initialValues.title])


  const onSubmit: FormEventHandler<HTMLFormElement> = (e,) => {

    e.preventDefault();

    mutate({id: initialValues.id, title})
      .then(() => {
        toast.success("Pad updated")
        onClose();
      })
      .catch(() => toast.error("Failed to update Pad"))
   }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Pad Title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this Pad
        </DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input disabled={false} required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Pad Title" />

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button disabled={false} type="submit">Update Pad</Button>
          </DialogFooter>
        </form>

     </DialogContent>
    </Dialog>
  )

}