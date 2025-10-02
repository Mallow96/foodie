<script setup>
import {
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
  watchEffect,
} from "vue";
import dayjs from "dayjs";

// Props 定義（支援 v-model）
const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: null,
  },
});

// Emits 定義
const emit = defineEmits(["update:modelValue"]);

// 現有的時間和人數相關邏輯
const currentTime = ref("");
const selectedTime = ref("");
const selectedPeople = ref(2);

const timeOptions = [];
for (let hour = 0; hour < 24; hour++) {
  timeOptions.push(`${hour.toString().padStart(2, "0")}:00`);
  timeOptions.push(`${hour.toString().padStart(2, "0")}:30`);
}

// 月曆相關的響應式變數
const currentMonth = ref(dayjs());
const selectedDate = ref(null);

// 星期標題
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

// 計算屬性：當前顯示月份標題
const currentDisplayMonth = computed(() => {
  return currentMonth.value.format("YYYY年 M月");
});

// 計算屬性：生成月曆日期陣列
const calendarDates = computed(() => {
  const dates = [];
  const firstDay = currentMonth.value.startOf("month");
  const lastDay = currentMonth.value.endOf("month");

  // 計算需要顯示的開始日期（包含上個月的日期）
  const startDate = firstDay.startOf("week");
  // 計算需要顯示的結束日期（包含下個月的日期）
  const endDate = lastDay.endOf("week");

  let current = startDate;

  // 生成 6 週的日期（42 個日期）
  while (current.isBefore(endDate) || dates.length < 42) {
    dates.push({
      day: current.date(),
      month: current.month(),
      year: current.year(),
      isCurrentMonth: current.month() === currentMonth.value.month(),
      fullDate: current.clone(),
    });
    current = current.add(1, "day");
  }

  return dates;
});

// 方法：上一個月
const prevMonth = () => {
  currentMonth.value = currentMonth.value.subtract(1, "month");
};

// 方法：下一個月
const nextMonth = () => {
  currentMonth.value = currentMonth.value.add(1, "month");
};

// 方法：選擇日期
const selectDate = (date) => {
  if (isDisabledDate(date)) return;

  // 若點擊非當月日期，先切換至該月份
  if (!date.isCurrentMonth) {
    currentMonth.value = date.fullDate.clone().startOf("month");
  }

  selectedDate.value = date.fullDate;
  // 發送 v-model 更新事件
  emit("update:modelValue", date.fullDate.format("YYYY-MM-DD"));
};

// 方法：判斷是否為選中的日期
const isSelectedDate = (date) => {
  if (!selectedDate.value) return false;
  return selectedDate.value.isSame(date.fullDate, "day");
};

// 方法：判斷是否為禁用的日期（例如：過去的日期）
const isDisabledDate = (date) => {
  // 這裡可以自定義禁用邏輯，例如禁用過去的日期
  return date.fullDate.isBefore(dayjs(), "day");
};

// 時間四捨五入邏輯
const roundToNearestHalfHour = () => {
  const now = dayjs();
  const currentMinute = now.minute();
  let minutesToAdd = 0;

  if (currentMinute < 15) {
    minutesToAdd = -currentMinute;
  } else if (currentMinute < 45) {
    minutesToAdd = 30 - currentMinute;
  } else {
    minutesToAdd = 60 - currentMinute;
  }

  const rounded = now.add(minutesToAdd, "minute");
  return rounded.format("HH:mm");
};

// 監聽選擇的日期、人數、時間
watchEffect(() => {
  if (
    selectedDate.value &&
    selectedTime.value &&
    selectedPeople.value != null
  ) {
    console.log(
      `選擇的日期：${selectedDate.value.format("YYYY-MM-DD")}`,
      `人數：${selectedPeople.value}`,
      `時間：${selectedTime.value}`
    );
  }
});

