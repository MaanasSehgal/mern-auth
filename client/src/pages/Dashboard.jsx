import {useContext} from "react";
import {UserContext} from "../../context/userContext";

export default function Dashboard() {
    const {user} = useContext(UserContext);
    return (
        <div>
            <h1>DashBoard</h1>
            {!!user && (
                <h2>
                    Hi {user.name}! : {"null"}
                </h2>
            )}
        </div>
    );
}
