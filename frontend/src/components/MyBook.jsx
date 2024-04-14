import React, { useEffect, useState } from "react";
import { API } from "../utils/API";
import CardBook from "./CardBook";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MyBook = () => {
  var [data, setData] = useState([]);
  
  var [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  async function load() {
    await log();
  }
  console.log(data)

  useEffect(() => {
    const getData = async () => {
      await load();
      setData(hotels);
    };
    getData();
  }, []);

  async function log() {
    let result = await API.fetchTickets();
    console.log(result)

    for (var tickets in result) {
      var hotel = await API.fetchById(result[tickets].idEvent);
      hotel["dateStart"] = dayjs(result[tickets].dateStart).format(
        "MM/DD/YYYY"
      );
      hotel["dateEnd"] = dayjs(result[tickets].dateEnd).format("MM/DD/YYYY");
      hotel["ticketId"] = result[tickets]._id;
      hotels.push(hotel);
      
      setHotels(hotels);
      
    }
  }

  async function deleteTicket(ticketId, id) {
    await API.deleteTicket(ticketId);
    await API.remCount(id);
    navigate(0);
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-white my-4 text-start">
        {" "}
        Vos réservations
      </h1>
      <div className="flex flex-wrap gap-4 justify-between">
        {data &&
          data?.map((item) => {
            return (
              <div>
                <Link
                  key={item?._id}
                  className="bg-purple-600 rounded-md hover:scale-105 duration-200"
                  to={`/hotels/${item?._id}`}
                >
                  <CardBook
                    hotelName={item?.name}
                    img={item?.picture_list[0]}
                    dateStart={item?.dateStart}
                    dateEnd={item?.dateEnd}
                  />
                </Link>
                <button
                  className="bg-black text-white font-semibold rounded-full p-3 cursor-pointer "
                  onClick={() => deleteTicket(item?.ticketId, item?._id)}
                >
                  Supprimer
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyBook;
