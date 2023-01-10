import { useContext } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../Input";
import InputSpecial from "../InputSpecial";
import Button from "../Button";

import { iModalForm, iModalProps } from "./types";
import { iHabitData } from "../../contexts/HabitsContext/types";
import { HabitsContext } from "../../contexts/HabitsContext/HabitsContext";
import { UserContext } from "../../contexts/UserContext/UserContext";

import { formModalSchema } from "./formModalSchema";

import { Modal, ModalHeader, ModalForm, ModalFooter } from "./styles";
import { ModalWrapper } from "../../styles/modal";

const ModalCreateHabit = ({ handleModal }: iModalProps) => {
  const { habitCreate } = useContext(HabitsContext);
  const { user } = useContext(UserContext);

  const { handleSubmit, register, formState: { errors } } = useForm<iModalForm>({
    mode: "onChange",
    resolver: yupResolver(formModalSchema)
  })

  const dificulties = ["fácil", "médio", "difícil"];
  const constancies = ["7 dias seguidos", "14 dias seguidos", "21 dias seguidos"];

  const submit: SubmitHandler<iModalForm> = async (data) => {
    if (user) {
      const body: iHabitData = {
        ...data,
        userId: +user.id
      }

      await habitCreate(body) && handleModal();
    }
  }

  return (
    <ModalWrapper>
      <Modal>
        <ModalHeader>
          <h4>Criar hábito</h4>
        </ModalHeader>

        <ModalForm onSubmit={handleSubmit(submit)}>
          <div className="side-left">
            <Input
              label="Título"
              name="title"
              type="text"
              placeholder="Insira o título para o hábito"
              register={register("title")}
            />
            <p className="FormError">
              <>{errors.title?.message}</>
            </p>
            <InputSpecial
              label="Descrição (opcional)"
              name="description"
              type="textarea"
              placeholder="Insira uma descrição"
              register={register("description")}
            />
            <Input
              label="Recompensa"
              name="personal_reward"
              type="text"
              placeholder="Qual a recompensa deste hábito?"
              register={register("personal_reward")}
            />
            <p className="FormError">
              <>{errors.personal_reward?.message}</>
            </p>
          </div>

          <div className="side-right">
            <InputSpecial
              label="Dificuldade"
              name="dificulty"
              type="select"
              options={dificulties}
              register={register("dificulty")}
            />
            <InputSpecial
              label="Meta de constância"
              name="constancy"
              type="select"
              options={constancies}
              register={register("constancy")}
            />
            <p>Não será possível alterar a meta de constância após o hábito ser criado</p>
          </div>

          <ModalFooter className="form-footer">
            <Button name='cancelar' variant="cancel" onClick={handleModal} />
            <Button name='CRIAR' variant="primary" />
          </ModalFooter>
        </ModalForm>
      </Modal>
    </ModalWrapper>
  )
}

export default ModalCreateHabit;
