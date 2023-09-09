// import React from "react";
// import "./Reviews.scss";
// import Review from "../review/Review";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const Reviews = ({gigId}) => {
//     const { isLoading, error, data } = useQuery({
//         queryKey: ["reviews"],
//         queryFn: () =>
//           newRequest.get(`/reviews/${gigId}`).then((res) => {
//             return res.data;
//           }),
//       });

//   <div className="reviews">
//     <h2>Reviews</h2>
//     {isLoading ? "Loading" :error ? "Something went wrong!" : data.map((review)=><Review key={review._id} review={review}/>)}
//     <Review />
//   </div>;
// };

// export default Reviews;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const desc = e.target[0].value;
  //   const star = e.target[1].value;
  //   mutation.mutate({ gigId, desc, star });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const communication = parseInt(e.target[1].value);
    const qualityOfWork = parseInt(e.target[2].value);
    const deliveryTime = parseInt(e.target[3].value);

    mutation.mutate({
      gigId,
      desc,
      communication,
      qualityOfWork,
      deliveryTime,
    });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input
            className="formInput"
            type="text"
            placeholder="write your opinion"
          />
          <div className="labels">
            <div className="eachLabel">
              <label for="Communication">Communication : </label>
              <select id="Communication">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="eachLabel">
              <label for="Quality Of Work">Quatity Of Work : </label>
              <select id="Quatity Of Work">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="eachLabel">
              <label for="Time of Delivery">Time of Delivery : </label>
              <select
                name="Time of Delivery"
                id="Time of Delivery"
                value="Time of Delivery"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
