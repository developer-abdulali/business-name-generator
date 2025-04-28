import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();

  return (
    <div>
      {isLoading ? (
        <UsersListSkeleton />
      ) : (
        <div className="p-2 sm:p-4 flex flex-row overflow-x-auto sm:flex-col sm:overflow-x-hidden space-x-2 sm:space-x-0 sm:space-y-2 scrollbar-hide sm:scrollbar-default">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-colors flex-shrink-0 w-20 sm:w-full ${
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
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
