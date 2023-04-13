const Alert = ({children, error = true}) => {
    return (
      <div className={`${error ? 'bg-red-600' : 'bg-green-500' } text-center my-2 rounded-md  text-white font-bold p-3 uppercase`}>
          {children} 
      </div>
    )
  }
  
  export default Alert