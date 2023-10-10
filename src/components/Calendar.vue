<template>
  <div class="index">
    <VueHashCalendar
      :picker-type="'date'"
      :scroll-change-date="false"
      :show-not-current-month-day="false"
      :mark-date="[{ type: 'circle', color: '#f00', date }]"
      @change="handleChange"
    />
    <div v-for="(time, idx) in timeList" :key="idx">
      {{ time }}
    </div>
  </div>
</template>

<script setup>
import { createApp, ref } from 'vue'
import { dateFormatter } from '../../helpers/tools'
import VueHashCalendar from 'vue3-hash-calendar'
import 'vue3-hash-calendar/es/index.css'

const app = createApp({})
app.component(VueHashCalendar)

const apiData = ref({})
const date = ref([])

setTimeout(() => {
  const _apiData = {
    startDate: '2023/09/02',
    endDate: '2023/10/12',
    publicDate: ['2023/09/09', '2023/09/11', '2023/09/12', '2023/10/01'],
    publicTime: {
      '2023/09/09': ['time-time', 'time-time'],
      '2023/09/11': ['time-time', 'time-time', 'time-time'],
      '2023/09/12': ['time-time', 'time-time', 'time-time', 'time-time'],
      '2023/10/01': [
        'time-time',
        'time-time',
        'time-time',
        'time-time',
        'time-time',
      ],
    },
  }

  apiData.value = _apiData
  date.value = _apiData.publicDate
}, 1500)

const selectedDate = ref('')
const timeList = ref([])
const handleChange = (val) => {
  const _date = dateFormatter(val, 'yyyy/mm/dd')

  if (date.value.includes(_date)) {
    selectedDate.value = _date
    timeList.value = apiData.value.publicTime[`${selectedDate.value}`]
  } else {
    timeList.value = []
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding: 10px;
  background-color: aqua;
}
:deep(.calendar_title) {
  display: none;
}

:deep(.calendar_group) {
  .calendar_mark_circle {
    background-color: orange;
    border: none;
    &.calendar_day {
      color: #fff;
    }
    &.calendar_day_checked {
      background-color: red;
      border: none;
      color: #fff;
    }
  }
  .calendar_day_checked {
    background: none;
    color: #666;
    &.calendar_day_today {
      background-color: #f4f4f4;
    }
  }
  .calendar_day {
    color: #a2a2a2;
  }
  .calendar_day_not {
    color: #e2e2e2;
  }
}
</style>
