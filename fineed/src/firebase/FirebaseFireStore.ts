import { db,Auth } from "./Firebase"
import { useEffect, useState } from 'react';
import { useRadioGroup } from "@material-ui/core";

export type Barrage = {
    uid: string,
    content: string,
    time: number,
    tag: string
}

db.collection('barrage').onSnapshot(function (querySnapshot) {
    let barrages: Array<Barrage> = [];
    querySnapshot.forEach(function (doc) {
        barrages.push(doc.data().name);
    });
    console.log("all barrage", barrages.join(", "));
});

export const useBarrages = () => {
    const [ready, setReady] = useState(false);
    const [barrages, setBarrages] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe =  Auth().onAuthStateChanged((user) =>{
            
            db.collection('barrage').onSnapshot(function (querySnapshot) {
                let barrages:any[]= [];
                querySnapshot.forEach(function (doc) {
                    const barrageitem  = doc.data()
                    barrages.push(doc.data());
                });
                setBarrages(barrages);
                if (barrages) {
                    setReady(true);
                }
            }, (error) => { console.log(error) });
          })
        return () => unsubscribe();
    }, []);
    return { ready, barrages };
}

