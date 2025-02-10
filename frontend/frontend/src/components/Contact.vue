<template>
  <section class="relative py-10 w-full bg-black text-white">
    <div
      v-if="overlay && bg.type !== 'color'"
      class="absolute inset-0"
      :style="{ backgroundColor: overlayColor, opacity: overlayOpacity }"
    ></div>

    <div class="relative z-10 max-w-screen-lg mx-auto px-4">
      <div class="text-center">
        <h3 v-if="showTitle" class="text-3xl font-bold text-gray-300 mb-4">Contact Us</h3>
        <h4 v-if="showSubtitle" class="text-lg text-gray-400">Get in touch with us</h4>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        <div class="bg-white text-black shadow-lg rounded-lg p-6">
          <h5 v-if="showCardTitle" class="text-xl font-semibold mb-4">Contact Information</h5>
          <ul class="space-y-3">
            <li><strong>Phone:</strong> <a href="tel:+3364448714" class="text-blue-500 hover:underline">+33 64 44 87 14</a></li>
            <li><strong>WhatsApp:</strong> <a href="tel:+3364448714" class="text-blue-500 hover:underline">+33 64 44 87 14</a></li>
            <li><strong>Email:</strong> <a href="mailto:support@meditrust.com" class="text-blue-500 hover:underline">support@meditrust.com</a></li>
            <li><strong>Address:</strong> 95 avenue Parmentier, 75011 Paris, France</li>
            <li><strong>Working Hours:</strong> Mon-Fri: 9am - 6pm</li>
          </ul>
        </div>

        
        <div class="rounded-lg overflow-hidden shadow-lg">
          <iframe
            class="w-full h-64 sm:h-80 md:h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.575796350083!2d2.3735499999999994!3d48.86629899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66da79149131f%3A0x4102a0a34029b952!2sEpitech%20Digital%20School!5e0!3m2!1sen!2sfr"
            allowfullscreen
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
  value: "#000000",
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
