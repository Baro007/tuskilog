import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'email') {
        // Kullanıcıyı Supabase'e kaydet
        const { data, error } = await supabase
          .from('users')
          .upsert({
            email: user.email,
            name: user.name,
            last_sign_in: new Date().toISOString(),
          })
          .select()
          .single()

        if (error) {
          console.error('Error saving user to Supabase:', error)
          return false
        }

        user.id = data.id
        return true
      }
      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        // Kullanıcı bilgilerini Supabase'den al
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (data) {
          session.user.id = data.id
          session.user.createdAt = data.created_at
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 