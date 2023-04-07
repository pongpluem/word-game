import React, { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import WordleResult from "@/component/wordleResult";
import { v4 as uuidv4 } from "uuid";

import { fetchPost } from "@/service/fetchService";

export default function HookFormDoc() {
  const answer = useRef("");

  const toast = useRef(null);
  const gameId = useRef("");

  //"vyM11o8L5tfWck89THkr"
  //const [gameId, setGameId] = useState("vyM11o8L5tfWck89THkr");
  const [game, setGame] = useState({});  

  useEffect(() => {
    if (gameId.current) {
      console.log("current : "+gameId.current)
      const url = "./api/getResult";
      const req = {
        id: gameId.current,
      };

      fetchPost(url, req).then((data) => {
        setGame(data);
        gameId.current = data.id
      });
      
    } else {
      console.log("new Game"+gameId.current)
      const url = "./api/newGame";
      const req = {
        id: gameId.current,
      };

      fetchPost(url, req).then((data) => {
        setGame(data);
        gameId.current = data.id;
        console.log("new current : "+ data.id)
        console.log("new current : "+gameId.current)
      });
    }
  }, []);

  const show = (header, msg) => {
    toast.current.show({
      severity: "success",
      summary: header,
      detail: msg + " " + getValues("value"),
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Submitted",
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
    answer.current = data.value

    console.log(data.value.length)
    console.log(game.length)
    if(data.value.length != game.length){
      showError();
      return
    }

    const url = "./api/addWord";
    const req = {
      id: gameId.current,
      ans: data.value,
      quest: game.quest
    };
    fetchPost(url, req).then((res) => {});

    show("Save","Success!");

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
      <h1>{game.quest}</h1>
      <h1>{game.length}</h1>
      <WordleResult id={gameId.current} ans={answer.current}></WordleResult>
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
