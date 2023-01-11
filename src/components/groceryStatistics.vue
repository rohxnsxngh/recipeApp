<template>
  <!-- Grocery Statistics -->
  <div v-if="isLoading">
    <div>
      <p class="font-semibold">
        Nutritional Information:
        <span class="text-green-500">{{ groceryStats.text }}</span>
      </p>
    </div>
    <div class="stats stats-vertical lg:stats-horizontal shadow text-center">
      <div class="stat">
        <div class="stat-title">Energy</div>
        <div class="stat-value">
          {{ groceryStats.parsed[0].food.nutrients.ENERC_KCAL }}
        </div>
        <div class="stat-desc">Energy (kilocalorie)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Protein</div>
        <div class="stat-value">
          {{ groceryStats.parsed[0].food.nutrients.PROCNT }}
        </div>
        <div class="stat-desc">Amount of Protein (grams)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Fat</div>
        <div class="stat-value">
          {{ groceryStats.parsed[0].food.nutrients.FAT }}
        </div>
        <div class="stat-desc">Total Lipids (grams)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Carbohydrate</div>
        <div class="stat-value">
          {{ groceryStats.parsed[0].food.nutrients.CHOCDF }}
        </div>
        <div class="stat-desc">Carbohydrate by Difference (grams)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Fiber</div>
        <div class="stat-value">
          {{ groceryStats.parsed[0].food.nutrients.FIBTG }}
        </div>
        <div class="stat-desc">Total Dietary Fiber (grams)</div>
      </div>
    </div>
  </div>
  <!-- Grocery Statistics -->
</template>

<script>
export default {
  props: {
    groceryStatistics: [],
    isLoading: false,
  },
  data() {
    return {};
  },
};
</script>
