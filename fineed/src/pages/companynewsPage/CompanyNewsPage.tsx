import { useEffect, useState } from "react";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { useRecoilState } from "recoil";
import Fade from '@material-ui/core/Fade';
import { UserPageHeader } from "../../components/UserPageHeader";

const FADETIMEOUT = 1000

export function CompanyNewsPage() {
//   const [, setFilter] = useRecoilState(Atoms.newsListFilterState);
//   const [checked, setChecked] = useState(true);

//   // We change the state of the atom when Home page is loaded
//   useEffect(() => {
//     const currentNewsState = {
//       target: "headlines",
//     }
//     setFilter(currentNewsState);
//   }, []);

  return (
    <div>
        <UserPageHeader username={"xyz"}/>
    </div>
  );
}
