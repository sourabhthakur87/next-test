"use client"

import { getDataFromSessionStorage } from "@/_Components/getownerdata";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from '@/_StyleSheet/addmember.module.css';

const data = getDataFromSessionStorage("item");

export default function AddMember() {
    const router = useRouter();
    const [addmember, setAddmember] = useState({
        userName: "", name: "", phone: "", address: "", amount: "", dite: "", remark: ""
    });
    const [datq, setDat] = useState({ feeDuration: "" });
    const [registerationDate, setRegisterDate] = useState({ registerdate: "" });
    const [plane, setPlane] = useState({ feeDuration: "" });

    const handleMember = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value.toLowerCase();
        setAddmember({ ...addmember, [name]: value });
    };

    const handleDate = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setRegisterDate({ ...registerationDate, [name]: value });
        const q = new Date(registerationDate.registerdate);
        const duration = new Date(q.getFullYear(), q.getMonth() + parseInt(value), q.getDate());
        setPlane({ ...plane, [name]: value });
        setDat({ ...datq, [name]: duration });
    };

    const addMember = async () => {
        const { userName, name, phone, address, amount } = addmember;
        const { feeDuration } = datq;
        const planeType = plane.feeDuration;
        const { registerdate } = registerationDate;
        const { _id: owner_id, gymname } = data;
        const { eveningClosing, eveningOpening, gymAddress, morningClosing, morningOpening } = data.gymDetails;

        let res = await fetch("http://localhost:3000/api/ownerroute/addmember", {
            method: "POST",
            body: JSON.stringify({ userName, name, phone, address, amount, feeDuration, planeType, registerdate, owner_id, eveningClosing, eveningOpening, gymAddress, morningClosing, morningOpening, gymname })
        });
        res = await res.json();
        if (res.success) {
            alert("Member Added Successfully");
            router.push("/owner/memberlist");
        } else {
            alert(res.result);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add Member</h1>
            <form className={styles.form}>
                <label htmlFor="userName" className={styles.label}>Username</label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    onChange={handleMember}
                    placeholder="Username"
                    className={styles.input}
                />

                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleMember}
                    placeholder="Name"
                    className={styles.input}
                />

                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    onChange={handleMember}
                    placeholder="Phone Number"
                    className={styles.input}
                />

                <label htmlFor="address" className={styles.label}>Address</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleMember}
                    placeholder="Address"
                    className={styles.input}
                />

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
                    onChange={handleMember}
                    placeholder="Amount"
                    className={styles.input}
                />

                <button
                    type="button"
                    onClick={addMember}
                    className={styles.button}
                >
                    Add Member
                </button>
            </form>
        </div>
    );
}
