import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Phone, Mail, Key, UserCircle, Lock, Loader2 } from 'lucide-react';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    username: '',
    email: '',
    password: '',
    role: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    // Client-side validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (formData.phoneNo.length < 10) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNo: parseInt(formData.phoneNo),
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phoneNo: '',
        username: '',
        email: '',
        password: '',
        role: ''
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same until the button...

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Previous JSX remains the same until the button... */}
      <div className="w-full max-w-md relative">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
        
        <Card className="w-full border-0 bg-gray-800/50 backdrop-blur-lg shadow-2xl">
          <CardHeader className="space-y-1 pb-8">
            <div className="w-full flex justify-center mb-4">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-200">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Previous form fields remain the same... */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="pl-10 bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-all text-white placeholder:text-gray-400"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNo" className="text-gray-200">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    type="tel"
                    placeholder="1234567890"
                    className="pl-10 bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-all text-white placeholder:text-gray-400"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">Username</Label>
                <div className="relative group">
                  <UserCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe123"
                    className="pl-10 bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-all text-white placeholder:text-gray-400"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-all text-white placeholder:text-gray-400"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative group">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10 bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 transition-all text-white placeholder:text-gray-400"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-200">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={handleRoleChange}
                  required
                  disabled={isLoading}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-700 focus:border-blue-400 focus:ring-blue-400 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="user" className="text-white hover:bg-gray-700">User</SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-gray-700">Admin</SelectItem>
                    <SelectItem value="moderator" className="text-white hover:bg-gray-700">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-white">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-900/50 border-green-800 text-white">
                  <AlertDescription>Registration successful!</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserRegistration;