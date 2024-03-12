import { ChangeEvent, FormEvent, useState } from "react";
import { InitialFriendsType } from "../data/data";
import Button from "./UI/Button";
type FormSplitBillProps = {
  selectedFriend: InitialFriendsType;
  onSplitBill: (value: number) => void;
};

const FormSplitBill = ({ selectedFriend, onSplitBill }: FormSplitBillProps) => {
  const [bill, setBill] = useState<string | number>("");
  const [paidByUser, setPaidByUser] = useState<string | number>("");
  const paidByFriend = bill ? +bill - +paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(
      whoIsPaying === "user" ? Number(paidByFriend) : -Number(paidByUser)
    );
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="bill-value">💰 Bill value</label>
      <input
        type="number"
        id="bill-value"
        value={bill}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setBill(+e.target.value)
        }
      />
      <label htmlFor="your-expense">🤷‍♂️ Your expense</label>
      <input
        type="number"
        id="your-expense"
        value={paidByUser}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //NOTE - If the paidByUser is greater than the bill, the paidByUser state should not be change else change it
          setPaidByUser(+e.target.value > +bill ? paidByUser : +e.target.value)
        }
      />
      <label htmlFor="friend-expense">👬 {selectedFriend.name}'s expense</label>
      <input type="number" id="friend-expense" disabled value={paidByFriend} />
      <label htmlFor="who-pays">🤑 Who is paying the bill</label>
      <select
        id="who-pays"
        value={whoIsPaying}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setWhoIsPaying(e.target.value)
        }
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};

export default FormSplitBill;
