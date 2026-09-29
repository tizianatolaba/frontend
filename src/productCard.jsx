function ProductCard({ producto }) {
    return (
        <article className="product-card">
            <h2>{producto.nombre}</h2>

            <p>
                Precio final: ${producto.precio_final}
            </p>

            <p>
                {producto.cuotas_cantidad} cuotas de $
                {producto.cuotas_valor}
            </p>

            <p>
                Garantía: {producto.garantia_meses} meses
            </p>
        </article>
    );
}

export default ProductCard;