"use client";
import { useEffect, useState } from 'react';
import { getDataFromSessionStorage } from "@/_Components/getownerdata";
import styles from '@/_StyleSheet/oneMember.module.css';

export default function OneMemberPage({ params }) {
  const [member, setMember] = useState(null);
  const [history, setHistory] = useState([]);
  const memberId = params.onemember;

  const [datq, setDat] = useState({ feeDuration: "" });
  const [registerationDate, setregisterDate] = useState({ registerdate: "" })
  const [plane, setplane] = useState({ feeDuration: "" })
  const [addamount, setaddamount] = useState({ amount: "", remark: "" })

  const [showForm, setShowForm] = useState(false);

  // const handleMember = (e) => {
  //   const { name, value } = e.target;
  //   setAddAmount({ ...addAmount, [name]: value });
  // };

  const handleDate = (e) => {
    const name = e.target.name
    const value = e.target.value
    setregisterDate({ ...registerationDate, [name]: value })
    setaddamount({ ...addamount, [name]: value })
    const q = new Date(registerationDate.registerdate)
    const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
    setplane({ ...plane, [name]: value });
    setDat({ ...datq, [name]: duration })
  };

  const addPayment = async () => {
    const { feeDuration } = datq;
    const planeType = plane.feeDuration
    const { registerdate } = registerationDate
    const { amount, remark } = addamount
    console.log(feeDuration, planeType, registerdate, amount, remark,
    );

    // return false;

    let res = await fetch(`http://localhost:3000/api/ownerroute/addmember/${memberId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount, remark, feeDuration, planeType, registerdate })
    });

    res = await res.json();
    if (res.success) {
      alert("History Added Successfully");
      setHistory(prevHistory => [...prevHistory, { amount, remark, feeDuration, planeType, registerdate }]);
      setShowForm(false); // Hide form after successful submission
    } else {
      alert(res.result);
    }
  };

  useEffect(() => {
    const data = getDataFromSessionStorage("members");
    if (data) {
      const member = data.find(m => m._id === memberId);
      setMember(member);
      setHistory(member.feeHistory);
    }
  }, [memberId]);

  if (!member) {
    return <div>Loading...</div>;
  }

  let Remaining;

  return (
    <div className={styles.container}>
      <div className={styles.memberInfo}>
        <h1>Member Details</h1>
        <p><strong>UserName:</strong> {member.userName}</p>
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Phone:</strong> <a href={`tel:${member.phone}`} className={styles.phoneLink}>{member.phone}</a></p>
        <p><strong>Address:</strong> {member.address}</p>
      </div>

      <button onClick={() => setShowForm(!showForm)} className={styles.toggleButton}>
        {showForm ? "Hide Form" : "Add Payment"}
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <form method="post">
            <label htmlFor="registerdate" className={styles.label}>Registration Date</label>
            <input
              type="date"
              name="registerdate"
              id="registerdate"
              onChange={handleDate}
              className={styles.input}
            />

            <label htmlFor="feeDuration" className={styles.label}>Fee Duration</label>
            <select
              name="feeDuration"
              id="feeDuration"
              onChange={handleDate}
              defaultValue={'DEFAULT'}
              required
              className={styles.select}
            >
              <option value="DEFAULT" disabled>Fee Type</option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="12">1 Year</option>
            </select>

            <label htmlFor="amount" className={styles.label}>Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleDate}
              placeholder="Amount"
              className={styles.input}
            />

            <label htmlFor="remark" className={styles.label}>Remark</label>
            <input
              type="text"
              name="remark"
              id="remark"
              onChange={handleDate}
              placeholder="Remark"
              className={styles.input}
            />

            <button
              type="button"
              onClick={addPayment}
              className={styles.button}
            >
              Add Payment
            </button>
          </form>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Plane Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Period</th>
              <th scope="col">Remaining</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
            {history.map((curr, index) => {
              const registeration = new Date(curr.registerdate)
              const x = registeration.toLocaleDateString();

              const feeDuration = new Date(curr.feeDuration);
              const z = feeDuration.toLocaleDateString();
              const q = new Date();
              if (q.getTime() > registeration.getTime()) {
                const diff = feeDuration.getTime() - q.getTime();
                const one_day = 1000 * 3600 * 24;
                Remaining = Math.ceil(diff / one_day)
              }
              else {
                const diff = feeDuration.getTime() - registeration.getTime();
                const one_day = 1000 * 3600 * 24;
                Remaining = Math.ceil(diff / one_day)
              }

              return (
                <tr key={index}>
                  <td data-label="Plane Type">{curr.planeType} Month</td>
                  <td data-label="Amount">{curr.amount}</td>
                  <td data-label="Period">{x} - {z}</td>
                  <td data-label="Remaining Days">{Remaining}</td>
                  <td data-label="Remark">{curr.remark === "" ? "First Payment" : curr.remark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
