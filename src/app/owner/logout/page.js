"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function LogoutUser() {
    const router = useRouter();

    const logoutUser = async () => {
        let res = await fetch("http://localhost:3000/api/logout", {
            method: "GET"
        });
        res = await res.json();
        if (res.success) {
            sessionStorage.clear();
            router.push("/")
        }
        else {
            alert("Something went wrong")
        }
    }
    useEffect(() => {
        logoutUser();
    }, [])
    return (
        <div>
            <h1>Logout Success</h1>
        </div>
    )
}
