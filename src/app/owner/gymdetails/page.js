// "use client"
// import { getDataFromSessionStorage } from "@/_Components/getownerdata";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const data = getDataFromSessionStorage("item")
// export default function AddGymDetails() {
//     const router = useRouter()
//     const [gymdetails, setgymDetails] = useState({
//         morningOpening: "", morningClosing: "", eveningOpening: "", eveningClosing: "", gymAddress: "",
//     })
//     const handleGymDetail = (e) => {
//         e.preventDefault();
//         let name = e.target.name;
//         let value = e.target.value;

//         setgymDetails({ ...gymdetails, [name]: value })
//     }

//     const gymDetailsPost = async (e) => {
//         e.preventDefault();
//         let _id = data._id

//         const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress } = gymdetails
//         let res = await fetch("http://localhost:3000/api/ownerroute/addgymdetails", {
//             method: "POST",
//             body: JSON.stringify({ morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, _id })
//         })
//         res = await res.json();
//         if (res.success) {
//             alert("Details Added Success")
//             sessionStorage.setItem("item", JSON.stringify(res.result))
//             router.push("/owner/profile")
//         }
//     }
//     return (
//         <div>
//             <h2>Add Gym Details</h2>
//             <form method='POST'>
//                 <div>
//                     <label htmlFor="">Morning Time</label>
//                     <br />
//                     <input type="time" name="morningOpening" value={gymdetails.morningOpening} onChange={handleGymDetail} />
//                     <span>  TO  </span>
//                     <input type="time" name="morningClosing" value={gymdetails.morningClosing} onChange={handleGymDetail} />
//                 </div>
//                 <div>
//                     <label htmlFor="time">Evening Time</label>
//                     <br />
//                     <input type="time" id="time" name="eveningOpening" value={gymdetails.eveningOpening} onChange={handleGymDetail} />
//                     <span>  TO  </span>
//                     <input type="time" name="eveningClosing" value={gymdetails.eveningClosing} onChange={handleGymDetail} />
//                 </div>
//                 <div>
//                     <label htmlFor="">Gym Address</label>
//                     <br />
//                     <input type="text" name='gymAddress' placeholder='GYM Address' value={gymdetails.gymAddress} onChange={handleGymDetail} />
//                 </div>

//                 <label htmlFor="">About Gym</label>
//                 <br />
//                 <button onClick={gymDetailsPost}>Add Details</button>
//             </form>

//         </div>
//     )
// }


"use client";
import { getDataFromSessionStorage } from "@/_Components/getownerdata";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from '@/_StyleSheet/gymdetails.module.css';

const data = getDataFromSessionStorage("item");

export default function AddGymDetails() {
    const router = useRouter();
    const [gymdetails, setgymDetails] = useState({
        morningOpening: "",
        morningClosing: "",
        eveningOpening: "",
        eveningClosing: "",
        gymAddress: "",
    });

    const handleGymDetail = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setgymDetails({ ...gymdetails, [name]: value });
    };

    const gymDetailsPost = async (e) => {
        e.preventDefault();
        let _id = data._id;

        const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress } = gymdetails;
        let res = await fetch("http://localhost:3000/api/ownerroute/addgymdetails", {
            method: "POST",
            body: JSON.stringify({ morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, _id }),
        });
        res = await res.json();
        if (res.success) {
            alert("Details Added Successfully");
            sessionStorage.setItem("item", JSON.stringify(res.result));
            router.push("/owner/profile");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add Gym Details</h2>
            <form method='POST' className={styles.form}>
                <div>
                    <label htmlFor="morningOpening">Morning Time</label>
                    <br />
                    <input
                        type="time"
                        name="morningOpening"
                        value={gymdetails.morningOpening}
                        onChange={handleGymDetail}
                    />
                    <span>TO</span>
                    <input
                        type="time"
                        name="morningClosing"
                        value={gymdetails.morningClosing}
                        onChange={handleGymDetail}
                    />
                </div>
                <div>
                    <label htmlFor="eveningOpening">Evening Time</label>
                    <br />
                    <input
                        type="time"
                        id="eveningOpening"
                        name="eveningOpening"
                        value={gymdetails.eveningOpening}
                        onChange={handleGymDetail}
                    />
                    <span>TO</span>
                    <input
                        type="time"
                        name="eveningClosing"
                        value={gymdetails.eveningClosing}
                        onChange={handleGymDetail}
                    />
                </div>
                <div>
                    <label htmlFor="gymAddress">Gym Address</label>
                    <br />
                    <input
                        type="text"
                        name="gymAddress"
                        placeholder="GYM Address"
                        value={gymdetails.gymAddress}
                        onChange={handleGymDetail}
                    />
                </div>
                <button onClick={gymDetailsPost}>Add Details</button>
            </form>
        </div>
    );
}
