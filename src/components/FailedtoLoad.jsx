import {TfiFaceSad} from "react-icons/tfi"

const FailedtoLoad = ({text}) => {
  return (
    <div className=' p-5 bg-red-500 rounded'>
        <p className='font-bold text-xl uppercase text-white text-center'>{text}</p>
        <TfiFaceSad className="text-white mx-auto h-20 w-20"/>
    </div>
  )
}

export default FailedtoLoad