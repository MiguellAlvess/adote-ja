import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";

import dashboardStyles from "./Dashboard.module.css";

import RoundedImage from "../../layout/RoundedImage";

import api from "../../../utils/api";

import { Link } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);

        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
  }
  async function concludAdoption(id) {
    let msgType = "success";

    const data = await api
      .patch(`/pets/conclude/${id}`, {
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
    <section className={dashboardStyles["container"]}>
      <div className={dashboardStyles["petlist-header"]}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pets</Link>
      </div>

      <div className={dashboardStyles["petlist-container"]}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={dashboardStyles["petlist-row"]} key={pet._id}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/pets/${
                  pet.images[0]
                }`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={dashboardStyles["actions"]}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={dashboardStyles["conclude-btn"]}
                        onClick={() => {
                          concludAdoption(pet._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>

                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  );
};
export default MyPets;
