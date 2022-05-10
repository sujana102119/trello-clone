import React from 'react';
import { useEffect, useState } from 'react';

function Interview () {
    const [data, setData] = useState([]);

    useEffect( function() {
        const data = new Promise((resolve, reject) => {
            console.log('here');
            resolve(fetch('https://fakestoreapi.com/products'))
        }).then(response => response.json()).then(result => { setData(result)});
    }, []);
    return (
        data.map(datum => 
            {
                const {id, title, description, category, image, rating: {rate, count}} = datum;
                return (
                    <div key={id}>
                        <h1>{title}</h1>
                        <h2>{description}</h2>
                        <h3>{category}</h3>
                        <img src={image} />
                        <span><h4>Rating</h4><h5>{rate}</h5><h5>count</h5></span>
                    </div>
                )
            }
           
        )
    )
}

export default Interview;