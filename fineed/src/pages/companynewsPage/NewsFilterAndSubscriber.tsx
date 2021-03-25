// import { useRecoilState } from "recoil";
import * as Atoms from "../../atoms/FirebaseUserAtom";
import { useRecoilValue } from "recoil";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { addUserSubscription } from "../../firebase/FirebaseFunction";
import { ERROR } from "../../atoms/constants";

export function NewsFilterAndSubscriber(props: any) {
  const userId = useRecoilValue(Atoms.curUserUidAtom);

  const subscribeOnClick = async (target: string) => {
      const data = {
          userId: userId,
          target: target,
      }
      const addUserSubscriptionResp = (await addUserSubscription(data)).data;
      if (addUserSubscriptionResp.error !== ERROR.NO_ERROR) {
        console.log(addUserSubscriptionResp.error);
        return;
      }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "amazon" })}
      >
        Amazon
      </Button>
      <IconButton style={{ marginRight: "30px" }} onClick={() => {subscribeOnClick("amazon")}}>
        <AddCircleIcon fontSize="small" color="action"/>
      </IconButton>

      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "facebook" })}
      >
        Facebook
      </Button>
      <IconButton style={{ marginRight: "30px" }} onClick={() => {subscribeOnClick("facebook")}}>
        <AddCircleIcon fontSize="small" color="action" />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "google" })}
      >
        Google
      </Button>
      <IconButton style={{ marginRight: "30px" }} onClick={() => {subscribeOnClick("google")}}>
        <AddCircleIcon fontSize="small" color="action" />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "apple" })}
      >
        Apple
      </Button>
      <IconButton style={{ marginRight: "30px" }} onClick={() => {subscribeOnClick("apple")}}>
        <AddCircleIcon fontSize="small" color="action" />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.setFilter({ target: "microsoft" })}
      >
        Microsoft
      </Button>
      <IconButton style={{ marginRight: "30px" }} onClick={() => {subscribeOnClick("microsoft")}}>
        <AddCircleIcon fontSize="small" color="action" />
      </IconButton>
    </div>
  );
}
