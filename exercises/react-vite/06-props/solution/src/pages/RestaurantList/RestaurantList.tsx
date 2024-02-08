import FormSelect from "@shared/components/FormSelect";

const RestaurantList: React.FC = () => {
    const restaurants = {
        data: [
            {
                name: 'Poutine Palace',
                slug: 'poutine-palace',
                images: {
                    thumbnail: 'node_modules/place-my-order-assets/images/4-thumbnail.jpg',
                    owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
                    banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
                },
                menu: {
                    lunch: [
                        {
                            name: 'Crab Pancakes with Sorrel Syrup',
                            price: 35.99,
                        },
                        {
                            name: 'Steamed Mussels',
                            price: 21.99,
                        },
                        {
                            name: 'Spinach Fennel Watercress Ravioli',
                            price: 35.99,
                        },
                    ],
                    dinner: [
                        {
                            name: 'Gunthorp Chicken',
                            price: 21.99,
                        },
                        {
                            name: 'Herring in Lavender Dill Reduction',
                            price: 45.99,
                        },
                        {
                            name: 'Chicken with Tomato Carrot Chutney Sauce',
                            price: 45.99,
                        },
                    ],
                },
                address: {
                    street: '230 W Kinzie Street',
                    city: 'Green Bay',
                    state: 'WI',
                    zip: '53205',
                },
                _id: '3ZOZyTY1LH26LnVw',
            },
            {
                name: 'Cheese Curd City',
                slug: 'cheese-curd-city',
                images: {
                    thumbnail: 'node_modules/place-my-order-assets/images/2-thumbnail.jpg',
                    owner: 'node_modules/place-my-order-assets/images/3-owner.jpg',
                    banner: 'node_modules/place-my-order-assets/images/2-banner.jpg',
                },
                menu: {
                    lunch: [
                        {
                            name: 'Ricotta Gnocchi',
                            price: 15.99,
                        },
                        {
                            name: 'Gunthorp Chicken',
                            price: 21.99,
                        },
                        {
                            name: 'Garlic Fries',
                            price: 15.99,
                        },
                    ],
                    dinner: [
                        {
                            name: 'Herring in Lavender Dill Reduction',
                            price: 45.99,
                        },
                        {
                            name: 'Truffle Noodles',
                            price: 14.99,
                        },
                        {
                            name: 'Charred Octopus',
                            price: 25.99,
                        },
                    ],
                },
                address: {
                    street: '2451 W Washburne Ave',
                    city: 'Green Bay',
                    state: 'WI',
                    zip: '53295',
                },
                _id: 'Ar0qBJHxM3ecOhcr',
            },
        ]
    };

    return (
        <>
            <div className="restaurants">
                <h2 className="page-header">Restaurants</h2>
                <form className="form">
                    <FormSelect />
                </form>
                {restaurants.data ? (
                    restaurants.data.map(({ _id, slug, name, address, images }) => (
                        <div key={_id} className="restaurant">
                            <img src={images.thumbnail} alt="" width="100" height="100" />
                            <h3>{name}</h3>

                            {address && (
                                <div className="address">
                                    {address.street}
                                    <br />
                                    {address.city}, {address.state} {address.zip}
                                </div>
                            )}

                            <div className="hours-price">
                                $$$
                                <br />
                                Hours: M-F 10am-11pm
                                <span className="open-now">Open Now</span>
                            </div>

                            <a className="btn" href={`/restaurants/${slug}`}>
                                Details
                            </a>
                            <br />
                        </div>
                    ))
                ) : (
                    <p>No restaurants.</p>
                )}
            </div>
        </>
    )
}

export default RestaurantList