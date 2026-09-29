import { useEffect, useState } from "react";
import { getProductos } from "../services/api";

function App() {
    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useState([])

    useEffect(() => {
        getProductos()
            .then(setProductos)
            .catch((error) => console.error(error))
    }, [])

    function agregarAlCarrito(producto) {
        setCarrito((actual) => [...actual, producto])
    }

    return (
        <main>
            <h1>Tienda de stickers</h1>

            <p>Productos en el carrito: {carrito.length}</p>

            <section className="productos">
                {productos.map((producto) => (
                    <article key={producto.id} className="product-card">
                        <img
                            src={producto.image_url}
                            alt={producto.name}
                            width="200"
                        />

                        <h2>{producto.name}</h2>
                        <p>{producto.description}</p>
                        <strong>
                            ${Number(producto.price).toFixed(2)}
                        </strong>

                        <button onClick={() => agregarAlCarrito(producto)}>
                            Agregar al carrito
                        </button>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default App