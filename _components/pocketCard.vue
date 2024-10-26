<template>
  <div class="pocketCard box">
    <!-- Top Content -->
    <div class="pocket__top row justify-between q-mb-md">
      <div class="pocket__top-data">
        <div class="text-blue-grey">{{ row.title }}</div>
        <div class="text-h6">${{ $trn(row.total) }}</div>
      </div>
      <div class="pocket__top-icon row items-center justify-center"
           :style="`background-color: ${row.options?.color ?? '#0b5f91'}`">
        <q-icon name="far fa-wallet" />
      </div>
    </div>
    <!-- Description -->
    <div class="text-caption text-blue-grey q-mb-md">
      {{ row.description }}
    </div>
    <q-separator />
    <!--Transactions summary-->
    <div class="transactions-resume row">
      <div :class="`col text-${transactions.income.color}`">
        <q-icon :name="transactions.income.icon" />
        {{ transactions.income.total }}
      </div>
      <q-separator vertical />
      <div :class="`col text-${transactions.outcome.color}`">
        <q-icon :name="transactions.outcome.icon" />
        {{ transactions.outcome.total }}
      </div>
    </div>
    <q-separator class="q-mb-xs" />
    <!-- Type & Actions -->
    <div class="pocket__balance">
      <div class="stat-item row justify-between items-center">
        <div :style="`color: ${row.type.color}`">
          <q-icon :name="row.type.icon" />
          {{ row.type.title }}
        </div>
        <!--Actions-->
        <div class="row q-gutter-xs">
          <btn-menu :actions="fieldActions" :action-data="row" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    row: { default: false },
    permitAction: { default: false },
    fieldActions: { default: false }
  },
  components: {},
  computed: {
    transactions ()
    {
      const income = this.row.toPocketTransactions.reduce((acc, item) => acc += item.amount, 0);
      const outcome = this.row.fromPocketTransactions.reduce((acc, item) => acc += item.amount, 0);
      return {
        income: {
          color: 'green',
          icon: 'fa-solid fa-arrow-up',
          total: `$ ${this.$trn(income)}`
        },
        outcome: {
          color: 'red',
          icon: 'fa-solid fa-arrow-down',
          total: `$ ${this.$trn(outcome)}`
        }
      };
    }
  }
});
</script>

<style lang="scss">
.pocketCard {
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

  .transactions-resume {
    .col {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 15px;
      font-weight: bold;

      .q-icon {
        margin-right: 8px;
      }
    }
  }
}
</style>
