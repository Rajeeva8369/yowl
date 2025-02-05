<template>
  <section
    :class="['relative', 'py-10', fullWidth ? 'w-full' : 'container']"
    :style="sectionStyles"
  >
    <div
      v-if="overlay && bg.type !== 'color'"
      class="absolute inset-0"
      :style="{ backgroundColor: overlayColor, opacity: overlayOpacity }"
    ></div>

    <div class="relative z-10 max-w-screen-lg mx-auto">
      <div class="text-center">
        <h3 v-if="showTitle" class="text-3xl font-bold text-gray-900 mb-2">Contact Us</h3>
        <h4 v-if="showSubtitle" class="text-xl text-gray-600">Contacts Subtitle</h4>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mt-8">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h5 v-if="showCardTitle" class="text-xl font-semibold mb-4">Contact Us</h5>
          <ul class="space-y-3 text-gray-700">
            <li>
              <strong>Phone:</strong>
              <a href="tel:1-800-555-0199" class="text-blue-500 hover:underline">+33 64 44 87 14</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a href="tel:1-800-555-0199" class="text-blue-500 hover:underline">1-800-555-0199</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a href="mailto:support@newsflash.com" class="text-blue-500 hover:underline">support@meditrust.com</a>
            </li>
            <li>
              <strong>Address:</strong> 95 avenue Parmentier 75011 Paris, France
            </li>
            <li>
              <strong>Working Hours:</strong> Mon-Fri: 9am - 6pm
            </li>
          </ul>
        </div>

        <div class="rounded-lg overflow-hidden shadow-lg">
          <iframe
            class="w-full h-64 md:h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.575796350083!2d2.3735499999999994!3d48.86629899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66da79149131f%3A0x4102a0a34029b952!2sEpitech%20Digital%20School!5e0!3m2!1sen!2sfr!4v1738578427542!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><              allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
 
</template>

<script setup>
import { ref, computed } from "vue";

const fullWidth = ref(false);
const paddingTop = ref(5);
const paddingBottom = ref(5);
const showTitle = ref(true);
const showSubtitle = ref(false);
const showCardTitle = ref(true);
const overlay = ref(true);
const overlayColor = ref("#ffffff");
const overlayOpacity = ref(0.5);
const bg = ref({
  type: "color",
  value: "#edefeb",
});

const sectionStyles = computed(() => ({
  paddingTop: `${paddingTop.value}rem`,
  paddingBottom: `${paddingBottom.value}rem`,
  backgroundColor: bg.value.type === "color" ? bg.value.value : "",
  backgroundImage: bg.value.type === "image" ? `url(${bg.value.value})` : "",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
</script>

<style scoped>
/* Additional styles if needed */
</style>

