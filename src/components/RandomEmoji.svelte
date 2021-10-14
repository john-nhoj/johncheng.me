<script lang="ts">
  const emojis: {
    denominator: 'a' | 'an';
    name: string;
    path: string;
  }[] = [
    { denominator: 'an', name: 'apple', path: "/assets/emojis/apple.svg"},
    { denominator: 'a', name: 'burger', path: "/assets/emojis/burger.svg"},
    { denominator: 'a', name: 'burrito', path: "/assets/emojis/burrito.svg"},
    { denominator: 'a', name: 'carrot', path: "/assets/emojis/carrot.svg"},
    { denominator: 'a', name: 'cherry', path: "/assets/emojis/cherry.svg"},
    { denominator: 'a', name: 'dog', path: "/assets/emojis/dog.svg"},
    { denominator: 'an', name: 'elephant', path: "/assets/emojis/elephant.svg"},
    { denominator: 'a', name: 'flamingo', path: "/assets/emojis/flamingo.svg"},
    { denominator: 'a', name: 'giraffe', path: "/assets/emojis/giraffe.svg"},
    { denominator: 'a', name: 'hot-dog', path: "/assets/emojis/hot-dog.svg"},
    { denominator: 'a', name: 'koala', path: "/assets/emojis/koala.svg"},
    { denominator: 'a', name: 'lion', path: "/assets/emojis/lion.svg"},
    { denominator: 'a', name: 'lizard', path: "/assets/emojis/lizard.svg"},
    { denominator: 'an', name: 'octopus', path: "/assets/emojis/octopus.svg"},
    { denominator: 'an', name: 'orange', path: "/assets/emojis/orange.svg"},
    { denominator: 'a', name: 'panda', path: "/assets/emojis/panda.svg"},
    { denominator: 'a', name: 'pineapple', path: "/assets/emojis/pineapple.svg"},
    { denominator: 'a', name: 'snake', path: "/assets/emojis/snake.svg"},
    { denominator: 'a', name: 'taco', path: "/assets/emojis/taco.svg"},
    { denominator: 'a', name: 'unicorn', path: "/assets/emojis/unicorn.svg"},
    { denominator: 'a', name: 'zebra', path: "/assets/emojis/zebra.svg"}
  ]
  const randomNumber = Math.floor(Math.random() * emojis.length - 1);
  const emoji = emojis[randomNumber]
  const { denominator, name, path } = emoji
</script>

<section class="grid place-items-center">
  <img src={path} alt={`Emoji of ${denominator} ${name}`} class="w-20 h-20"/>
  <p>
    Here is {denominator} {name} for you!
  </p>
</section>
