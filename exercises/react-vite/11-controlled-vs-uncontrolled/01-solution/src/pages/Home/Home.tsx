import HeroImage from "place-my-order-assets/images/homepage-hero.jpg"
import { Link } from "react-router-dom"
import styles from "./Home.module.css"

const Home: React.FC = () => {
    return (
        <div className="homepage" style={{ margin: "auto" }}>
            <img
                alt="Restaurant table with glasses."
                height="380"
                src={HeroImage}
                width="250"
            />

            <h1>Ordering food has never been easier</h1>

            <p>
                We make it easier than ever to order gourmet food from your favorite
                local restaurants.
            </p>

            <p>
                <Link className={styles.chooseButton} to="/restaurants">
                    Choose a Restaurant
                </Link>
            </p>
        </div>
    )
}

export default Home