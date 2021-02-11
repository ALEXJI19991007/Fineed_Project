import React from "react";
import { useRecoilState } from "recoil";
import * as Atoms from "../news atoms & selectors/atoms";

export const NewsListFilter = () => {
  const [filter, setFilter] = useRecoilState(Atoms.newsListFilterState);

  const updateSourceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentNewsState = {
      source: e.currentTarget.value,
      company: filter.company,
    };
    setFilter(currentNewsState);
  };

  const updateCompanyFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentNewsState = {
      source: filter.source,
      company: e.currentTarget.value,
    };
    setFilter(currentNewsState);
  };

  return (
    <>
      Filter:
      <select value={filter.source} onChange={updateSourceFilter}>
        <option value="bing">Bing</option>
        <option value="google">Google</option>
        <option value="yahoo">Yahoo</option>
      </select>
      <select value={filter.company} onChange={updateCompanyFilter}>
        <option value="headlines">Headlines</option>
        <option value="tesla">Tesla</option>
        <option value="google">Google</option>
        <option value="facebook">Facebook</option>
        <option value="amazon">Amazon</option>
        <option value="linkedin">Linkedin</option>
      </select>
    </>
  );
};