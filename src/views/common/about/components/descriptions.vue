<script setup lang="ts">
import type { SchemaItem } from './interface'

const {
  schemaItem,
  column = 2,
} = defineProps<{
  /** 表格项 */
  schemaItem: SchemaItem[]
  /** 总列数 */
  column?: number
}>()
</script>

<template>
  <table class="table">
    <tbody>
      <tr v-for="(info, index) in schemaItem" :key="index" class="table-row">
        <template v-if="index % column === 0">
          <template v-for="(num, idx) in column" :key="idx">
            <th v-if="index + idx < schemaItem.length" class="table-hrader">
              {{ schemaItem[index + idx].label }}
            </th>
            <td
              v-if="index + idx < schemaItem.length"
              class="table-content"
              v-html="schemaItem[index + idx].value"
            />
          </template>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: #FFF;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 3px;
  border: 1px solid #EFEFF5;
}

.table-row {
  box-sizing: border-box;
}

.table-hrader:not(:last-child) {
  border-right: 1px solid #EFEFF5;
}

.table-hrader {
  padding: 12px 16px;
  text-align: left;
  font-weight: 400;
  color: #1F2225;
  background-clip: padding-box;
  background-color: #FAFAFC;
  display: table-cell;
  box-sizing: border-box;
  border-bottom: 1px solid #EFEFF5;
}

.table-content:not(:last-child) {
  border-right: 1px solid #EFEFF5;
}
.table-content {
  padding: 12px 16px;
  font-size: 14px;
  color: #333639;
  vertical-align: top;
  display: table-cell;
  box-sizing: border-box;
  border-bottom: 1px solid #EFEFF5;
}
</style>
