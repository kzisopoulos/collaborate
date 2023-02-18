interface IProps {
  src: string | null;
}

const Avatar = ({ src }: IProps) => {
  return (
    <>
      {src && (
        <div className="inline-block w-10 h-10 rounded-full overflow-hidden border-2">
          <img src={src} alt="user avatar" className="h-full w-full" />
        </div>
      )}
    </>
  );
};

export default Avatar;
