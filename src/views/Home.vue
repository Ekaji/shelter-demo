<template>
    <div>
        <HeroSection />
        <PropertyFinancingComponent />
        <PropertyManagementSection />
        <SmartProgram />
        <SocialProofHero />
        <PeopleWeServe />
        <TestimonialCarousel />
        <CTABanner />
    </div>
</template>


<script>
    import HeroSection from '@/components/HeroSection.vue';
    import TestimonialCarousel from '@/components/TestimonialCarousel.vue';
    import PeopleWeServe from '@/components/PeopleWeServe.vue';
    import SmartProgram from '@/components/SmartProgram.vue';
    import SocialProofHero from '@/components/SocialProofHero.vue';
    import CTABanner from '@/components/CTABanner.vue';
    import PropertyManagementSection from '@/components/PropertyManagementSection.vue';
    import PropertyFinancingComponent from '@/components/PropertyFinancingComponent.vue';

    export default {
        name: 'AppHome',
        components: {
            HeroSection,
            TestimonialCarousel,
            PeopleWeServe,
            SmartProgram,
            SocialProofHero,
            CTABanner,
            PropertyManagementSection,
            PropertyFinancingComponent
        }
    }
</script>