import { diffForHumans } from "../helpers"

const Comentario = ({comentario}) => {



  return (
    <div className="p-5 border-gray-400 border-b">
            <a href={`/${comentario.usernameComentario}`} className="font-bold text-gray-500">{comentario.usernameComentario}</a>
            <p className="text-gray-600 font-bold">{comentario.comentario}</p>
            <p className="text-sm text-gray-400">{diffForHumans(comentario.created_at)}</p>
    </div>
  )
}

export default Comentario