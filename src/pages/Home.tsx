import Charmander from "../../public/charmander.jpg";
function Home() {
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-chakra font-bold text-xl sm:text-4xl text-white mb-2 sm:mb-4">Tu tienda de Pokemones favorita.</h1>
        <p className="font-medium text-md sm:text-xl text-white mb-2 sm:mb-4">Apúrate, antes de que se agoten!</p>
        <button className="font-chakra font-bold text-primary bg-white py-2 px-4 text-xl rounded-lg">Comprar</button>
        <img src={Charmander} alt="Charmander Pic" className="w-[400px] "/>
    </div>
  )
}

export default Home