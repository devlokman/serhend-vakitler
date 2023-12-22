<template>
  <p class="ion-text-center">{{ countdown }}</p>
  <ion-list v-if="formattedPrayerTimes.length > 0">
    <ion-item v-for="(prayerTime, index) in formattedPrayerTimes" :key="index">
      <ion-label>{{ prayerTime.title }}</ion-label>
      <ion-label class="ion-float-end" slot="end">{{ prayerTime.time }}</ion-label>
    </ion-item>
  </ion-list>
  <ion-text v-else>No prayer times available for today.</ion-text>
</template>
<script>
import {ref} from 'vue';
import {getPrayerTimes} from '@/services/prayerTimesService';
import moment from "moment";

export default {
  name: 'PrayerTimes',
  setup() {
    const prayerTimes = ref({});
    const currentPrayerIndex = ref(-1);
    const countdown = ref('');

    const formattedPrayerTimes = ref([]);
    const formattedPrayerTimesTomorrow = ref([]);
    const formattedPrayerTimesYesterday = ref([]);

    const currentPrayer = ref('');

    const getPrayerTitle = (index) => {
      const titles = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];
      return titles[index];
    };

    const updateCountdown = (targetTime,tomorrow) => {
      const currentTime = moment();
      const duration = moment.duration(targetTime.diff(currentTime));

      const hoursRemaining = Math.floor(duration.asHours());
      const minutesRemaining = duration.minutes();
      const secondsRemaining = duration.seconds();

      const currentPrayerTitle = (tomorrow ? 'İmsak': currentPrayer.value.title);
      return `${currentPrayerTitle} Vaktine kalan ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`;
    };

    const startCountdown = (endTime, nextDay) => {
      const updateCountdownWrapper = () => {
        if (nextDay) {
          const tomorrow = moment().add(0, 'days');
          const desiredTimeTomorrow = moment(endTime, 'HH:mm');
          const nextDayDate = tomorrow.clone().set({
            hour: desiredTimeTomorrow.hours(),
            minute: desiredTimeTomorrow.minutes(),
            second: 0,
            millisecond: 0,
          });
          countdown.value = updateCountdown(nextDayDate,true);
        } else {
          countdown.value = updateCountdown(moment(endTime));
        }
      };

      updateCountdownWrapper();

      setInterval(updateCountdownWrapper, 1000);

    };

    const fetchPrayerTimes = async () => {
      try {
        const response = await getPrayerTimes('Turkey', 'Ankara', 'Ankara', '2023-12-21', 3, 180, 'Turkey');
        prayerTimes.value = response.times;

        const today = new Date().toISOString().split('T')[0];
        const todayPrayerTimes = response.times[today] || [];

        formattedPrayerTimes.value = todayPrayerTimes.map((time, index) => ({
          title: getPrayerTitle(index),
          time,
        }));

        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const tomorrow = nextDay.toISOString().split('T')[0];
        const tomorrowPrayerTimes = response.times[tomorrow] || [];

        formattedPrayerTimesTomorrow.value = tomorrowPrayerTimes.map((time, index) => ({
          title: getPrayerTitle(index),
          time,
        }));


        const prevDay = new Date();
        prevDay.setDate(prevDay.getDate() - 1);
        const yesterday = prevDay.toISOString().split('T')[0];
        const yesterdayPrayerTimes = response.times[yesterday] || [];
        formattedPrayerTimesYesterday.value = yesterdayPrayerTimes.map((time, index) => ({
          title: getPrayerTitle(index),
          time,
        }));

        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        let startedPrayerTime = null;
        let endedPrayerTime = null;

        for (let i = 0; i < formattedPrayerTimes.value.length; i++) {
          const prayerTime = formattedPrayerTimes.value[i];

          if (currentTime >= prayerTime.time) {
            startedPrayerTime = prayerTime;
          }

          if (currentTime < prayerTime.time) {
            endedPrayerTime = prayerTime;

            if(currentTime > '00:00'){
              startedPrayerTime = formattedPrayerTimesYesterday.value[5]
            }
            break;
          }

        }
        if (startedPrayerTime && startedPrayerTime.title === 'Yatsı') {
          const nextDay = new Date(currentTime);
          nextDay.setDate(nextDay.getDate() + 1);
          endedPrayerTime = formattedPrayerTimesTomorrow.value.find(prayerTime => prayerTime.title === 'İmsak');
        }
        currentPrayer.value = startedPrayerTime;
        if (endedPrayerTime) {
          startCountdown(endedPrayerTime.time,startedPrayerTime.title === 'Yatsı');
        } else {
          console.log('No valid time frame found.');
        }

      } catch (error) {
        // Handle error
        console.error('Error fetching prayer times:', error);
      }
    };




    fetchPrayerTimes();

    return {
      prayerTimes,
      currentPrayerIndex,
      countdown,
      formattedPrayerTimes,
      getPrayerTitle,
      startCountdown,
    };
  },
};
</script>