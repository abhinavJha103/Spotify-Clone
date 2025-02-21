import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const { success, message , token,  user } = data;

      if(token) {
        localStorage.setItem('authToken',token)
        localStorage.setItem('admin',JSON.stringify(user))
      }
      console.log(user)
      
      if (success) {
        setIsError(false);
        setSuccess(true);
        setTimeout(() => {
          navigate('/adminDashboard');
        }, 3000);
      } else {
        setIsError(true);
        toast.error(message || 'Login failed. Please try again.', { duration: 2000 });
      }
    } catch (error) {
      console.log('Some error occurred during login', error);
      setIsError(true);
      toast.error('An error occurred. Please try again later.', { duration: 2000 });
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('Admin Logged In Successfully', {
        duration: 2000,
      });
    }

    if (isError) {
      toast.error('Incorrect Username or Password', { duration: 2000 });
    }
  }, [success, isError]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} gutter={10} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiLockClosed className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiMail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Secure access for administrative users only
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;