import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { COMPANY_COMPANY_SHOWN_NAME_MAP, COMPANY_LIST, ERROR } from "../../atoms/constants";
import { curUserUidAtom } from "../../atoms/FirebaseUserAtom";
import { userSubscriptionStatusAtom } from "../../atoms/UserSubscriptionStatusAtom";
import { getSubscriptionUpdateNumbers } from "../../firebase/FirebaseFunction";

const initialList: string[] = [];
const initialMap: Map<string, number> = new Map();

export function SubscriptionPage() {
    const userId = useRecoilValue(curUserUidAtom);
    const subsStatus: boolean[] = useRecoilValue(userSubscriptionStatusAtom);
    const [subsList, setSubsList] = useState(initialList);
    const [subsNotifications, setSubsNotifications] = useState(initialMap);

    useEffect(() => {
        const getNotification = async () => {
            let subscriptionList: string[] = [];
            for (let i = 0; i < subsStatus.length; ++i) {
                if (subsStatus[i]) {
                    subscriptionList.push(COMPANY_LIST[i]);
                }
            }
            const data = {
                userId: userId,
                subscriptionList: subscriptionList,
            }
            setSubsList(subscriptionList);
            const getSubscriptionUpdateNumbersResp = (await getSubscriptionUpdateNumbers(data)).data;
            if (getSubscriptionUpdateNumbersResp.error !== ERROR.NO_ERROR) {
                console.log(getSubscriptionUpdateNumbersResp.error);
                return;
            }
            const updates = getSubscriptionUpdateNumbersResp.resp;
            let notifications: Map<string, number> = new Map();
            Object.keys(updates).map((company: string) => {
                notifications.set(company, updates[company]);
            })
            setSubsNotifications(notifications);
        }
        getNotification();
    }, [])

    const subscribedCompanyComponents = (subsList: string[], subsNotifications: Map<string, number>) => {
        return (
            <div>
                {
                    subsList.map((company: string) => {
                        const updateNumber = subsNotifications.get(company) || 0;
                        if (updateNumber > 0) {
                            return <div>{COMPANY_COMPANY_SHOWN_NAME_MAP.get(`news_${company}`)}: You have {updateNumber} unread news</div>
                        }
                        return null;
                    })
                }
            </div>
        )
    }

    return (
        <div>
            {subscribedCompanyComponents(subsList, subsNotifications)}
        </div>
        
    )
}