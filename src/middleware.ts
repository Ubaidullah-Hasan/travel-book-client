import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getCurrentUser } from './services/authService';

const authRoutes = ["/login", "/register"]

type Role = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  USER: [/^\/create-post/, /^\/change-password/, /^\/profile-seetings/, /^\/add-category/, /^\/my-profile/], // must you have user to access this routes
  ADMIN: [/^\/create-post/, /^\/change-password/, /^\/profile-seetings/, /^\/add-category/, /^\/my-profile/], // must you have admin to access this routes
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if(!user){
    if (authRoutes.includes(pathname)){
      return NextResponse.next();
    }else{
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }
  // console.log(roleBasedRoutes[user.role]); // [ 'ami', 'admin' ] or ["ami", "user"],

  const routesArray = roleBasedRoutes[user.role as Role]

  if (user.role && routesArray) { 
    if(routesArray.some((route) => pathname.match(route))){

      return NextResponse.next();
    }
    
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/create-post', '/login', '/register', '/change-password', '/profile-seetings', '/add-category', '/my-profile']
}