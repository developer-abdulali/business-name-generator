// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Music } from "lucide-react";
// import SongsTable from "./SongsTable";
// import AddSongDialog from "./AddSongDialog";

// const SongsTabContent = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
//               <Music className="size-4 md:size-5 text-emerald-500" />
//               Songs Library
//             </CardTitle>
//             <CardDescription className="text-xs md:text-sm">
//               Manage your album collection
//             </CardDescription>
//           </div>
//           <AddSongDialog />
//         </div>
//       </CardHeader>

//       <CardContent>
//         <SongsTable />
//       </CardContent>
//     </Card>
//   );
// };
// export default SongsTabContent;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl">
              <Music className="size-4 md:size-5 lg:size-6 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription className="text-xs md:text-sm lg:text-base">
              Manage your album collection
            </CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>

      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};
export default SongsTabContent;
