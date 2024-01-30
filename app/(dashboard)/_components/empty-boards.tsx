"use client"

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import {toast} from 'sonner'

export const EmptyBoards = () => {


  const {organization } = useOrganization();
  const {mutate, pending} = useApiMutation(api.board.create);
  
  const onClick = () => {

    if(!organization) return console.error('No organization')

    mutate({
      orgId: organization!.id,
      title: 'Untitled Board'
    })
      .then((id) => {
        console.log('Board created', id)
        toast.success('Board created', {
          description: `You have successfully created a new board:`  
          // Add title to toast
        })
       // Reditred to the new board
      })
      .catch((err) => {
        toast.error('Failed to create board', {
          description: `An error occurred while creating a new board: ${err.message}`
          })
      })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src='/note.svg' alt='empty' height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create Your First Board</h2>
      <p className="text-muted-foreground text-sm mt-2"> Start by creating a board!</p>

      <div className="mt-6">
        <Button disabled={pending} size='lg' onClick={onClick}>
          <Plus className="h-4 w-4 mr-2"/>
          Create A Board
        </Button>

      </div>
    </div>
  )

}