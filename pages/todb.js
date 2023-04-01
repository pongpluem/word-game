import React, { useState, useEffect } from 'react';
import { ProductService } from './service/ProductService';
import { DataView } from 'primereact/dataview';
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function PaginationDemo() {
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

   
    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row justify-content-center p-4 gap-4">
                {product.text.map((p)=>{
                    return( <Avatar label={p.letter} className="mr-2" size="xlarge" style={{ backgroundColor: p.status === 'S' ? "green" : p.status === 'Y' ? "orange" :  "blue", color: "white" }}/>)
                })}                    
                </div>
               
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
            <br></br>
            <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />

            <Button label="Submit" />

        </div>
    )
}
        