import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    //   <div
    //     className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
    //  to-black text-zinc-100 p-8"
    //   >
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-4 md:p-8">
      <Header />

      <DashboardStats />

      {/* <Tabs defaultValue="songs" className="space-y-6"> */}
      <Tabs defaultValue="songs" className="space-y-4 md:space-y-6">
        <TabsList className="p-1 bg-zinc-800/50 w-full md:w-auto">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700 text-xs md:text-sm"
          >
            <Music className="mr-1 md:mr-2 size-3 md:size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700 text-xs md:text-sm"
          >
            <Album className="mr-1 md:mr-2 size-3 md:size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
