import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import { ArrowRight, Circle, MousePointer2, Pen, Redo2, Slash, Square, StickyNote, Type, Undo2 } from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton label="Select" icon={MousePointer2} onClick={() => { }} isActive={false} />
        <ToolButton label="Text" icon={Type} onClick={() => { }} isActive={false} />
        <ToolButton label="Sticky Note" icon={StickyNote} onClick={() => { }} isActive={false} />
        <ToolButton label="Line" icon={Slash} onClick={() => { }} isActive={false} />
        <ToolButton label="Rectangle" icon={Square} onClick={() => { }} isActive={false} />
        <ToolButton label="Circle" icon={Circle} onClick={() => { }} isActive={false} />
        <ToolButton label="Arrow" icon={ArrowRight} onClick={() => { }} isActive={false} />
        <ToolButton label="Pen" icon={Pen} onClick={() => {}} isActive={false}  />

      </div>
      
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton label="Undo" icon={Undo2} onClick={() => { }} isActive={false} />
        <ToolButton label="Redo" icon={Redo2} onClick={() => {}} isActive={false}  />


      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 h-[360px] w-[52px] shadow-md rounded-md">
      <Skeleton className="h-full w-full bg-primary rounded-md" />

    </div>
  )

}