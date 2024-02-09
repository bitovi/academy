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

const ListItem: React.FC<ListItemProps> = () => {
    return (
        <>
        </>
    )
}

export default ListItem