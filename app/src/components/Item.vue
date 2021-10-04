<template>
  <div :style="style.card">
    <ul class="card__list" :style="style.card__list">
      <li class="card__item">
        <img
          :src="volume.volumeInfo.imageLinks.smallThumbnail"
          :alt="card.imgAlt"
        />
      </li>
      <li class="card__item">
        <span>{{ volume.volumeInfo.title }}</span>
      </li>
      <li
        class="card__item"
        v-for="(autor, index) in volume.volumeInfo.authors"
        :key="index"
      >
        <span>{{ autor }}</span>
      </li>
      <li class="card__item">
        <span>
          {{ volume.volumeInfo.publishedDate }}
        </span>
      </li>
      <button class="card__btn">Заказать</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    volume: {
      type: Object,
    },
  },
  data() {
    return {
      card: {
        imgAlt: "Изображение обложки тома",
      },
      style: {
        card: {
          // display: "flex",
          // flexBasis: "50%",
        },
        card__list: {
          listStyle: "none",
          margin: "0 0 10px",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "10px",
        },
      },
    };
  },
};
</script>
