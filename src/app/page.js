"use client"

import OwnerLogin from "@/_Components/OwnerLogin";
import RegisterOwner from "@/_Components/RegisterOwner";
import { useState } from "react";
import styles from "../_StyleSheet/loginsignup.module.css"; // Import CSS Module


export default function Home() {
  const [login, setLogin] = useState(true)
  return (
    <>
      <div className={styles.container}>

        {
          login ? <OwnerLogin /> : <RegisterOwner />
        }
        <button className={styles.button} onClick={() => setLogin(!login)}>{login ? "Don't Have an account Register Here" : "Already Have An account | Login!"}</button>
      </div>
    </>
  );
}
