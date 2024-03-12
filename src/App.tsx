import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";
import Button from "./components/UI/Button";
import initialFriends, { InitialFriendsType } from "./data/data";

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] =
    useState<InitialFriendsType | null>(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriends(friend: InitialFriendsType) {
    setFriends((friends) => [...friends, friend]);
    //NOTE - Automatically remove the FormAddFriend component when we add a new friend
    setShowAddFriend(false);
  }

  function handleSelection(friend: InitialFriendsType) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value: number) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriends} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? `close` : `Add Friend`}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          key={selectedFriend.name}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

export default App;
