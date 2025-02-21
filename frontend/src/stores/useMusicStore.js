import {create} from "zustand"
import toast  from "react-hot-toast"

export const useMusicStore = create((set) => (
    {
        loading:false,
        error:null,
        singleAlbum:null,
        MadeForYou:[],
        trendingSongs:[],
        featuredSongs:[],
        albums:[],
        songs:[],
        stats:null,
        
        
        fetchAlbums: async () => {
            set({loading:true, error:null})
            try {
                
                const data = await fetch("http://localhost:3001/api/v1/albums")
                const albums = await data.json()
                set({albums:albums})
                
            } catch(error) {
                set({error:error})

            } finally {
                set({loading:false})
            }
        },

        fetchStats: async () => {
            set({loading:true,error:null})
            try {
                const data = await fetch("http://localhost:3001/api/v1/stats")
                const stats = await data.json();
                set({stats:stats})
            } catch (error) {
                set({error:error})
            } finally {
                set({loading:false})
            }
        }
        ,

        fetchSongs: async () =>{
            set({loading:true,error:null})
            try{
                const data = await fetch("http://localhost:3001/api/v1/songs")
                const songs = await data.json();
                set({songs:songs})

            } catch(error) {
                set({error:error})
            } finally {
                set({loading:false})
            }
        },
        



        fetchAlbumById: async (id) => {
            set({loading:true, error:null})
            try {
                const data = await fetch(`http://127.0.0.1:3001/api/v1/albums/${id}`)
                const singleAlbum = await data.json();
                set({singleAlbum:singleAlbum})

            } catch (error) {
                set({error:error})
            }
            finally {
                set({loading:false})
            }
        },

        fetchFeaturedSongs: async () => {
            set({loading:true, error:null})
            try {
                const data = await fetch("http://localhost:3001/api/v1/songs/featured")
                const featuredSongs = await data.json()
                set({featuredSongs:featuredSongs})
                
            } catch (error) {
                set({error:error})
            } finally {
                set({loading:false})
            }
        },

        fetchTrendingSongs: async () => {
            set({loading:true, error:null})
            try {
                const data = await fetch("http://localhost:3001/api/v1/songs/trending")
                const trending = await data.json();
                set({trendingSongs:trending})
            } catch (error) {
                set({error:error})
            } finally {
                set({loading:false})
            }
        },
        
        fetchMadeForyouSongs: async () => {
            set({loading:true, error:null})
            try {   
                const data = await fetch("http://localhost:3001/api/v1/songs/made-for-you")
                const MadeForYou = await data.json()
                set({MadeForYou:MadeForYou})
                
            } catch (error) {
                set({error:error})
            } finally {
                set({loading:false})
            }

        }, 
       deleteSong: async(id) => {
        set({loading:true,error:null})
        try {
                await fetch(`http://localhost:3001/api/v1/songs/${id}`,{
                method: 'DELETE', 
                headers: {
                'Content-Type': 'application/json', 
                },
            })
            set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
           
            toast.success("Song deleted successfully");
            

        } catch (error) {
            toast.error("Error deleting song");
        } finally {
            set({loading:false})
        }

       },
       deleteAlbum: async(id) => {
        set({loading:true,error:null})
        try {
            await fetch(`http://localhost:3001/api/v1/albums/${id}`,{
                method: 'DELETE', 
                headers: {
                'Content-Type': 'application/json', 
                },
            })
            set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");

        } catch (error) {
           toast.error("failed to Delete Album", error.message)
        } finally {
            set({loading:false})
        }

       }
	
 
    }
))