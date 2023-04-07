import React, { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { Avatar } from "primereact/avatar";

import { fetchPost } from "@/service/fetchService";

function WordleResult(props) {
  const [game, setGame] = useState({});
  const [answer, setAnswer] = useState([]);
  console.log("WordleResult")
  console.log("props id : "+props.id)
  console.log("props ans : "+props.ans)

  useEffect(() => {
    //ProductService.getProducts().then((data) => setProducts(data));
    console.log("WordleResult UseEffect")
    const url = "./api/getResult";
    const req = {
      id: props.id,
    };

    fetchPost(url, req).then((data) => {
      setGame(data);
      if (data.answer) {
        setAnswer(
          data.answer.sort((a, b) => {
            if (a.createDate < b.createDate) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      }
    });
  }, [props]);
  //});

  const itemTemplate = (answer) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row justify-content-center p-4 gap-4">
          {answer.digit.map((p) => {
            return (
              <Avatar
                key={p.id}
                label={p.letter}
                className="mr-2"
                size="xlarge"
                style={{
                  backgroundColor:
                    p.status === "S"
                      ? "green"
                      : p.status === "Y"
                      ? "orange"
                      : "#2196F3",
                  color: "#ffffff",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataView value={answer} itemTemplate={itemTemplate} paginator rows={5} />
    </div>
  );
}

export default WordleResult;
