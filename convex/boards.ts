import { v } from 'convex/values';
import { query } from './_generated/server';
import {getAll, getAllOrThrow} from "convex-helpers/server/relationships"
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string())
  },

  handler: async (ctx, args) => {
    
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) {
      throw new Error('Not authenticated');
    }

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) => q.eq("userId", indentity.subject).eq("orgId", args.orgId))
        .order('desc')
        .collect()
      
      const ids = favoritedBoards.map((b) => b.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        favorite: true
      }))
    }

    const title = args.search as string;
    
    let boards = []

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q
           
            .search("title", title)
            .eq('orgId', args.orgId)
      )
      .collect()
    }
    else {
      boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq('orgId', args.orgId))
      .order('desc')
      .collect()
    
    }

  
    
    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board_org", (q) =>
          q
            .eq("userId", indentity.subject)
            .eq("boardId", board._id)
      )
        .unique()
        .then((favorite) => {
          return { ...board, favorite: !!favorite }
        })
    })

    const boardsWithFavorite = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavorite;

  }
})