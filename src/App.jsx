import React, { useEffect, useState, createContext, useContext } from "react";
import TopcardHolder from "./Components/TopcardHolder";
import axios from "axios";
import Userlist from "./Components/Userlist";

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [boo, setBoo] = useState(false);
  const [openingID, setOpeningId] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
  });

  // step:1 api fetch on every reload or render and data gets updated in 'users'

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [boo]);

  const fetchData = async () => {
    await axios
      .get("https://6646393751e227f23aae4756.mockapi.io/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  //Step:2 every time users get updated total users, total expense, total income is calculated and updated to respective state

  useEffect(() => {
    setTotalUsers(users.length);
    setTotalExpense(
      users.reduce((accumulator, ele) => {
        return accumulator + Number(ele.expense);
      }, 0)
    );
    setTotalIncome(
      users.reduce((accumulator, ele) => {
        return accumulator + Number(ele.income);
      }, 0)
    );
  }, [users]);

  //handle change function
  let dummyData1 = {
    name: "",
    city: "",
    email: "",
    phone: "",
    company_name: "",
    income: "",
    expense: "",
    avatar: "",
  };
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    if (names == "name") {
      dummyData1.name = value;
    } else if (names == "city") {
      dummyData1.city = value;
    } else if (names == "email") {
      dummyData1.email = value;
    } else if (names == "phone") {
      dummyData1.phone = value;
    } else if (names == "company_name") {
      dummyData1.company_name = value;
    } else if (names == "income") {
      dummyData1.income = value;
    } else if (names == "expense") {
      dummyData1.expense = value;
    } else if (names == "avatar") {
      dummyData1.avatar = value;
    }
    console.log("working", dummyData1);
  };

  //handleSubmit function
  const handleSubmit = async () => {
    await axios
      .post(
        "https://6646393751e227f23aae4756.mockapi.io/api/users/",
        dummyData1
      )
      .then((res) => {
        res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData();
    console.log(dummyData1);
  };
  //jsx

  return (
    <div>
      {/* Step: 3 all datas are provided into the components via context api - 'UserContext' */}

      <UserContext.Provider
        value={[
          totalUsers,
          totalExpense,
          totalIncome,
          users,
          boo,
          setBoo,
          fetchData,
        ]}
      >
        <TopcardHolder />
        <Userlist />
        <button
          className="create btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        >
          Create
        </button>

        {/* create modal begins */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel1">
                  Create User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={fetchData}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <form>
                    <label>
                      <b>Name</b>
                      <input type="text" name="name" onChange={handleChange} />
                    </label>
                    <label>
                      <b>City</b>
                      <input type="text" name="city" onChange={handleChange} />
                    </label>
                    <label>
                      <b>Email</b>
                      <input type="text" name="email" onChange={handleChange} />
                    </label>
                    <label>
                      <b>Phone</b>
                      <input type="text" name="phone" onChange={handleChange} />
                    </label>
                    <label>
                      <b>Company</b>
                      <input
                        type="text"
                        name="company_name"
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <b>Income</b>
                      <input
                        type="text"
                        name="income"
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <b>Expense</b>
                      <input
                        type="text"
                        name="expense"
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <b>Avatar</b>
                      <input
                        type="text"
                        name="avatar"
                        onChange={handleChange}
                      />
                    </label>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*create modale ends */}
      </UserContext.Provider>
    </div>
  );
};

export const UserContext = createContext();
export default App;
