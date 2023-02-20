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
    <div className="my-8 text-gray-500">
      <nav className="bg-white flex items-center gap-2 p-3 rounded-md">
        <p className="text-sm">Filter by: </p>
        {filterList.map((f) => {
          return (
            <button
              className={`text-sm py-1 px-2 ${
                f === currentFilter
                  ? "text-gray-900 bg-gray-100 rounded-lg"
                  : ""
              }`}
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
