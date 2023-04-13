const Spinner = ({text}) => {
    return (
     <>
      <p  className="text-xl text-sky-500 font-bold uppercase">{text}</p>
      <div className="sk-chase bg-sky-600 mx-auto">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
      </div>
     </>
    )
  }
  
  export default Spinner