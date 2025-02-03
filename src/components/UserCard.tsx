import type { User } from "@/types/types"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserIcon, Mail, MapPin, Briefcase } from "lucide-react"

interface UserCardProps {
  user: User
  onClick: (userId: number) => void
  isSelected?: boolean
  isLoading?: boolean
}

export default function UserCard({ user, onClick, isSelected, isLoading }: UserCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </Card>
    )
  }

  const formattedAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`

  return (
    <Card
      className={`w-full transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? "ring-2 ring-purple-500 shadow-lg" : ""
      }`}
      onClick={() => onClick(user.id)}
      onKeyDown={(e) => e.key === "Enter" && onClick(user.id)}
      tabIndex={0}
      role="button"
      aria-label={`Select user ${user.name}`}
    >
      <CardContent className="p-4 flex items-start space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
          <AvatarFallback>
            <UserIcon className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user.name}</h2>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-2" />
            {user.email}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {formattedAddress}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Briefcase className="w-4 h-4 mr-2" />
            {user.company.name}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}