<template>
  <div style="margin-top: 20px; border: 1px solid #ccc; padding: 10px">
    <!-- Brief: Simple child component used in Day2 view.
         It receives a `title` prop from its parent and emits
         a `send-message` event when the button is clicked. -->
    <h2>Child Component</h2>

    <!-- Display prop passed from the parent component -->
    <p><strong>Title from parent:</strong> {{ title }}</p>

    <!-- When clicked, this button calls `sendToParent`, which
         emits an event carrying a message back to the parent. -->
    <button @click="sendToParent">Send Message to Parent</button>
  </div>
</template>

<script setup>
// `defineProps` declares the props this component accepts.
// Here `title` is expected to be a String provided by the parent.
const props = defineProps({
  title: String,
});

// `defineEmits` declares the custom events this component may emit.
// Using a string name keeps things simple for this exercise.
const emit = defineEmits(["send-message"]);

/**
 * sendToParent
 * - Called when the user clicks the button.
 * - Emits a `send-message` event with a payload string.
 * - The parent can listen with `@send-message="handler"`.
 */
function sendToParent() {
  // Send a friendly message back to the parent component.
  emit("send-message", "Hello Parent! This came from Child 🚀");
}
</script>
