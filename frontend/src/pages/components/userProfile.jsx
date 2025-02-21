import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user = null }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none group">
        <div className="flex items-center gap-2 rounded-full p-1 transition-all duration-200 ease-in-out hover:bg-gray-100">
          <Avatar className="h-8 w-8 ring-2 ring-white group-hover:ring-gray-200">
            <AvatarImage 
              src={user?.avatar} 
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-gray-700">
              {user?.name || 'User Name'}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 shadow-lg rounded-xl border border-gray-200"
      >
        <div className="px-2 py-3">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-blue-500 text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || 'User Name'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuLabel className="px-2 py-2 text-xs font-semibold text-gray-500">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="px-2 py-2 m-1 rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors"
        >
          <User className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => navigate('/settings')}
          className="px-2 py-2 m-1 rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors"
        >
          <Settings className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-sm">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate('/support')}
          className="px-2 py-2 m-1 rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors"
        >
          <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-sm">Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem 
          onClick={handleLogout}
          className="px-2 py-2 m-1 rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors group"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-sm text-red-500 font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;