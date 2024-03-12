import { InitialFriendsType } from "../data/data";
import Friend from "./Friend";
type FriendsListProps = {
  friends: InitialFriendsType[];
  onSelection: (friend: InitialFriendsType) => void;
  selectedFriend: InitialFriendsType | null;
};
const FriendsList = ({
  friends,
  onSelection,
  selectedFriend,
}: FriendsListProps) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

export default FriendsList;
