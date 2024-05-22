import React, { useContext, useState, useReducer, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";

const Userlist = () => {
  // step:1 data received from context - we use users(api fetched data)

  let [totalUsers, totalExpense, totalIncome, users, boo, setBoo, fetchData] =
    useContext(UserContext);

  const [edit, setEdit] = useState(false);
  const [openingID, setOpeningId] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
  });

  useEffect(() => {
    console.log(edit);
  }, []);

  let dummyData = openingID;
  // console.log('dummy',dummyData)
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    console.log("working", e.target.value);
    let names = e.target.name;
    let value = e.target.value;
    if (names === "name") {
      dummyData.name = value;
    } else if (names === "city") {
      dummyData.city = value;
    } else if (names === "email") {
      dummyData.email = value;
    } else if (names === "phone") {
      dummyData.phone = value;
    } else if (names === "company_name") {
      dummyData.company_name = value;
    } else if (names === "income") {
      dummyData.income = value;
    } else if (names === "expense") {
      dummyData.expense = value;
    } else if (names === "avatar") {
      dummyData.avatar = value;
    }

    console.log("dummyData", dummyData, "2 work");
    console.log("opID", dummyData, "2 work");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBoo(!boo);

    // console.log('open ID after change', openingID)
    await axios
      .put(
        `https://6646393751e227f23aae4756.mockapi.io/api/users/${openingID.id}`,
        openingID
      )
      .then((res) => {
        res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //  setOpeningId(dummyData)
    setEdit(!edit);
  };

  const handleClick = async (id) => {
    setOpeningId([]);
    await axios
      .get(`https://6646393751e227f23aae4756.mockapi.io/api/users/${id}`)
      .then((res) => {
        setOpeningId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(openingID);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://6646393751e227f23aae4756.mockapi.io/api/users/${id}`)
      .then((res) => {
        res.data;
      })
      .catch((err) => console.log(err));
    fetchData();
    // console.log(id)
  };

  //handleFetch
  const handleFetch = () => {
    setTimeout(() => {
      setEdit(false);
    }, 500);

    fetchData();
  };
  //jsx
  return (
    <div className="container containerCard col-12">
      <p className="listHeading">User List</p>
      <table className="table thead-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col" className="resp">
              Phone
            </th>
            <th scope="col" className="resp">
              Email
            </th>
            <th scope="col" className="resp">
              Company
            </th>
          </tr>
        </thead>
        <tbody>
          {/* all data are mapped into the table  */}

          {users.map((ele) => {
            return (
              <tr
                key={ele.id}
                onClick={() => {
                  handleClick(ele.id);
                }}
                className="userRow"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <th scope="row">{ele.id}</th>
                <td>{ele.name}</td>
                <td>{ele.city}</td>
                <td className="resp">{ele.phone}</td>
                <td className="resp">{ele.email}</td>
                <td className="resp">{ele.company_name}</td>
                <td className="resp">
                  {ele.income > ele.expense ? (
                    <i
                      className="fa-solid fa-arrow-trend-up"
                      style={{ color: "#63E6BE" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-arrow-trend-down"
                      style={{ color: "#e32626" }}
                    ></i>
                  )}
                </td>
              </tr>
            );
          })}
          {/* ------mapping ends -------  */}
        </tbody>
      </table>

      {/* -------modal created ------- */}
      <div
        className="modal fade "
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleFetch}
              ></button>
            </div>
            <div className="modal-body">
              <div className={edit ? "viewField display" : "viewField"}>
                <div className="topProfile">
                  <div className="avatar">
                    <img src={openingID.avatar} alt="" />
                  </div>
                  <div className="profileName">
                    <h3>{openingID.name}</h3>
                    <p>{openingID.email}</p>
                    <div className="growthGraph">
                      <p>Revenue stat:</p>
                      <div className="revenueIcon">
                        {openingID.income > openingID.expense ? (
                          <i
                            className="fa-solid fa-arrow-trend-up"
                            style={{ color: "#63E6BE" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-arrow-trend-down"
                            style={{ color: "#e32626" }}
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div className="bottomProfile">
                  <div className="bottomSection1">
                    <p>
                      <b>City:</b> {openingID.city}
                    </p>

                    <p>
                      <b>Phone:</b> {openingID.phone}
                    </p>
                    <p>
                      <b>Company:</b> {openingID.company_name}
                    </p>
                  </div>
                  <div className="bottomSection2">
                    <p>
                      <b>Income:</b> {openingID.income}
                    </p>
                    <p>
                      <b>Expense:</b> {openingID.expense}
                    </p>
                  </div>
                </div>
                <div className="functionality">
                  <button className="editButton" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(openingID.id);
                    }}
                    data-bs-dismiss="modal"
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={edit ? "editField " : "editField display"}>
                <form className="editForm">
                  <p>Edit user details</p>
                  <label>
                    <b>Name</b> {"\t"}
                    <input
                      type="text"
                      name="name"
                      defaultValue={openingID.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>City</b> {"\t"}
                    <input
                      type="text"
                      name="city"
                      defaultValue={openingID.city}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Email</b> {"\t"}
                    <input
                      type="text"
                      name="email"
                      defaultValue={openingID.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Phone</b> {"\t"}
                    <input
                      type="text"
                      name="phone"
                      defaultValue={openingID.phone}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Company</b> {"\t"}
                    <input
                      type="text"
                      name="company_name"
                      defaultValue={openingID.company_name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Income</b> {"\t"}
                    <input
                      type="text"
                      name="income"
                      defaultValue={openingID.income}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Expense</b> {"\t"}
                    <input
                      type="text"
                      name="expense"
                      defaultValue={openingID.expense}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <b>Avatar</b> {"\t"}
                    <input
                      type="text"
                      name="avatar"
                      defaultValue={openingID.avatar}
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleFetch}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------modal ended -----------  */}
      {/* -------------create button ------------ */}
    </div>
  );
};

export default Userlist;
