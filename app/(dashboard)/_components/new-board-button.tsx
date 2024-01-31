"use client";


import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import {toast} from 'sonner'

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {


 const {mutate, pending} = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled Pad",
    })
      .then((id) => {
        toast.success('Pad created')
        // todo: reditect to the new board
      })
      .catch((err) => {
        toast.error('Failed to create Pad')
        throw new Error(err);
    })

  }

  return (
    <>

      <button
        disabled={ pending || disabled}
        onClick={onClick}
        className={cn("col-span-1 aspect-[100/127] bg-primary rounded-lg hover:primary/20 flex flex-col items-center justify-center py-6", disabled || pending && "opacity-75 hover:bg-muted-primary cursor-not-allowed")}
      >
        <div />
        
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-sm text-white font-light"> Create Pad</p>
      </button>
    </>
  )

}