<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <slot></slot>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
    </div>
  </template>
  
  <script setup>

  onMounted(() => {
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyUp);
  });

  const props = defineProps({
    isVisible: Boolean, 
    onClose: Function, 
  });
  
  const handleKeyUp = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

  const closeModal = () => {
    if (props.onClose) props.onClose();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  