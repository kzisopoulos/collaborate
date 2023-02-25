import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

const OnlineUsers = () => {
  const { error, documents } = useCollection("users");
  return (
    <div className="bg-gray-50 text-gray-700 px-3">
      <h2 className=" text-gray-700 mt-10 mb-8 ">Team Members : </h2>
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
          {error}
        </div>
      )}
      {documents &&
        documents.map((user: any) => (
          <div
            key={user.id}
            className="flex w-48 items-center gap-2 relative mb-4">
            <Avatar src={user.displayName} />
            {user.online && (
              <span className="w-3 h-3 rounded-full bg-green-500 absolute left-7 top-7"></span>
            )}
            <span>{user.lastName}</span>
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
