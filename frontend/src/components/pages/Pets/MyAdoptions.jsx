// css
import dashboardStyles from "./Dashboard.module.css";

// api
import api from "../../../utils/api";

// hooks
import { useState, useEffect } from "react";

import RoundedImage from "../../layout/RoundedImage";

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section className={dashboardStyles['container']}>
      <div className={dashboardStyles["petlist-header"]}>
        <h1>Minhas adoções</h1>
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
              <div className={dashboardStyles['contacts']}>
                <p>
                    <span className="bold">Fale com:</span> {pet.user.name}
                </p>

                <p>
                    <span className="bold">Número de telefone:</span> {pet.user.phone}
                </p>
                
              </div>
              <div className={dashboardStyles["actions"]}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção!</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há adoções de Pets</p>}
      </div>
    </section>
  );
};

export default MyAdoptions;
