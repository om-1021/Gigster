import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  const link = `/gigs?cat=${card.cat}`;
  return (
    <Link to={link}>
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;
// /gigs?cat=designer
