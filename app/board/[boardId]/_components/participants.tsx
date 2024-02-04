"use client";


import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 4;

export const Participants = () => {

  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  const moreUserNames = users.slice(MAX_SHOWN_USERS)
  .map(user => `- ${user.info?.name}`)
  .join('\n');
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
      {users.slice(0, MAX_SHOWN_USERS)
          .map(({ connectionId, info }) => {
            return (
              <UserAvatar
                borderColor={connectionIdToColor(connectionId)}
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "Team Member"}
              />
            )
          })}
        
      {currentUser && (
          <UserAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}

            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
          name={`+${users.length - MAX_SHOWN_USERS} more: ${moreUserNames}`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
   

          />
        )}
      </div>
    </div>
  );
};


export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 rounded-md flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-primary"/>
      </div>

  )
}