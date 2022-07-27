import { Notify } from "quasar";

export const showNotify = (
  configNotify = { message: "Mensaje", color: "secondary" }
) => {
  console.log(configNotify);
  Notify.create({
    ...configNotify,
  });
};
