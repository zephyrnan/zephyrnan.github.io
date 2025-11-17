<template>
  <div class="post-cards">
    <a
      v-for="(post, index) in posts"
      :key="index"
      :href="post.link"
      class="post-card"
    >
      <div class="card-icon">{{ post.icon }}</div>
      <div class="card-content">
        <h3 class="card-title">{{ post.title }}</h3>
        <p class="card-description">{{ post.description }}</p>
      </div>
      <div class="card-arrow">→</div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.post-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.post-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e3f2fd;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(30, 136, 229, 0.1), transparent);
  transition: left 0.5s ease;
}

.post-card:hover::before {
  left: 100%;
}

.post-card:hover {
  transform: translateY(-5px);
  border-color: #1e88e5;
  box-shadow: 0 8px 24px rgba(30, 136, 229, 0.15);
}

.card-icon {
  font-size: 40px;
  margin-right: 15px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.post-card:hover .card-icon {
  transform: scale(1.2) rotate(5deg);
}

.card-content {
  flex: 1;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e88e5;
  transition: color 0.3s ease;
}

.post-card:hover .card-title {
  color: #1565c0;
}

.card-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.card-arrow {
  font-size: 24px;
  color: #1e88e5;
  margin-left: 15px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.post-card:hover .card-arrow {
  transform: translateX(5px);
}

/* 暗黑模式支持 */
html.dark .post-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-color: #424242;
}

html.dark .post-card:hover {
  border-color: #42a5f5;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.2);
}

html.dark .card-title {
  color: #42a5f5;
}

html.dark .post-card:hover .card-title {
  color: #64b5f6;
}

html.dark .card-description {
  color: #b0b0b0;
}

html.dark .card-arrow {
  color: #42a5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-cards {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .post-card {
    padding: 15px;
  }

  .card-icon {
    font-size: 32px;
    margin-right: 12px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-description {
    font-size: 13px;
  }
}
</style>
