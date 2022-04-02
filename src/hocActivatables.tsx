/** @jsxImportSource theme-ui */
import React from "react";
import EventEmitter from "../src/EventEmitter";

export interface IComponentDefinition<PropsType> {
  index: number;
  props: PropsType;
  Component: React.FunctionComponent<PropsType>;
}

let componentsCount = 0;
const ComponentsEvents = new (class extends EventEmitter<{
  show: IComponentDefinition<any>;
  hide: number;
}> {})();

export function hocActivatable<PropsType>(
  Component: React.FunctionComponent<PropsType>
) {
  const index = componentsCount++;

  return {
    show(props: PropsType) {
      ComponentsEvents.emit("show", { index, props, Component });
    },
    hide() {
      ComponentsEvents.emit("hide", index);
    },
  };
}

export function RenderActivatables() {
  const [activeComponents, setActiveComponents] = React.useState<
    IComponentDefinition<any>[]
  >([]);

  console.log(activeComponents);

  React.useEffect(() => {
    ComponentsEvents.on("show", (definition) => {
      setActiveComponents((currentActive) => [
        ...currentActive.filter(
          (definition) => definition.index !== definition.index
        ),
        definition,
      ]);
    });
    ComponentsEvents.on("hide", (index) => {
      setActiveComponents((curretnActive) =>
        curretnActive.filter((definition) => definition.index !== index)
      );
    });
  }, []);

  return (
    <>
      {activeComponents.map(({ index, props, Component }) => {
        return <Component key={index} {...props} />;
      })}
    </>
  );
}
