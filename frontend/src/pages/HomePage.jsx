import { useEffect } from "react";
import TopBar from "./components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedSection from "./components/featuredSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/sectionGrid"
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  
  const { initializeQueue } = usePlayerStore();

  const {
    MadeForYou,
    trendingSongs,
    featuredSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForyouSongs,
    loading
  } = useMusicStore();

  useEffect(() =>{
    fetchFeaturedSongs(),
    fetchTrendingSongs(),
    fetchMadeForyouSongs()

  },[fetchFeaturedSongs,fetchMadeForyouSongs,fetchTrendingSongs])

  useEffect(() => {
		if (MadeForYou.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...MadeForYou, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue,,MadeForYou, trendingSongs, featuredSongs]);
  


  return (
    <main className="rounded-xl overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)] overflow-hidden">
        <div className="p-4 sm:p-6 ">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good AfterNoon</h1>
            <FeaturedSection/>
        
        <div className="space-y-8 ">
            <SectionGrid title="Made For You" songs={MadeForYou} loading={loading}/>
            <SectionGrid title="Trending" songs={trendingSongs} loading={loading}/>
        </div>
        </div>
      </ScrollArea>
      
      
    </main>
  );
};

export default HomePage;
