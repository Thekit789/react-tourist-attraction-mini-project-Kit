import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "lucide-react";
import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ArticleSection() {
  const [tripTravel, setTripTravel] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const textMax = 100;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${inputValue}`
      );
      setTripTravel(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      <ToastContainer />
      <header className="w-full flex py-10 justify-center">
        <h1 className="text-5xl font-semibold text-cyan-500">เที่ยวไหนดี</h1>
      </header>
      <nav className="flex flex-col items-center">
        <h1 className="w-5/6 flex justify-start text-lg font-medium">
          ค้นหาที่เที่ยว
        </h1>
        <div className="w-full flex justify-center">
          <input
            className="w-5/6 h-12 text-center border-b-2 text-base font-bold focus:outline-none text-[#75716B]"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </nav>
      {/* {loading ? (
        <div>
          <h1>555</h1>
        </div>
      ) : null} */}
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
                <a
                  className="text-2xl font-bold text-gray-800"
                  href={trip.url}
                  target="_blank"
                  rel=""
                >
                  {trip.title}
                </a>
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
                    <button
                      onClick={() => {
                        if (trip.url.length > 0) {
                          navigator.clipboard.writeText(trip.url);

                          toast.success("URL copied successfully !", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                          });
                        } else {
                          toast.error("Failed to copy URL !", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                          });
                        }
                      }}
                    >
                      <Link />
                    </button>
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
