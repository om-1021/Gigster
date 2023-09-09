import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <p>{review.desc}</p>
      <div className="stars">
        <div className="rating-category">
          <span>Communication: </span>
          {Array(review.communication)
            .fill()
            .map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            ))}
        </div>
        <div className="rating-category">
          <span>Quality of Work: </span>
          {Array(review.qualityOfWork)
            .fill()
            .map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            ))}
        </div>
        <div className="rating-category">
          <span>Delivery Time: </span>
          {Array(review.deliveryTime)
            .fill()
            .map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
