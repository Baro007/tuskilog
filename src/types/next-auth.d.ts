import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    createdAt?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      createdAt?: string
    }
  }
} 