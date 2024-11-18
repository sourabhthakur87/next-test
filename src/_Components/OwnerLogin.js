import { useState } from "react"
import styles from "../_StyleSheet/loginsignup.module.css"; // Import CSS Module
import { useRouter } from "next/navigation";

export default function OwnerLogin() {
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const handleData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const loginOwner = async () => {
        const { email, password } = loginData
        let res = await fetch("http://localhost:3000/api/ownerroute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, login: true })
        });
        res = await res.json();
        if (res.success) {
            // console.log(res);
            router.push("/owner/profile")
        }
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Owner Login</h1>
            <form className={styles.form}>
                <input className={styles.input} type="email" name="email" placeholder="Enter Email" onChange={handleData} />
                <input className={styles.input} type="password" name="password" placeholder="Enter Password" onChange={handleData} />
            </form>
            <button className={styles.button} onClick={loginOwner}>Login</button>
        </div>
    )
}
