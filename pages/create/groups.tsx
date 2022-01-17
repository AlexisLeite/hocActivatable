import Head from "next/head";
import React, { ReactElement } from "react";
import { Checkbox, Container, Flex, Heading, Input, Textarea } from "theme-ui";

export interface IFieldset {
  name: string;
  title: string;
  children?: React.ReactNode;
}

const Fieldset = ({ title, children, name }: IFieldset) => {
  return (
    <fieldset className={`Fieldset-${name}`}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};

const title = "Crear nuevo grupo";
const generalDataTitle = "Datos generales";
const nameLabel = "Nombre";
const descriptionLabel = "Descripción";
const publishRSSLabel = "Publicar RSS";
const avoidChatLabel = "Evitar registro en el servidor de chat";

const Groups = (): ReactElement => {
  return (
    <Container as="main" variant="layout.admin.upsertion">
      <Head>
        <title>A title</title>
      </Head>
      <Heading variant="text.title" as="h1">
        {title}
      </Heading>
      <form>
        <Fieldset title={generalDataTitle} name="GeneralData">
          <Flex>
            <div className="ImageContainer">
              <img role="presentation" src="https://via.placeholder.com/150" />
            </div>
            <div className="Container">
              <label htmlFor="NameInput">
                <h3>{nameLabel}:</h3>
                <Input aria-label={nameLabel} id="NameInput" />
              </label>
              <label htmlFor="DescriptionInput">
                <h3>{descriptionLabel}:</h3>
                <Textarea aria-label={nameLabel} id="DescriptionInput" />
              </label>
              <label className="label-flex" htmlFor="PublishRSSCheckbox">
                <Checkbox aria-label={nameLabel} id="PublishRSSCheckbox" />
                <h3>{publishRSSLabel}:</h3>
              </label>
              <label className="label-flex" htmlFor="PublishRSSCheckbox">
                <Checkbox aria-label={nameLabel} id="PublishRSSCheckbox" />
                <h3>{avoidChatLabel}:</h3>
              </label>
            </div>
          </Flex>
        </Fieldset>
      </form>
    </Container>
  );
};

export default Groups;
