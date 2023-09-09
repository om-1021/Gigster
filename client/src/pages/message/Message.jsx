import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import { BarLoader } from "react-spinners";


const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [username, setUsername] = useState();

  const sellerId = id.substring(0, 24);
  const buyerId = id.substring(24, 48);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const { isLoading: sellerDataLoading, data: sellerData } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      Promise.all(
        data.map((c) =>
          newRequest
            .get(
              `conversations/getName/${
                currentUser.isSeller ? buyerId : sellerId
              }`
            )
            .then((res) => setUsername(res.data))
        )
      ),
    enabled: !!data,
  });

  return (
    <div className="message">
      <div className="container">
        <div className="top">
          <div className="breadcrumbs">
            <Link
              style={{ textDecoration: "none", color: "aqua" }}
              to="/messages"
            >
              Messages
            </Link>
          </div>
          <h1> {sellerDataLoading ? <div className="loader">
              <BarLoader
                color="#ff4533"
                loading={isLoading}
                width={150}
                height={10}
              />
            </div> : username}</h1>
        </div>

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
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
