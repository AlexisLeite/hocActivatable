/** @jsxImportSource theme-ui */
import { FaWindowClose } from "@meronex/icons/fa";
import Head from "next/head";
import React, { ReactElement } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
} from "theme-ui";
import Config from "../../src/config/dev";
import { useAppDispatch } from "../../src/hooks/hooks";
import { setNotification } from "../../src/store/notificationsSlice";
import ApiaApi from "../../src/utils/apiaApi";
import { arrayOrArray } from "../../src/utils/utils";
import EnvironmentsSelector, {
  IEnvironmentDefinition,
} from "./EnvironmentsSelector";
import Fieldset from "./FieldSet";
import ImageSelector, { IImageDefinition } from "./ImageSelector";

/* HEADER */
const title = "Crear nuevo grupo";
const saveButtonLabel = "Guardar";
const cancelButtonLabel = "Cancelar";
const closeButtonLabel = "Cerrar";

/* GENERAL DATA SECTION */
const generalDataTitle = "Datos generales";
const nameLabel = "Nombre";
const descriptionLabel = "Descripción";
const publishRSSLabel = "Publicar RSS";
const avoidChatLabel = "Evitar registro en el servidor de chat";

/* SIMULATION DATA SECTION */
const simulationDataTitle = "Datos de simulación";
const resourcesTypesLabel = "Tipo de recursos";
const jobCalendarLabel = "Calendario de trabajo";
const hourCostLabel = "Costo de trabajo x hora";
const fixedCostLabel = "Costo fijo de trabajo";

/* BUTTONS */
const confirmLabel = "Seleccionar";
const cancelLabel = "Cancelar";

const behaveAsAccordion = true;

interface IFormInput {
  name: string;
  description: string;
  publishRSS: boolean;
  avoidChat: boolean;
  environments: IEnvironmentDefinition[];
  image: string;
  resourcesType: string;
  jobCalendar: string;
  hourCost: string;
  fixedCost: string;
}

interface IGroups extends IFormInput {}

const Groups = (props: IGroups): ReactElement => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const { register, handleSubmit, control, setValue } = useForm<IFormInput>({
    defaultValues: props,
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function fetchEnvironments() {
      const result = await ApiaApi.post<{
        environments?: {
          environment?: IEnvironmentDefinition | IEnvironmentDefinition[];
        };
      }>(Config.ADMIN_GET_ENVIRONMENTS);

      const environments = arrayOrArray(
        result?.data?.environments?.environment ?? []
      );
      setValue("environments", environments);
    }
    fetchEnvironments();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container variant="layout.admin.upsertion">
        <Head>
          <title>A title</title>
        </Head>
        <header>
          <Heading variant="text.title" as="h1">
            {title}
          </Heading>
          <nav>
            <Button type="submit">{saveButtonLabel}</Button>
            <Button type="button" variant="outline">
              {cancelButtonLabel}
            </Button>
            <Button type="button" variant="outline">
              {closeButtonLabel}
            </Button>
          </nav>
        </header>
        <main>
          <Fieldset
            inAccordion={behaveAsAccordion}
            title={generalDataTitle}
            onClick={() => setCurrentTab(0)}
            open={currentTab === 0}
            name="GeneralData"
          >
            <Flex>
              <Controller // Image Picker
                control={control}
                name="image"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid },
                }) => {
                  return (
                    <ImageSelector
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      fetcher={async () => {
                        const result = await ApiaApi.post<{
                          image: IImageDefinition[];
                        }>(Config.ADMIN_GET_IMAGES);

                        if (result && result.data) {
                          return result.data.image;
                        }
                        dispatch(
                          setNotification({
                            message: "Something went wrong",
                            type: "exception",
                            open: true,
                          })
                        );
                        return null;
                      }}
                      fakeImages={true}
                    />
                  );
                }}
              />
              <div className="Container">
                <label htmlFor="NameInput">
                  <h3>{nameLabel}:</h3>
                  <Input
                    {...register("name", { required: true })}
                    aria-label={nameLabel}
                    id="NameInput"
                  />
                </label>
                <label htmlFor="DescriptionInput">
                  <h3>{descriptionLabel}:</h3>
                  <Textarea
                    {...register("description")}
                    aria-label={nameLabel}
                    id="DescriptionInput"
                  />
                </label>
                <label className="label-flex" htmlFor="PublishRSSCheckbox">
                  <Checkbox
                    {...register("publishRSS")}
                    aria-label={nameLabel}
                    id="PublishRSSCheckbox"
                  />
                  <h4>{publishRSSLabel}</h4>
                </label>
                <label className="label-flex" htmlFor="AvoidChatCheckbox">
                  <Checkbox
                    {...register("avoidChat")}
                    aria-label={nameLabel}
                    id="AvoidChatCheckbox"
                  />
                  <h4>{avoidChatLabel}</h4>
                </label>

                <Controller
                  control={control}
                  name="environments"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => {
                    return (
                      <EnvironmentsSelector
                        {...{ onChange, onBlur, value, name, ref }}
                        fetcher={async () => {
                          const result = await ApiaApi.post<{
                            environments: {
                              environment: IEnvironmentDefinition[];
                            };
                          }>(Config.ADMIN_GET_ENVIRONMENTS);
                          if (result && result.data) {
                            console.log({ result });
                            return result.data.environments.environment;
                          }
                          return null;
                        }}
                      />
                    );
                  }}
                />
              </div>
            </Flex>
          </Fieldset>
          <Fieldset
            inAccordion={behaveAsAccordion}
            title={simulationDataTitle}
            onClick={() => setCurrentTab(1)}
            open={currentTab === 1}
            name="SimulationData"
          >
            <Grid as="section" className="Container SimulationData">
              <label htmlFor="resourcesTypesCheckbox">
                <h3>{resourcesTypesLabel}</h3>
                <Select {...register("resourcesType")} />
              </label>
              <label htmlFor="jobCalendarLabel">
                <h3>{jobCalendarLabel}</h3>
                <Select {...register("jobCalendar")} />
              </label>
              <label htmlFor="hourCostLabel">
                <h3>{hourCostLabel}</h3>
                <Input {...register("hourCost")} />
              </label>
              <label htmlFor="fixedCostLabel">
                <h3>{fixedCostLabel}</h3>
                <Input {...register("fixedCost")} />
              </label>
            </Grid>
          </Fieldset>
        </main>
      </Container>
    </form>
  );
};

export default Groups;
