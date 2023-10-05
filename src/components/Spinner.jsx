const Spinner = ({text}) => {
    return (
     <>
      <p  className="text-xl text-sky-500 font-bold uppercase text-center mb-3">{text}</p>
      <div className="sk-chase h-60 w-60 mx-auto">
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