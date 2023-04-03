import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import Result from "../component/result";
import { v4 as uuidv4 } from "uuid";

export default function HookFormDoc() {

  const answer = "test"

  const toast = useRef(null);

  const [results, setResults] = useState([]);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: getValues("value"),
    });
  };

  const defaultValues = {
    value: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    // validate input 
    data.value && show();

    const textvalue = [];

    // Convert String to Array
    const avalue = Array.from(data.value);

    // Conver to Array
    avalue.forEach((v) => {
      console.log(v)
      if(v==='t'){
        //answer
      }

      textvalue.push({        
        id: uuidv4(),
        letter: v,
        status: "N",
      });
    });

    console.log("before");
    console.log(results);

    const update = results;

    update.push({
      id: uuidv4(),
      message: data.value,
      text: textvalue,
    });

    setResults(update);

    console.log("after");
    console.log(results);
    
    /*
    const url = "./api/addFirestore";
    
    const customHeaders = {
      "Content-Type": "application/json",
    };

    fetch(url, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(update),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    */
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div>
      <Result></Result>
      <div className="card flex justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-2"
        >
          <Toast ref={toast} />
          <Controller
            name="value"
            control={control}
            rules={{ required: "Word is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                ></label>
                <span className="p-float-label">
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={classNames({ "p-invalid": fieldState.error })}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <label htmlFor={field.name}>Word</label>
                </span>
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Button label="Submit" type="submit" icon="pi pi-check" />
        </form>
      </div>
    </div>
  );
}
