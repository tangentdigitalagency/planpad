
import { Loader } from "lucide-react";
import {InfoSkeleton} from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";


const Loading = () => {
  return (
    <main className="h-full w-full relative bg-secondary touch-none flex flex-col items-center justify-center">

      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <p className="text-md font-bold mt-3">We are preparing your pad!</p>
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
   );
}
 
export default Loading;