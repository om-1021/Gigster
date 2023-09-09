import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  // const currentUserString = localStorage.getItem("currentUser");
  // const currentUser = JSON.parse(currentUserString);
  // console.log(currentUser.accessToken);
  // const token = currentUser.accessToken;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // Pass the accessToken in the Authorization header
          //   },
          // }
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  // Assuming you have stored the JSON string in local storage

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Gigster Graphics & Design </span>
        <h1>AI Artists </h1>

        <p>
          Explore the boundaries of art and technology with Gigster's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <BarLoader
                color="#ff4533"
                loading={isLoading}
                width={150}
                height={10}
              />
            </div>
          ) : error ? (
            "Something went wrong!"
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
