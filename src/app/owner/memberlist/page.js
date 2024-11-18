"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '@/_StyleSheet/memberlist.module.css'; // Ensure this path is correct

export default function MembersList() {
    const [memberData, setMemberData] = useState([]);
    const [ownerData, setOwnerData] = useState(null); // State to store ownerData safely on the client
    const [mySearch, setMySearch] = useState("");
    const [showUpcoming, setShowUpcoming] = useState(false);
    const [memberNumber, setMemberNumber] = useState(10);

    // Fetch `ownerData` from sessionStorage on the client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedOwnerData = sessionStorage.getItem("item");
            if (storedOwnerData) {
                setOwnerData(JSON.parse(storedOwnerData));
            }
        }
    }, []);

    const getMemberList = async () => {
        if (!ownerData?._id) return; // Only fetch if `ownerData` is available
        try {
            let res = await fetch(`http://localhost:3000/api/ownerroute/addmember/${ownerData._id}`);
            res = await res.json();
            if (res.success) {
                setMemberData(res.result);
                sessionStorage.setItem("members", JSON.stringify(res.result));
            } else {
                alert(res.result || "Failed to fetch members.");
            }
        } catch (error) {
            alert("An error occurred while fetching members.");
            console.error("Fetch error:", error);
        }
    };

    const deleteMember = async (id) => {
        if (window.confirm("Are You Sure to delete Member ") === true) {
            try {
                let res = await fetch(`http://localhost:3000/api/ownerroute/addmember/${id}`, {
                    method: "delete"
                });

                res = await res.json();
                if (res.success) {
                    alert(res.result);
                    getMemberList(); // Refresh the member list
                } else {
                    alert(res.result);
                }
            } catch (error) {
                console.error("Error deleting member:", error);
            }
        }
    };

    useEffect(() => {
        if (ownerData?._id) {
            getMemberList();
        }
    }, [ownerData]);

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <select
                    className={styles.filterSelect}
                    value={showUpcoming}
                    onChange={(e) => setShowUpcoming(e.target.value === 'true')}
                >
                    <option value={false}>All Payments</option>
                    <option value={true}>Upcoming Payments</option>
                </select>
                <input
                    type="text"
                    name="search"
                    className={styles.searchInput}
                    onChange={(e) => setMySearch(e.target.value)}
                    placeholder="Search"
                />
                <Link href="/owner/addmember" className={styles.addMemberLink}>Add Member</Link>
            </div>

            <div className={styles.tableContainer}>
                <h2>Member Details</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>SNO.</th>
                            <th>Name</th>
                            <th>Phone N0.</th>
                            <th>Amount</th>
                            <th>Plan Type</th>
                            <th>Duration</th>
                            <th>Days Left</th>
                            <th>Update Fee</th>
                            <th>Delete</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberData
                            .filter(val => mySearch === "" ||
                                val.userName.toLowerCase().includes(mySearch.toLowerCase()) ||
                                val.name.toLowerCase().includes(mySearch.toLowerCase()) ||
                                val.phone.toString().includes(mySearch.toLowerCase())
                            )
                            .filter(val => !showUpcoming ||
                                Math.ceil((new Date(val.feeDuration).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) <= 5
                            )
                            .slice(-memberNumber)
                            .reverse()
                            .map((curr, index) => {
                                const registrationDate = new Date(curr.registerdate).toLocaleDateString();
                                const feeDurationDate = new Date(curr.feeDuration).toLocaleDateString();
                                const remainingDays = Math.ceil((new Date(curr.feeDuration).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                return (
                                    <tr
                                        key={curr._id}
                                        className={remainingDays <= 5 ? styles.upcomingPayment : ""}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{curr.name}</td>
                                        <td><a href={`tel:${curr.phone}`} className={styles.phoneLink}>{curr.phone}</a></td>
                                        <td>{curr.amount}</td>
                                        <td>{curr.planeType} Month</td>
                                        <td>{registrationDate} <br /> TO <br /> {feeDurationDate}</td>
                                        <td>{remainingDays}</td>
                                        <td className={styles.updateButton}>Update Fee</td>
                                        <td><button className={styles.deleteButton} onClick={() => deleteMember(curr._id)}>Delete</button></td>
                                        <td><Link href={`/owner/memberlist/${curr._id}`} className={styles.detailsLink}>All Info</Link></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
