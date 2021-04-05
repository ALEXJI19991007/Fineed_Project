import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { verifyUser } from "../../firebase/FirebaseFunction";
import { ERROR } from "../../atoms/constants";
import { useHistory } from "react-router";

export function VerificationPage(props: any) {
    let [msg, setMsg] = useState("Verifying...");
    let history = useHistory();

    const queryString = props.location.search;
    const searchParams = new URLSearchParams(queryString);
    const userId = searchParams.get("userId");

    useEffect(() => {
        if(!userId) {
            setMsg("Verification failed.");
        }
        else{
            verifyUser({ userId: userId }).then((res) => {
                const resp = res.data;
                // success - redirect to /home
                if(resp.error === ERROR.NO_ERROR) {
                    setMsg("Success! Redirecting...");
                    history.push("/home");
                }
                // db failed to update
                else{
                    setMsg("Verification failed.");
                    console.log("verification failed.");
                }
            })
        }
    }, []);
    return (
    <div>
        <Typography>{msg}</Typography>
    </div>
    );
}