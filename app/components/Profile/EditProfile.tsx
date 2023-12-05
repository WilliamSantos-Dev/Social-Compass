"use client";
import { useState } from "react";
import { EditUser, User } from "../../util/models";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./EditProfile.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../util/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Contexts/AuthContext";

interface Props {
  user: User;
  onClose: () => void;
}

export default function EditProfile(props: Props) {
  const router = useRouter();
  const auth = useAuth()
  const [formData, setFormData] = useState<EditUser>({
    name: props.user.name,
    occupation: props.user.occupation,
    sex: props.user.sex,
    birthdate: new Date(props.user.birthdate).toISOString().split("T")[0],
    address: props.user.address,
    phone: props.user.phone,
    image: props.user.image,
  });

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleCancel = () => {
    props.onClose();
  };

  async function handleSubmit() {    
    const token = auth.token
    const res = await api.updateUser(formData, props.user.id, token!);
    router.refresh()

    props.onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        key="editProfile"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className={styles.container}
      >
        <h1>Editar Perfil</h1>
        <div className={styles.inputs}>
          <Input
            type="text"
            placeholder="Nome"
            onChange={(value) => handleChange("name", value.target.value)}
            value={formData.name}
            isValid={true}
            icon="user"
          />
          <Input
            type="text"
            placeholder="Cargo/Profissão"
            onChange={(value) => handleChange("occupation", value.target.value)}
            value={formData.occupation}
            isValid={true}
            icon="office"
          />
          <Input
            type="text"
            placeholder="Sexo"
            onChange={(value) => handleChange("sex", value.target.value)}
            value={formData.sex}
            isValid={true}
            icon="dna"
          />
          <Input
            type="date"
            placeholder="Data de Nascimento"
            onChange={(value) => handleChange("birthdate", value.target.value)}
            value={formData.birthdate}
            isValid={true}
            icon="date"
          />
          <Input
            type="text"
            placeholder="Endereço"
            onChange={(value) => handleChange("address", value.target.value)}
            value={formData.address}
            isValid={true}
            icon="maps"
          />
          <Input
            type="text"
            placeholder="Telefone"
            onChange={(value) => handleChange("phone", value.target.value)}
            value={formData.phone}
            isValid={true}
            icon="phone"
          />
          <Input
            type="text"
            placeholder="Imagem de Perfil (URL ou base64)"
            onChange={(value) => handleChange("image", value.target.value)}
            value={formData.image}
            isValid={true}
            icon="user"
          />
        </div>
        <div onClick={handleCancel}>
          <Button type="button" text="Cancelar" colorGray />
        </div>
        <div onClick={handleSubmit}>
          <Button type="submit" text="Salvar" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
