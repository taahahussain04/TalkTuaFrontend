import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

function GoogleSignIn({ onSignInSuccess }: { onSignInSuccess: (user: any) => void }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    const handleGoogleSignIn = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          
          const user = {
            first_name: result.user.displayName?.split(' ')[0] || '',
            last_name: result.user.displayName?.split(' ').slice(1).join(' ') || '',
            email: result.user.email,
            photo_url: result.user.photoURL,
            uid: result.user.uid
          };
    
          const token = await result.user.getIdToken();
          sessionStorage.setItem("token", token);
    
          if(user){
            const response = await fetch('http://localhost:8000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            if(response.ok){
              const data = await response.json();
              console.log(data);
            }
          }
    
        } catch (error) {
          console.error('Error signing in with Google:', error);
          setError(error instanceof Error ? error.message : 'An error occurred');
        }
      };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setCurrentUser(null);
            sessionStorage.removeItem("token");
        } catch (err: unknown) {
            console.error('Error signing out:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {currentUser ? "Welcome Back!" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {currentUser ? "Manage your account" : "Choose your sign-in method"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {currentUser ? (
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {currentUser.displayName?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentUser.displayName}
              </h2>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          ) : (
            <Button 
              className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300" 
              size="lg" 
              variant="outline"
              //disabled={loading} 
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="mr-2 h-5 w-5 text-blue-600" />
              Sign in with Google
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          {currentUser && (
            <Button 
              variant="outline" 
              className="text-gray-600 hover:text-gray-800"
              disabled={loading} 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </CardFooter>
        {error && (
          <div className="px-6 pb-4">
            <div className="text-red-500 text-sm text-center px-4 py-2 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          </div>
        )}
      </Card>
    </div>
    );
}

export default GoogleSignIn;