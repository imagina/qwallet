<template>
  <div id="pocketsView">
    <div class="row q-gutter-md relative-position">
      <!-- New Pocket -->
      <div class="new-pocket box" @click="$refs.crudPockets.create()">
        <div>
          <q-icon name="fa-solid fa-plus" class="q-mr-sm" />
          (pt) New Pocket
        </div>
      </div>
      <!-- Pockets -->
      <div v-for="pocket in pockets" :key="pocket.id" class="pocket box">
        <!-- Top Content -->
        <div class="pocket__top row justify-between q-mb-md">
          <div class="pocket__top-data">
            <div class="text-blue-grey">{{ pocket.title }}</div>
            <div class="text-h6">${{ $trn(pocket.total) }}</div>
          </div>
          <div class="pocket__top-icon row items-center justify-center"
               :style="`background-color: ${pocket.options.color}`">
            <q-icon name="far fa-wallet" />
          </div>
        </div>
        <!-- Description -->
        <div class="text-caption text-blue-grey">
          {{ pocket.description }}
        </div>
        <q-separator class="q-mb-xs" />
        <!-- Type & Actions -->
        <div class="pocket__balance">
          <div class="stat-item row justify-between items-center">
            <div :style="`color: ${pocket.type.color}`">
              <q-icon :name="pocket.type.icon" />
              {{ pocket.type.title }}
            </div>
            <!--Actions-->
            <div class="row q-gutter-xs">
              <q-btn icon="fas fa-trash" flat color="blue-grey-3" size="xs" round
                     @click="$refs.crudPockets.delete(pocket)">
                <q-tooltip>(pt) Eliminar</q-tooltip>
              </q-btn>
              <q-btn icon="fas fa-pen" flat color="blue-grey-3" size="xs" round
                     @click="$refs.crudPockets.update(pocket)">
                <q-tooltip>(pt) Editar</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <!--Empty-->
      <div v-if="!pockets.length && !loading" class="text-center full-width">
        <not-result />
      </div>
      <!-- Inner loading -->
      <inner-loading :visible="loading" />
    </div>
    <!--  Pocket Crud -->
    <crud :crud-data="import('modules/qwallet/_crud/pockets.vue')" type="onlyUpdate"
          ref="crudPockets" @created="getPockets" @updated="getPockets" />
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue';
import service from 'modules/qwallet/_pages/admin/wallet/services';

export default defineComponent({
  setup(props) {
    // Inject the controller from the parent
    return inject('controller');
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  },
  computed: {
    mappedPockets() {
      return this.pockets.map(pocket => ({
        ...pocket,
        balance: pocket.entry - pocket.output
      }));
    }
  },
  data() {
    return {
      loading: false,
      pockets: []
    };
  },
  methods: {
    init() {
      this.getPockets();
    },
    getPockets() {
      this.loading = true;
      service.getPockets().then(response => {
        this.pockets = response.data;
        this.loading = false;
      }).catch(error => this.loading = false);
    }
  }
});
</script>

<style lang="scss">
#pocketsView {
  .new-pocket {
    width: 100%;
    min-height: max-content;
    padding: 10px;
    cursor: pointer;

    div {
      text-align: center;
      border: 2px dotted $blue-grey;
      border-radius: $custom-radius;
      padding: 10px;
      color: $blue-grey
    }
  }

  .pocket {
    width: 100%;
    min-height: max-content;

    .pocket__top {
      .pocket__top-icon {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        color: white;
        font-size: 20px;
      }
    }

    .pocket__stats {
      .stat-item {
        .label {
          color: $blue-grey;
          font-weight: 300;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
