
import { useState, type FormEvent } from 'react'
import ShoppingItem from './ShoppingItem'
import './App.css'

type Product = {
  id: number
  name: string
  price: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Молоко', price: 90 },
    { id: 2, name: 'Шоколад', price: 150 },
    { id: 3, name: 'Клубника', price: 220 },
  ])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const total = products.reduce(
    (sum, product) => sum + product.price,
    0,
  )

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const numericPrice = Number(price)

    if (
      !trimmedName ||
      price.trim() === '' ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      name: trimmedName,
      price: numericPrice,
    }

    setProducts((current) => [...current, newProduct])
    setName('')
    setPrice('')
  }

  function deleteProduct(id: number) {
    setProducts((current) =>
      current.filter((product) => product.id !== id),
    )
  }

  return (
    <main className="page">
      <section className="shopping-card">
        <header className="header">
          <div className="logo">m.</div>
          <span className="header-label">MY LITTLE SHOPPING LIST</span>
          <span className="header-heart">♡</span>
        </header>

        <section className="intro">
          <span className="eyebrow">МАЛЕНЬКИЕ РАДОСТИ</span>

          <h1>
            Мой список
            <br />
            <em>покупок.</em>
          </h1>

          <p>
            Собирай нужное, планируй расходы
            <br />
            и не забывай важное.
          </p>
        </section>

        <form className="add-form" onSubmit={addProduct}>
          <label>
            Название товара
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Например, яблоки"
              required
            />
          </label>

          <label>
            Цена в сомах
            <input
              type="number"
              min="0"
              step="any"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="150"
              required
            />
          </label>

          <button type="submit" className="add-button">
            + Добавить
          </button>
        </form>

        <section className="list-section">
          <div className="list-heading">
            <div>
              <span className="eyebrow">ТВОЙ ЧЕК-ЛИСТ</span>
              <h2>Что покупаем?</h2>
            </div>

            <span className="count">
              {products.length} шт.
            </span>
          </div>

          <div className="product-list">
            {products.length > 0 ? (
              products.map((product) => (
                <ShoppingItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  onDelete={deleteProduct}
                />
              ))
            ) : (
              <div className="empty-state">
                <span>♡</span>
                <h3>Список пока пуст</h3>
                <p>Добавь первую покупку — и начнём!</p>
              </div>
            )}
          </div>
        </section>

        <footer className="total-section">
          <div>
            <span>ОБЩАЯ СТОИМОСТЬ</span>
            <p>{products.length} товаров в списке</p>
          </div>

          <strong>{total.toLocaleString('ru-RU')} сом</strong>
        </footer>

        <div className="bottom-note">
          Сделано с любовью ♡
        </div>
      </section>
    </main>
  )
}

export default App
