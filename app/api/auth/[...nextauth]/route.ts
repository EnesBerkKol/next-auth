import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { jwtDecode } from "jwt-decode";

const namespace = "https://yourapp.example.com/";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        try {
          const decoded: any = jwtDecode(account.access_token);
          const roles = decoded[namespace + "roles"] || [];
          token.role = roles.length > 0 ? roles[0] : "user";
        } catch {
          token.role = "user";
        }
      }
      return token;
    },
   async session({ session, token }) {
  session.accessToken = token.accessToken as string;

  if (session.user) {
    session.user.role = token.role as string || "user";
  } else {
    session.user = {
      role: token.role as string || "user"
    };
  }

  return session;



  return session;


    },
  },
});

export { handler as GET, handler as POST };




//feat(auth): Auth0 provider ile NextAuth entegrasyonu yapıldı

//- Auth0 OAuth sağlayıcısı eklendi
//- JWT tabanlı oturum yönetimi aktif edildi
//- jwt ve session callback'leri ile accessToken session'a aktarıldı
//- NEXTAUTH_SECRET ortam değişkeni kullanıldı