"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { User, Post } from "@/types/types"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UserCard from "@/components/UserCard"
import PostCard from "@/components/PostCard"

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      return response.data
    },
  })

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return []
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`)
      return response.data
    },
    enabled: !!selectedUserId,
  })

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-8 text-black">
          Users & Posts Dashboard
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4">Users</CardTitle>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredUsers?.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserCard
                      user={user}
                      onClick={() => setSelectedUserId(user.id)}
                      isSelected={selectedUserId === user.id}
                      isLoading={usersLoading}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-4">Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {postsLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : postsError ? (
                <div className="text-red-500 text-center">Failed to load posts.</div>
              ) : posts && posts.length > 0 ? (
                <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">Select a user to view their posts.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}