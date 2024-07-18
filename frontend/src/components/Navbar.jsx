import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, db } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        
        const fetchUserType = async () => {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserType(userDoc.data().userType);
          }
        };

        fetchUserType();
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, []);  // Empty array means this effect runs once on mount and clean up on unmount

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img
            src='/speedlogo.png'
            width='280px'
          />
        </Link>
        { isLoggedIn && (
          <>
            { userType === 'hiringManager' ? (
              <>
                <Link
                  to="/hiring"
                  className={`${ location.pathname === '/hiring' ? 'text-foreground' : 'text-muted-foreground' } transition-colors hover:text-foreground`}
                >
                  My listings
                </Link>
                <Link
                  to="/postjob"
                  className={`${ location.pathname === '/postjob' ? 'text-foreground' : 'text-muted-foreground' } transition-colors hover:text-foreground`}
                >
                  Job form
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/offers"
                  className={`${ location.pathname === '/offers' ? 'text-foreground' : 'text-muted-foreground' } transition-colors hover:text-foreground`}
                >
                  Offers
                </Link>
                <Link
                  to="/findjob"
                  className={`${ location.pathname === '/findjob' ? 'text-foreground' : 'text-muted-foreground' } transition-colors hover:text-foreground`}
                >
                  User form
                </Link>              
              </>
            )}
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </a>
            <a href="#" className="hover:text-foreground">
              Settings
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          { isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => { signOut(auth); navigate('/'); }}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant='ghost' asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar