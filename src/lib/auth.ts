import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'email') {
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
      } catch (error) {
        console.error('SignIn error:', error)
        return false
      }
    },
    async session({ session }) {
      try {
        if (session.user?.email) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single()

          if (error) {
            console.error('Error fetching user data:', error)
            return session
          }

          if (data) {
            session.user.id = data.id
            session.user.createdAt = data.created_at
          }
        }
        return session
      } catch (error) {
        console.error('Session error:', error)
        return session
      }
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