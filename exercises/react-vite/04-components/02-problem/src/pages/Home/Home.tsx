const Home: React.FC = () => {
    const title = "Ordering food has never been easier";
    return (
        <div className="homepage" style={{ margin: "auto" }}>
            <img
                src="node_modules/place-my-order-assets/images/homepage-hero.jpg"
                alt="Restaurant table with glasses."
                width="250"
                height="380"
            />

            <h1>{title}</h1>

            <p>
                We make it easier than ever to order gourmet food from your favorite
                local restaurants.
            </p>

            <p>
                <a className="btn" role="button">
                    Choose a Restaurant
                </a>
            </p>
        </div>
    )
}

export default Home