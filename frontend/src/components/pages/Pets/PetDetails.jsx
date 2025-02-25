// css
import "./PetDetails.css";

// api
import api from "../../../utils/api";

// hooks
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";

import { useParams, Link } from "react-router-dom";

const PetDetails = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {pet.name && (
        <section className="pet-details-container">
          <div className="pet-details-header">
            <h1>Mais informações sobre {pet.name}:</h1>
            <p>Se tiver interesse, marque uma vista para conhecê-lo!</p>
          </div>
          <div className="pet-images">
            {pet.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_API_URL}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso: </span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade: </span> {pet.age} anos
          </p>

          {token ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta </Link> para
              solicitar uma visita
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default PetDetails;
