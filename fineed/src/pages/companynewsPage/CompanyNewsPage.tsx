import { useEffect } from "react";
import * as Atoms from "../../atoms/NewsListFilterAtom";
import { useRecoilState } from "recoil";
import { NewsCardContainer } from "../homePage/homePageContainer/NewsCardContainer";
import Button from "@material-ui/core/Button";
import { UserPageHeader } from "../../components/UserPageHeader";

export function CompanyNewsPage() {
  const [, setFilter] = useRecoilState(Atoms.newsListFilterState);

  // We change the state of the atom when Home page is loaded
  useEffect(() => {
    const currentNewsState = {
      target: "google",
    };
    setFilter(currentNewsState);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserPageHeader username={"xyz"} />
      <div>
        {/* <CompanyNewsSelector filter={filter} setFilter={setFilter} /> */}
        <Button variant="contained" color="primary" onClick={() => setFilter({target: "amazon"})}>
          Amazon
        </Button>
        <Button variant="contained" color="primary" onClick={() => setFilter({target: "facebook"})}>
          Facebook
        </Button>
        <Button variant="contained" color="primary" onClick={() => setFilter({target: "google"})}>
          Google
        </Button>
        <Button variant="contained" color="primary" onClick={() => setFilter({target: "apple"})}>
          Apple
        </Button>
        <Button variant="contained" color="primary" onClick={() => setFilter({target: "microsoft"})}>
          Microsoft
        </Button>
      </div>
      <NewsCardContainer />
    </div>
  );
}
