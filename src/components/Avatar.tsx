import "./Avatar.css";

interface IProps {
  src: string | null;
}

const Avatar = ({ src }: IProps) => {
  return (
    <>
      {src && (
        <div className="avatar">
          <img src={src} alt="user avatar" />
        </div>
      )}
    </>
  );
};

export default Avatar;
