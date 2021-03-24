// Temporarily Useless
export const CompanyNewsSelector = (props: any) => {
  const updateCompanyFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentNewsState = {
      target: e.currentTarget.value,
    };
    props.setFilter(currentNewsState);
  };

  return (
    <>
      Filter:
      <select value={props.filter.target} onChange={updateCompanyFilter}>
        <option value="amazon">Amazon</option>
        <option value="apple">Apple</option>
        <option value="facebook">Facebook</option>
        <option value="google">Google</option>
        <option value="microsoft">Microsoft</option>
      </select>
    </>
  );
};
