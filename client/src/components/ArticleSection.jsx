import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "./Navbar";
import { Link } from "lucide-react";

export function ArticleSection() {
  const [tripTravel, setTripTravel] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const textMax = 100;
  const fetchTrip = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${inputValue}`
      );
      setTripTravel(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  useEffect(() => {
    if (inputValue) {
      fetchTrip();
    }
  }, [inputValue]);

  return (
    <>
      <NavBar inputSearch={inputValue} setInputSearch={setInputValue} />
      <article>
        {tripTravel.map((trip, index) => (
          <div className="flex justify-between w-full h-64 mt-8" key={index}>
            <img
              className="w-1/3 h-64 rounded-3xl bg-slate-200"
              src={trip.photos[0]}
              alt=""
            />
            <div className="w-2/3 h-full">
              <div className="w-full h-1/2 px-8 pt-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  {trip.title}
                </h1>
                <p className="pt-1 font-normal text-gray-600">
                  {trip.description.length > textMax
                    ? `${trip.description.slice(0, textMax)}...`
                    : trip.description}
                </p>
                <a
                  className="pt-1 font-normal underline underline-offset-1 text-blue-500"
                  href={trip.url}
                  target="_blank"
                  rel=""
                >
                  อ่านต่อ
                </a>
                <h2 className="pt-1 font-normal text-gray-600">
                  หมวด
                  {trip.tags.map((tag, index) => (
                    <u key={index} className="ml-2">
                      {tag}
                    </u>
                  ))}
                </h2>
              </div>
              <div className="flex justify-between items-center px-8 w-full h-1/2">
                <div className="flex justify-center items-center">
                  {trip.photos.slice(1).map((photo, index) => (
                    <img
                      key={index}
                      className="w-28 h-28 mx-3 rounded-3xl"
                      src={photo}
                      alt=""
                    />
                  ))}
                </div>
                <div className="pr-20 pt-24">
                  <div className="size-9 flex justify-center items-center text-sky-400 border-sky-400 border-2 border-solid rounded-full">
                    <Link />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </article>
    </>
  );
}
