import { useEffect } from "react";
import classes from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store/auth/authIndex";
import Card from "../../ui/card/Card";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.auth);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={classes["user-container"]}>
      <h2>All Users</h2>
      <div className={classes.search}>
        <h3>Search</h3>
      </div>

      <table className={classes.tablez}>
        <Card className={classes.cardClass}>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Name</th>
              <th>Registered</th>
              <th>Town</th>
              <th>State</th>
              <th>Spent</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className={classes["name-content"]}>
                      <div className={classes["main-image"]}>
                        <img src={user?.photo} alt="user-photo" />
                      </div>
                      <div className={classes.name}>
                        <span>
                          <b>{user?.name} </b>
                        </span>
                        <span>
                          <b>{user?.surname}</b>
                        </span>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(user?.verifiedDate).toDateString()}</td>
                  <td>{user?.town}</td>
                  <td>{user?.state}</td>
                  <td>spent</td>
                </tr>
              );
            })}
          </tbody>
        </Card>
      </table>
    </div>
  );
};

export default AllUsers;
