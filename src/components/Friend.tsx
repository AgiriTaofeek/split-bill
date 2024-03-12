import { InitialFriendsType } from "../data/data";
import Button from "./UI/Button";

type FriendProps = {
  friend: InitialFriendsType;
  onSelection: (friend: InitialFriendsType) => void;
  selectedFriend: InitialFriendsType | null;
};

const Friend = ({ friend, onSelection, selectedFriend }: FriendProps) => {
  //NOTE - Optional Chaining is used here because by default the selectedFriend is null which will lead to an error
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}£
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}£
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

export default Friend;
