import { useState, useEffect } from "react";
import axios from "axios";

export function ArticleSection() {
  const [tripTravel, setTripTravel] = useState([]);
  const textMax = 100;

  const fetchTrip = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/trips?keywords=`);
      setTripTravel(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <article>
      {tripTravel.map((trip, index) => (
        <div
          className="flex justify-between w-full h-64 mt-8 bg-slate-500"
          key={index}
        >
          <img
            className="w-1/3 h-64 rounded-3xl bg-slate-200"
            src={trip.photos[0]}
            alt=""
          />
          <div className="w-2/3 h-full bg-slate-200">
            <div className="w-full h-1/2 px-8 bg-red-400">
              <h1 className="text-2xl font-bold">{trip.title}</h1>
              <p className="">
                {trip.description.length > textMax
                  ? `${trip.description.slice(0, textMax)}...`
                  : trip.description}
              </p>
              <button className="text-cyan-700">อ่านต่อ</button>
              <h2>หมวด {trip.tags.join(", ")}</h2>
            </div>
            <div className="flex justify-between items-center px-8 w-full h-1/2 bg-lime-400">
              <div className="flex justify-center items-center">
                {trip.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    className="w-28 h-28 mx-3 rounded-3xl bg-gray-300"
                    src={photo}
                    alt=""
                  />
                ))}{" "}
              </div>{" "}
              <div>Logo</div>{" "}
            </div>{" "}
          </div>
        </div>
      ))}
    </article>
  );
}
