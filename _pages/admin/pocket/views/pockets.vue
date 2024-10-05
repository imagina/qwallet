<template>
  <div id="pocketsView">
    <div class="row q-gutter-md">
      <div v-for="pocket in mappedPockets" :key="pocket.id" class="pocket box">
        <!-- Top Content -->
        <div class="pocket__top row justify-between q-mb-md">
          <div class="pocket__top-data">
            <div class="text-blue-grey">{{ pocket.name }}</div>
            <div class="text-h6">${{ $trn(pocket.total) }}</div>
          </div>
          <div class="pocket__top-icon row items-center justify-center"
               :style="`background-color: ${pocket.color}`">
            <q-icon :name="pocket.icon" />
          </div>
        </div>
        <!-- Tiny stats row -->
        <div class="pocket__stats q-mb-lg">
          <div class="stat-item">
            <span :class="`text-${types.positive.color}`">
              <q-icon :name="types.positive.icon" />
              ${{ pocket.entry }}
            </span>
            <span class="label">{{types.positive.label}}</span>
          </div>
          <div class="stat-item">
            <span :class="`text-${types.negative.color}`">
              <q-icon :name="types.negative.icon" />
              ${{ pocket.output }}
            </span>
            <span class="label">{{types.negative.label}}</span>
          </div>
        </div>
        <!-- Balance -->
        <div class="pocket__balance">
          <q-separator class="q-mb-xs" />
          <div class="stat-item row justify-between">
            <span class="label">Balance</span>
            <span :class="`text-${pocket.balance >= 0 ? types.positive.color : types.negative.color}`">
              ${{ $trn(pocket.balance) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  setup(props) {
    // Inject the controller from the parent
    return inject('controller');
  },
  computed: {
    mappedPockets() {
      return this.pockets.map(pocket => ({
        ...pocket,
        balance: pocket.entry - pocket.output
      }));
    }
  },
  methods: {}
});
</script>

<style lang="scss">
#pocketsView {
  .pocket {
    width: 100%;

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
