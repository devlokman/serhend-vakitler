<template>
  <ion-header>
    <ion-toolbar class="header">
      <ion-buttons slot="start">
          <ion-button>
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center" @click="openLocationModal">
        <div class="location">
          <span slot="start">
            {{selectedCountry}} / {{selectedCity}}
          </span>
        </div>
      </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="openLocationModal">
          <ion-icon :icon="locationOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">

import {IonHeader, IonTitle, IonToolbar, modalController} from "@ionic/vue";
import {locationOutline, menuOutline} from "ionicons/icons";
import LocationsModal from "@/views/Components/LocationsModal.vue";
import {getLocalStorageItem} from "@/services/localStorageService";
import {ref} from "vue";

const selectedCountry = ref<string>(getLocalStorageItem('selectedCountry') || 'Turkey');
const selectedCity = ref<string>(getLocalStorageItem('selectedCity') || 'İstanbul');


const openLocationModal = async () => {
  const modal = await modalController.create({
    component: LocationsModal,
  });

  modal.present();

};
</script>

<style scoped>
ion-toolbar.header {
  --background: linear-gradient(to bottom, rgba(0, 106, 57, 0.8), transparent);
  --color: white;

  --padding-top: 10px;
  --padding-bottom: 10px;
  position: absolute;
}

.location {
  font-size: 12px;
  display: inline-block;
  border: 1px solid #ccc;
  color: #000;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 5px 10px;
  width: 60%;
  margin: 0 auto;
}

</style>