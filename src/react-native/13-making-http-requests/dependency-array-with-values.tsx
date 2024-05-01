import { useEffect, useState } from 'react';

function NameStorage() {
    const [name, setName] = useState('');

    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    return (
        <label>
            Name
            <input
                onChange={event => setName(event.target.value)}
                type="text"
                value={name}
            />
        </label>
    );
}

export default NameStorage;