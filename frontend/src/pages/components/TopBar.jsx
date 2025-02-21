import { Link  } from "react-router-dom";
import UserProfile  from "./userProfile";
import spotifyLogo from "../spotify.png"


const TopBar = () => {
    const isLoggedIn = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    
    return (
        <div className="flex text-white  items-center p-4 justify-between sticky top-0 bg-zinc-900/75
        backdrop:blur-md z-10">
            <div className="flex gap-2 items-center">
                <img src={spotifyLogo}  className="size-8" alt="spotify Image"/>
                Music App
            </div>
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <UserProfile user={user}/>
                    ) : (<Link to="/login">Login</Link>)}
            </div>

        </div>
    )
};
export default TopBar;
