
const HoverBox = ({ text }) => {
    return (
      <div className="absolute bg-red-400 font-bold text-sm text-white px-2 w-20 rounded shadow-md opacity-0 group-hover:opacity-100">
        {text}
      </div>
    );
  };

export default HoverBox;   