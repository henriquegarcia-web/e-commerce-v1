'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useStore } from '@/contexts/StoreProvider'
import { formatByCurrency } from '@/utils/functions/formatCurrency'

import { ICartContextData } from '@/@types/contexts'
import { ICartProduct, IFilterSize, IProduct, IVariation } from '@/@types/store'

export const CartContext = createContext<ICartContextData>(
  {} as ICartContextData
)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleFormatPrice } = useStore()

  // ========================================================================

  const [cartItemsData, setCartItemsData] = useState([])

  // ========================================================================

  const handleGetCartItems = () => {
    let cartItems = []
    const storedCart = localStorage.getItem('cartItems')
    if (storedCart) {
      cartItems = JSON.parse(storedCart)
    }
    setCartItemsData(cartItems)
  }

  const handleAddProductToCart = (
    activeProduct: IProduct | null,
    filterSelectedColor: IVariation | null,
    filterSelectedSize: IFilterSize | null
  ) => {
    if (!activeProduct || !filterSelectedColor || !filterSelectedSize) {
      console.error(
        'Por favor, selecione uma cor e um tamanho antes de adicionar ao carrinho.'
      )
      return
    }

    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]')

    const existingIndex = storedCart.findIndex(
      (item: ICartProduct) =>
        item.productId === activeProduct.id &&
        item.color.variationId === filterSelectedColor.variationId &&
        item.size.variationId === filterSelectedSize.variationId
    )

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity++
      console.log('Item já existe no carrinho. Quantidade aumentada em 1.')
    } else {
      const formattedPrice = handleFormatPrice(activeProduct.price)

      const newItem = {
        productId: activeProduct.id,
        name: activeProduct.name,
        image: activeProduct.images[0].url,
        price: formattedPrice.mainPrice,
        color: filterSelectedColor,
        size: filterSelectedSize,
        quantity: 1
      }
      storedCart.push(newItem)
    }

    localStorage.setItem('cartItems', JSON.stringify(storedCart))

    handleGetCartItems()
  }

  const handleDeleteCartItem = (
    productId: string,
    color: string,
    size: string
  ) => {
    const itemIndex = cartItemsData.findIndex(
      (item: ICartProduct) =>
        item.productId === productId &&
        item.color.variationId === color &&
        item.size.variationId === size
    )

    if (itemIndex !== -1) {
      cartItemsData.splice(itemIndex, 1)
      localStorage.setItem('cartItems', JSON.stringify(cartItemsData))

      handleGetCartItems()
    } else {
      console.error(
        `Item não encontrado no carrinho: ${productId}, ${color}, ${size}`
      )
    }
  }

  // ========================================================================

  useEffect(() => {
    handleGetCartItems()
  }, [])

  const cartTotalPrice = useMemo(() => {
    const total = cartItemsData.reduce((acc, product: any) => {
      return acc + formatByCurrency(product.price) * product.quantity
    }, 0)

    return total.toFixed(2)
  }, [cartItemsData])

  // ========================================================================

  const CartContextData: ICartContextData = useMemo(() => {
    return {
      cartItemsData,
      handleAddProductToCart,
      handleGetCartItems,
      handleDeleteCartItem,
      cartTotalPrice
    }
  }, [
    cartItemsData,
    handleAddProductToCart,
    handleGetCartItems,
    handleDeleteCartItem,
    cartTotalPrice
  ])

  return (
    <CartContext.Provider value={CartContextData}>
      {children}
    </CartContext.Provider>
  )
}

function useCart(): ICartContextData {
  const context = useContext(CartContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { CartProvider, useCart }
