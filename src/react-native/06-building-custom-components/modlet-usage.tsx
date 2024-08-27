import CartButton from "./components/CartButton"
import ImageCarousel from "./components/ImageCarousel"
import ProductDetails from "./components/ProductDetails"

const ProductPage: React.FC = (props) => {
  return (
    <>
      <ImageCarousel />
      <ProductDetails />
      <CartButton />
    </>
  )
}
