
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOutIcon } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check login status whenever route changes or component mounts
    checkLoginStatus();
  }, [location.pathname]); // Re-check when route changes

  const checkLoginStatus = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setIsLoggedIn(true);
      setUserName(user.name || "User");
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Coloboma Detection
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/upload" className="text-gray-700 hover:text-primary transition-colors">
                New Diagnosis
              </Link>
              <Link to="/medical-history" className="text-gray-700 hover:text-primary transition-colors">
                Medical History
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Hi, {userName}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOutIcon className="h-4 w-4 mr-1" /> Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-lg font-medium">
                Home
              </Link>
              <Link to="/about" className="text-lg font-medium">
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/upload" className="text-lg font-medium">
                    New Diagnosis
                  </Link>
                  <Link to="/medical-history" className="text-lg font-medium">
                    Medical History
                  </Link>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-2">Signed in as {userName}</p>
                    <Button onClick={handleLogout} className="w-full">
                      <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-4">
                  <Button asChild variant="outline">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navigation;
