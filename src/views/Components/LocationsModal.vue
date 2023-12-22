<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">İPTAL</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Lokasyon</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Seç</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-select v-model="selectedCountry" placeholder="Ülke Seçiniz..." label="Ülke"  aria-label="Ülke" interface="action-sheet" >
      <ion-select-option
          v-for="(country, index) in countries"
          :key="index"
          :value="country.name"
      >
        {{ country.name }}
      </ion-select-option>
    </ion-select>

    <ion-select v-model="selectedRegion" placeholder="Bölge Seçiniz..." label="Bölge"  aria-label="İl/Eyalet/Kanton" interface="action-sheet" >
      <ion-select-option
          v-for="(region, index) in regions"
          :key="index"
          :value="region"
      >
        {{ region }}
      </ion-select-option>
    </ion-select>
    <ion-select v-model="selectedCity" placeholder="Şehir Seçiniz..." label="Şehir"  aria-label="Şehir" interface="action-sheet" >
      <ion-select-option
          v-for="(city, index) in cities"
          :key="index"
          :value="city"
      >
        {{ city }}
      </ion-select-option>
    </ion-select>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
  modalController,
} from '@ionic/vue';
import {onMounted, ref, watch} from 'vue';
import {fetchCountries} from "@/services/countriesService";
import {fetchRegions} from "@/services/countryService";
import {fetchCities} from "@/services/citiesService";
import {CountryModel} from "@/models/countries.model";
import {setLocalStorageItem} from "@/services/localStorageService";

const countries = ref<CountryModel[]>([]);
const regions = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedRegion = ref(null);
const selectedCity = ref(null);

onMounted(async () => {
  try {
    countries.value = await fetchCountries();
  } catch (error) {
    // Error
  }
});

watch(selectedCountry, async (newCountry) => {
  if (newCountry) {
    try {
      regions.value = await fetchRegions(newCountry);
    } catch (error) {
      // error
    }
  }
});
watch(selectedRegion, async (newRegion) => {
  if (newRegion) {
    try {
      cities.value = await fetchCities(selectedCountry.value, newRegion);
    } catch (error) {
      // error
    }
  }
});
const cancel = () => {
  console.log('cancel');
  modalController.dismiss();
};
const confirm = () => {
    const country = selectedCountry.value ?? 'Turkey';
    const region = selectedRegion.value ?? 'Adıyaman';
    const city = selectedCity.value ?? 'Kahta';

    setLocalStorageItem('selectedCountry',country);
    setLocalStorageItem('selectedRegion', region);
    setLocalStorageItem('selectedCity', city);
    window.location.reload()
    modalController.dismiss();
};
</script>