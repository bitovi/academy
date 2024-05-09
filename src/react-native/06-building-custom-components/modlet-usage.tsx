import ProductDetails from "./components/ProductDetails"
import ImageCarousel from "./components/ImageCarousel"
import CartButton from "./components/CartButton"

const ProductPage = (props) => {
  return (
    <>
      <ImageCarousel />
      <ProductDetails />
      <CartButton />
    </>
  )
}
