import { Notify } from "quasar";

export const showNotify = (
  configNotify = { message: "Mensaje", color: "secondary", position: "center" }
) => {
  const configNotifyAux = {
    message: configNotify.message ? configNotify.message : "Mensaje",
    color: configNotify.color ? configNotify.color : "secondary",
    position: configNotify.position ? configNotify.position : "center",
    timeout: configNotify.timeout ? configNotify.timeout : 800,
  };
  Notify.create({
    ...configNotifyAux,
  });
};
