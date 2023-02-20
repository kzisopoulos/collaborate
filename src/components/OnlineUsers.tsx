import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

const OnlineUsers = () => {
  const { error, documents } = useCollection("users");
  return (
    <div className="w-80 bg-gray-50 text-gray-700 ">
      <h2 className="text-center mb-10 text-2xl pt-10">All users:</h2>
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
          {error}
        </div>
      )}
      {documents &&
        documents.map((user: any) => (
          <div
            key={user.id}
            className="flex w-32 items-center gap-2 relative mx-auto mb-4">
            <Avatar src={user.photoURL} />
            {user.online && (
              <span className="w-3 h-3 rounded-full bg-green-500 absolute left-7 top-7"></span>
            )}
            <span>{user.displayName}</span>
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
