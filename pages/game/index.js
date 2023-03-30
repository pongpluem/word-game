import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Result } from "../component/result";

export default function FormikDoc() {
  const toast = useRef(null);

  const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);


  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: formik.values.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.value) {
        errors.value = "Name - Surname is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

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
      <br />
      <br />
      <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
        </div>
      <br />
      <br />
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <span className="p-float-label">
          <Toast ref={toast} />
          <InputText
            id="value"
            name="value"
            value={formik.values.value}
            onChange={(e) => {
              formik.setFieldValue("value", e.target.value);
            }}
            className={classNames({ "p-invalid": isFormFieldInvalid("value") })}
          />
          <label htmlFor="input_value">Name - Surname</label>
        </span>
        {getFormErrorMessage("value")}
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}