// 組件掛載時的初始化
onMounted(() => {
  // 初始化時間
  const roundedTimeValue = roundToNearestHalfHour();
  currentTime.value = roundedTimeValue;
  selectedTime.value = currentTime.value;

  // 初始化選中日期為今天
  const today = dayjs();
  selectedDate.value = today;
  currentMonth.value = today;

  // 如果有 props.modelValue，使用它作為初始值
  if (props.modelValue) {
    const initialDate = dayjs(props.modelValue);
    selectedDate.value = initialDate;
    currentMonth.value = initialDate;
  } else {
    // 否則發送今天的日期作為初始值
    emit("update:modelValue", today.format("YYYY-MM-DD"));
  }

  console.log("當前時間四捨五入到最近的半小時:", currentTime.value);
});
</script>

<template>
  <div class="card mb-3" style="max-width: 18rem">
    <h5 class="card-title text-center">線上預訂</h5>

    <!-- 月曆 -->
    <div class="calendar-container">
      <!-- 月曆標題與導航 -->
      <div class="calendar-header">
        <button class="nav-btn" @click="prevMonth">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <h6 class="month-title">{{ currentDisplayMonth }}</h6>
        <button class="nav-btn" @click="nextMonth">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="date-area">
        <!-- 星期標題 -->
        <div class="weekdays">
          <div v-for="day in weekDays" :key="day" class="weekday">
            {{ day }}
          </div>
        </div>

        <!-- 日期格子 -->
        <div class="dates-grid">
          <button
            v-for="date in calendarDates"
            :key="`${date.year}-${date.month}-${date.day}`"
            class="date-cell"
            :class="{
              'other-month': !date.isCurrentMonth,
              selected: isSelectedDate(date),
              disabled: isDisabledDate(date),
            }"
            :disabled="isDisabledDate(date)"
            @click="selectDate(date)"
          >
            {{ date.day }}
          </button>
        </div>
      </div>
    </div>
    <!-- 月曆結束 -->

    <div class="selects">
      <!-- 人數按鈕 -->
      <div class="dropdown-group">
        <i class="fa-regular fa-user"></i>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="selectedPeople"
        >
          <option v-for="n in 10" :value="n">{{ n }} 人</option>
        </select>
      </div>
      <!-- 人數按鈕 -->

      <!-- 時間按鈕 -->
      <div class="dropdown-group">
        <i class="fa-regular fa-clock"></i>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="selectedTime"
        >
          <option v-for="time in timeOptions" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
      <!-- 時間按鈕 -->
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 0 !important;
}

.card {
  padding: 1rem;
  border: 2px solid var(--color-brown-300);
}

.selects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dropdown-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-select:focus {
  border-color: var(--color-primary-brown);
  box-shadow: 0 0 0 0.2rem var(--color-primary-yellow);
}

/* start */
/* 月曆容器 */
.calendar-container {
  margin-bottom: 1rem;

  overflow: hidden;
  width: 100%;
}

/* 月曆標題與導航 */
.calendar-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.month-title {
  margin: 0;
  font-weight: 600;
  color: #333;
  min-width: 120px;
  text-align: center;
}

.nav-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-primary-brown);
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: var(--color-primary-yellow);
}

.date-area {
  border: 2px solid var(--color-brown-300);
  border-radius: 8px;
  overflow: hidden;
}

/* 星期標題 */
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* background-color: #f1f3f5; */
}

.weekday {
  padding: 8px 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #666;
  /* border-right: 1px solid #e0e0e0; */
}

.weekday:last-child {
  border-right: none;
}

/* 日期格子 */
.dates-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.date-cell {
  border: none;

  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
}

.date-cell:nth-child(7n) {
  border-right: none;
}

.date-cell:hover:not(:disabled) {
  background-color: var(--color-brown-50);
  color: white;
}

/* 非當月日期 */
.date-cell.other-month {
  color: #ccc;
  /* background-color: #fafafa; */
}

/* 選中的日期 */
.date-cell.selected {
  background-color: var(--color-primary-brown);
  color: white;
  font-weight: 600;
}

.date-cell.selected:hover {
  background-color: var(--color-primary-dbrown);
}

/* 禁用的日期 */
.date-cell.disabled {
  color: #ddd;
  cursor: not-allowed;
  /* background-color: #f9f9f9; */
}

/* .date-cell.disabled:hover {
  background-color: #f9f9f9;
} */
</style>
