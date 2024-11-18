import { useState } from "react";
import styles from "../_StyleSheet/loginsignup.module.css"; // Import CSS Module
import { useRouter } from "next/navigation";

export default function RegisterOwner() {
    const router = useRouter();
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        gymname: "",
        password: ""
    });

    const handleData = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const registerOwner = async () => {
        const { name, email, gymname, phone, password } = registerData;
        let res = await fetch("http://localhost:3000/api/ownerroute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, gymname, phone, password })
        });

        res = await res.json();
        if (res.success) {
            alert("User Added Success");
            sessionStorage.setItem("item",JSON.stringify(res.result))
            router.push("/owner/gymdetails")
        }
        else {
            alert("User Already Exist")
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Owner Registration</h1>
            <form className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleData}
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleData}
                    className={styles.input}
                />
                <input
                    type="number"
                    name="phone"
                    placeholder="Enter Number"
                    onChange={handleData}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="gymname"
                    placeholder="Enter Gym Name"
                    onChange={handleData}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleData}
                    className={styles.input}
                />
            </form>
            <button
                onClick={registerOwner}
                className={styles.button}
            >
                Register
            </button>
        </div>
    );
}
