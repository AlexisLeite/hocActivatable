export default function Explanation() {
  return (
    <div>
      <p>
        Este componente se mostrará utilizando un hoc que permite declarar un
        componente en cualquier sitio y utilizar los métodos show y hide que se
        obtienen como retorno del llamado al hoc.
      </p>
      <p>
        La ventaja de esta metodología es que permite abrir modals (o cualquier
        componente) desde cualquier parte de la aplicación, incluso donde no es
        posible utilizar hooks.
      </p>
      <p>
        Si se inspecciona el código fuente se notará que el componente Home no
        está utilizando ningún hook. Al hacer clic en el botón se está llamando
        a una función que se encuentra fuera del componente y desde ahí se abre
        el modal.
      </p>
    </div>
  );
}
