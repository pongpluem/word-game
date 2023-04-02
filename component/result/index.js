import React, { useState, useEffect } from 'react';
import { ProductService } from '../../service/ProductService';
import { DataView } from 'primereact/dataview';
import { Avatar } from "primereact/avatar";

function Result() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

   
    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row justify-content-center p-4 gap-4">
                {product.text.map((p)=>{
                    return( <Avatar key={p.id} label={p.letter} className="mr-2" size="xlarge" style={{ backgroundColor: p.status === 'S' ? "green" : p.status === 'Y' ? "orange" :  "#2196F3", color: "#ffffff" }}/>)
                })}
               
                       
                </div>
               
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
        </div>
    )
}

export default Result