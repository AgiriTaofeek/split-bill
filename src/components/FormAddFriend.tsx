import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./UI/Button";
import { InitialFriendsType } from "../data/data";
type FormAddFriendProps = {
  onAddFriend: (friend: InitialFriendsType) => void;
};

const FormAddFriend = ({ onAddFriend }: FormAddFriendProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friend">👬 Friend name</label>
      <input
        type="text"
        id="friend"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <label htmlFor="image">🖼Image URL</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImage(e.target.value)
        }
      />
      <Button>Add</Button>
    </form>
  );
};

export default FormAddFriend;
