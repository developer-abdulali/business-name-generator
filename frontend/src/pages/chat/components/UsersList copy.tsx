import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();

  return (
    <ScrollArea className="p-2 sm:p-4">
      <div className="space-y-2">
        {isLoading ? (
          <UsersListSkeleton />
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-colors ${
                selectedUser?.clerkId === user.clerkId
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-800/50"
              }`}
            >
              <div className="relative">
                <Avatar className="size-8 sm:size-10">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <div
                  className={`absolute bottom-0 right-0 h-2 w-2 sm:h-3 sm:w-3 rounded-full ring-2 ring-zinc-900 ${
                    onlineUsers.has(user.clerkId)
                      ? "bg-green-500"
                      : "bg-zinc-500"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0 hidden sm:block">
                <span className="font-medium text-sm sm:text-base truncate">
                  {user.fullName}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default UsersList;
