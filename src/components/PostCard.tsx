import type { Post } from "@/types/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{post.body}</p>
      </CardContent>
    </Card>
  )
}