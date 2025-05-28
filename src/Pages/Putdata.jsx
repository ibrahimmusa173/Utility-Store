import { useState } from "react";
import axios from "axios";

function Userregistration() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const createUser = async () => {
        try {
            const response = await axios.post("http://localhost:7000/form1", {
                name,
                username,
                email
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                alert("New user added");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to add user: " + (error.response?.data || error.message));
        }
    };

    return (
        <div>

             <a className="font-bold text-3xl border border-black bg-yellow-400" href="/getdata">Get data</a>

            <h1>Add new user</h1>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={createUser}>Add User</button>
        </div>
    );
}

export default Userregistration;
