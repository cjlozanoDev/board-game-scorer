<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon="icon" :color="color" text-color="white" />
        <span class="q-ml-sm">{{ messageDialog }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <ButtonBsg
          :flat="true"
          label="Cancelar"
          @click="cancel"
          color="primary"
        />
        <ButtonBsg
          :flat="true"
          label="Aceptar"
          @click="confirm"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
import ButtonBsg from "src/components/elements/ButtonBgs.vue";

export default {
  name: "DialogConfirm",
  components: {
    ButtonBsg,
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    messageDialog: {
      type: String,
      default: "¿Confirma que quiere realizar la acción?",
    },
    color: {
      type: String,
      default: "secondary",
    },
    icon: {
      type: String,
      default: "check",
    },
  },
  setup(props, context) {
    const confirm = () => {
      context.emit("confirm");
    };

    const cancel = () => {
      context.emit("cancel");
    };

    const dialogVisible = computed({
      get() {
        return props.showDialog;
      },
    });

    return {
      confirm,
      cancel,
      dialogVisible,
    };
  },
};
</script>
