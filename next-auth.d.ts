// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    // add any other custom user fields here
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}