
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { User } from "../../models/User"; 
import { UserSignUp } from "../../models/UserSignUp";
import { RootState } from "../../store/store"; 
import { 
    fetchUsers,
    fetchUserById,
    deleteUserById,
    fetchAddUser,
    updateUserById
} from "./userSlice"; 

const UserList = () => {
  const users = useSelector((state: RootState) => state.user.users); // גישה לרשימת המשתמשים
  const dispatch = useDispatch<AppDispatch>();
  const [newUser, setNewUser] = useState<User>({
    userId: -1,
    userName: "",
    fullName: "",
    password: "",
    email: "",
    phoneNumber:  5555555555,
    totalOfPoint: 0,
    orderList: []
  });
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateUser, setUpdateUser] = useState<Partial<User>>({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = async () => {
    const userSignUp: UserSignUp = {
      fullName: newUser.fullName,
      userName: newUser.userName,
      password: newUser.password,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber.toString()
    };
    await dispatch(fetchAddUser(userSignUp));
    setNewUser({
      userId: -1,
      userName: "",
      fullName: "",
      password: "",
      email: "",
      phoneNumber: 5555555555,
      totalOfPoint: 0,
      orderList: []
    });
    dispatch(fetchUsers());
  };

  const handleUpdateUser = async () => {
    if (updateId) {
      await dispatch(updateUserById({ id: updateId, user: updateUser as User }));
      setUpdateId(null);
      setUpdateUser({});
      dispatch(fetchUsers());
    }
  };

  const handleDeleteUser = async (id: number) => {
    await dispatch(deleteUserById(id));
    dispatch(fetchUsers());
  };

  const handleFetchUserById = async (id: number) => {
    await dispatch(fetchUserById(id));
  };

  return (
    <>
      <h1>User List</h1>
    
      <div>
        <input
          type="text"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
          placeholder="User Name"
        />
        <input
          type="text"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="number"
          value={newUser.phoneNumber}
          onChange={(e) => setNewUser({ ...newUser, phoneNumber:Number(e.target.value)  })}
          placeholder="Phone Number"
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
        />
        <input
          type="number"
          value={newUser.totalOfPoint}
          onChange={(e) => setNewUser({ ...newUser, totalOfPoint: Number(e.target.value) })}
          placeholder="Total Points"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div>
        <input
          type="number"
          value={updateId ?? ""}
          onChange={(e) => setUpdateId(Number(e.target.value))}
          placeholder="User ID to Update"
        />
        <input
          type="text"
          value={updateUser.userName || ""}
          onChange={(e) => setUpdateUser({ ...updateUser, userName: e.target.value })}
          placeholder="New User Name"
        />
        <input
          type="text"
          value={updateUser.email || ""}
          onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
          placeholder="New Email"
        />
        <button onClick={handleUpdateUser}>Update User</button>
      </div>

      <h2>Users:</h2>
      {users && users.map((user: User) => (
        <ul key={user.userId}>
          <li>
            {user.userName} ({user.email})
            <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
            <button onClick={() => handleFetchUserById(user.userId)}>Fetch</button>
          </li>
        </ul>
      ))}
    </>
  );
};

export default UserList;
