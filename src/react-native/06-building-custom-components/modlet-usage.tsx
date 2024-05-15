import CartButton from "./components/CartButton"
import ImageCarousel from "./components/ImageCarousel"
import ProductDetails from "./components/ProductDetails"

const ProductPage = (props) => {
  return (
    <>
      <ImageCarousel />
      <ProductDetails />
      <CartButton />
    </>
  )
}
