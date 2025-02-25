// css
import styles from "./AddPet.module.css";

// api
import api from "../../../utils/api";

// hooks
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useParams } from "react-router-dom";

// form
import PetForm from "../../form/PetForm";

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
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
    <section>
      <div className={styles["addpet-header"]}>
        <h1>Editando o pet: {pet.name}</h1>
        <p>Depois da edição, os dados serão atualizados.</p>
      </div>

      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
