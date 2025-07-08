import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;   // role eklendi
    };
  }

  interface User {
    role?: string;
  }
}

//feat(auth): NextAuth Session tipine accessToken alanı eklendi

//- Session arayüzüne accessToken özelliği eklendi
//- Böylece oturumda accessToken saklanıp TypeScript hatası önlenmiş oldu



