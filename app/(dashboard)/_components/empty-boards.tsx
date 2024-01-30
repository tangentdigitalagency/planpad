import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";

export const EmptyBoards = () => {

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src='/note.svg' alt='empty' height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create Your First Board</h2>
      <p className="text-muted-foreground text-sm mt-2"> Start by creating a board!</p>

      <div className="mt-6">
        <Button size='lg'>
          <Plus className="h-4 w-4 mr-2"/>
          Create A Board
        </Button>

      </div>
    </div>
  )

}