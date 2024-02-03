import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Hint } from "@/components/hint";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({ title, authorLabel, createdAtLabel, isFavorite, onClick, disabled }: FooterProps) => {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    event.stopPropagation();
    event.preventDefault();
    onClick();
  }

  return (
    <>
      <div className="relative bg-secondary p-3">
        <p className="text-md truncate max-w-[calc(100%-20px)">
          {title}
        </p>
        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
          {authorLabel} - {createdAtLabel}
        </p>

        <Hint label="Favorite This Pad">
        <button disabled={disabled} onClick={handleClick} className={cn("opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-primary", disabled && "cursor-not-allowed opacity-75")}>
         
         <Star className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")}/>
       </button>
        </Hint>
        
      </div>
    </>
  )


}