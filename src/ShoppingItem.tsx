
type ShoppingItemProps = {
  id: number
  name: string
  price: number
  onDelete: (id: number) => void
}

function ShoppingItem({
  id,
  name,
  price,
  onDelete,
}: ShoppingItemProps) {
  return (
    <article className="shopping-item">
      <div className="item-icon">♡</div>

      <div className="item-details">
        <h3>{name}</h3>
        <p>Твоя маленькая покупка</p>
      </div>

      <div className="item-actions">
        <strong>{price.toLocaleString('ru-RU')} сом</strong>

        <button
          className="delete-button"
          onClick={() => onDelete(id)}
          aria-label={`Удалить ${name}`}
          title="Удалить товар"
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default ShoppingItem
