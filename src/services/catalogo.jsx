import { useEffect, useState } from "react";
import { getProductos } from "../services/api";
import ProductCard from "./ProductCard";

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getProductos()
            .then((datos) => {
                setProductos(datos);
            })
            .catch(() => {
                setError(
                    "No pudimos cargar los productos. Revisá que el backend esté funcionando."
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Cargando productos...</p>;
    }

    if (error !== null) {
        return <p>{error}</p>;
    }

    if (productos.length === 0) {
        return <p>No hay productos disponibles.</p>;
    }

    return (
        <main>
            <h1>Catálogo</h1>

            <section className="catalogo">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </section>
        </main>
    );
}

export default Catalogo;