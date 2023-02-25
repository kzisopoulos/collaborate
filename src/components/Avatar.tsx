interface IProps {
  src: string;
}

const Avatar = ({ src }: IProps) => {
  const [firstName, lastName] = src.split(" ");

  return (
    <div className=" w-10 h-10 rounded-full overflow-hidden border-2 grid place-items-center">
      {`${firstName[0]}${lastName[0]}`}
    </div>
  );
};

export default Avatar;
