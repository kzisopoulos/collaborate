interface IProps {
  currentFilter: string;
  changeFilter: (newFilter: string) => void;
}
const filterList = [
  "all",
  "mine",
  "development",
  "infrastructure",
  "network",
  "completed",
];

const ProjectFilter = ({ currentFilter, changeFilter }: IProps) => {
  const handleClick = (newFilter: string) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => {
          return (
            <button
              className={f === currentFilter ? "active" : ""}
              key={f}
              onClick={() => handleClick(f)}>
              {f}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectFilter;
