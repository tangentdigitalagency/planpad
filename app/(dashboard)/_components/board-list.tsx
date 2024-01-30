"use client"

import Image from "next/image";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

interface BoardListProps {

  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  }
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  
  const data = [];

  if (!data?.length && query.search) {

    return (
      
      <EmptySearch/>
    )

  }
  
  if (!data.length && query.favorites) {
      
      return (
        <EmptyFavorites/>
      ) 
  }

  if (!data.length) {
    return (
      <EmptyBoards/>
    )
  }

  return (
    <>
      {JSON.stringify(query)}
    </>
  );
}
 
export default BoardList;