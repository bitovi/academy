interface ListItemProps {
    address?: {
        city: string;
        state: string;
        street: string;
        zip: string;
    };
    name: string;
    slug: string;
    thumbnail: string;
}

const ListItem: React.FC<ListItemProps> = ({ address, name, slug, thumbnail }) => {
    return (
        <>
            <div className="restaurant">
                <img src={thumbnail} alt="" width="100" height="100" />
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
        </>
    )
}

export default ListItem