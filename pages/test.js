import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Result } from "./component/result";

import { Avatar } from 'primereact/avatar';
import { ProductService } from './service/ProductService';


export default function FormikDoc() {

    const [value, setValue] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row justify-content-center p-4 gap-4">
                {product.text.map((p)=>{
                    return( <Avatar label={p.letter} className="mr-2" size="xlarge" style={{ backgroundColor: p.status === 'S' ? "green" : p.status === 'Y' ? "orange" :  "#2196F3", color: "#ffffff" }}/>)
                })}
               
                       
                </div>
               
            </div>
        );
    };
  

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="flex-auto">
                <Avatar label="P" className="mr-2" size="xlarge" />
                <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
      </div>
      <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
        </div>
      <br />
      <br />
      <span className="p-float-label">
                <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="username">Username</label>
            </span>
      <br />
      <br />
     
    </div>
  );
}
