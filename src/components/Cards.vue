<template>
    <div>
        <div class="cards">
            <div class="card" v-for="(card, index) in cards" :key="index">
                <div class="card-content">
                    <h3>{{ card.count }}</h3>
                    <p>{{ card.title }}</p>
                    <p>{{ card.description }}</p>
                    <a :href="card.link">Learn More</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 export default {
    name: 'LearnMoreCards',
    data() {
        return {
            cards: [
                {
                    count: 500,
                    title: 'Landlords',
                    description: 'Description for card 1',
                    link: '#'
                },
                {
                    count: 500,
                    title: 'Tenants',
                    description: 'Description for card 2',
                    link: '#'
                },
                {
                    count: 500,
                    title: 'Organizations',
                    description: 'Description for card 3',
                    link: '#'
                }
            ]
        }
    }
 }
</script>
    
<style scoped>

</style>