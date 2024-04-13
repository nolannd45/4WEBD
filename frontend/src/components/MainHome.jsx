import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const MainHome = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:3002/event/read`);
      const result = await res.json();
      
      setData(result);
    };
    getData();

  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-white my-4 text-start">
        Selectionner l'hôtel de vos rêves!{" "}
      </h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {data &&
          data.map((item) => {
            return (
              <Link
                id="hotel"
                key={item?._id}
                className="bg-purple-600 rounded-md hover:scale-105 duration-200"
                to={`/hotels/${item?._id}`}
              >
                <Card hotelName={item?.name} img={item?.picture_list[0]} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default MainHome;
