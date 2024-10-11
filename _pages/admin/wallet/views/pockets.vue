<template>
  <div id="pocketsView">
    <div class="row q-gutter-md relative-position">
      <!-- Actions -->
      <div class="row justify-between items-center" style="width: 100%">
        <div class="text-primary text-bold" style="font-size: 20px">
          {{$trp('iwallet.cms.pocket')}}
        </div>
        <div class="row q-gutter-sm">
          <q-btn @click="$refs.crudPockets.create()" v-bind="buttonProps" padding="5px 15px">
            <q-icon name="fa-solid fa-plus" class="q-mr-sm" />
            {{$tr('isite.cms.label.new')}}
          </q-btn>
          <q-btn @click="getPockets" icon="fal fa-rotate-right" v-bind="buttonProps"
                 padding="10px" />
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
               :style="`background-color: ${pocket.options?.color ?? '#0b5f91'}`">
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
      <div v-if="!pockets.length && !loadingPockets" class="text-center full-width">
        <not-result />
      </div>
      <!-- Inner loading -->
      <inner-loading :visible="loadingPockets" />
    </div>
    <!--  Pocket Crud -->
    <crud :crud-data="import('modules/qwallet/_crud/pockets.vue')" type="onlyUpdate"
          ref="crudPockets" @created="getPockets" @updated="getPockets" @deleted="getPockets" />
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  setup(props) {
    // Inject the controller from the parent
    return inject('controller');
  },
  computed: {},
  data() {
    return {
      buttonProps: {
        round: false,
        rounded: true,
        dense: true,
        unelevated: true,
        textColor: 'primary',
        style: 'border: 1px solid rgb(229 229 229)', //text-neutral-200
        noCaps: true,
        class: 'btn-small'
      }
    };
  },
  methods: {}
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
