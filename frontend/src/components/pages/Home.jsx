// css
import "./Home.css";

// api
import api from "../../utils/api";

// hooks
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <div className="pet-home-header">
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um deles</p>
      </div>
      <div className="pet-container">
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className="pet-card" key={pet._id}>
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_API_URL
                  }/images/pets/${pet.images[0]})`,
                }}
                className="pet-card-image"
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso: {pet.weight}kg</span>
              </p>

              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className="adopted-text">Adotado</p>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets disponíeis para adoção no momento!</p>
        )}
      </div>
    </section>
  );
};

export default Home;
