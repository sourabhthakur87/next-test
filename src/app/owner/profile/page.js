"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import styles from '@/_StyleSheet/ownerProfile.module.css'

export default function Page() {
    const [ownerData, setOwnerData] = useState("")

    const getOwnerData = async () => {
        let res = await fetch("http://localhost:3000/api/current")
        res = await res.json()
        if (res.success) {
            const { result } = res
            setOwnerData(result)
            sessionStorage.setItem("item", JSON.stringify(result))
        }
    }

    useEffect(() => {
        getOwnerData()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Owner Profile</h1>
            <div className={styles.card}>
                <h2>Profile Details</h2>
                <p><strong>Name:</strong> {ownerData.name}</p>
                <p><strong>Email:</strong> {ownerData.email}</p>
                <p><strong>Phone:</strong> {ownerData.phone}</p>
                <p><strong>Gym Name:</strong> {ownerData.gymname}</p>
            </div>
            <div className={styles.linkContainer}>
                <Link href="/owner/addmember" className={styles.link}>Add Member</Link>
                <Link href="/owner/memberlist" className={styles.link}>Member List</Link>
                <Link href="/owner/logout" className={styles.link}>Logout</Link>
            </div>
        </div>
    )
}
