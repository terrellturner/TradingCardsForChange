import React, { useState } from 'react';

const AboutPage = () => {
    return (
        <div className="flex-flex-row justify-center items-center">
            <img
                src="https://pmv1txxicxtao8iw.public.blob.vercel-storage.com/TCBC_Color-ilKYEGVXlbq77GKiuWX2FeYGnoyIm5.svg"
                alt=""
                className="hidden w-52 lg:block"
            />
            <div className="flex flex-col items-center">
                <h1 className="text-4xl text-off-white">About Us</h1>
                At Twin Cities Brew Crew, we've mastered the art of bringing together three amazing things: craft beer, Magic: The Gathering, and charitable giving. We're a community of passionate gamers and beer enthusiasts who believe that great things happen when you combine good people, good drinks, and good causes.
                Our story began with a simple idea: what if we could transform our love for craft beer and Magic: The Gathering into a force for positive change in our community? That's exactly what we did. We organize regular meetups at local breweries and bars across the Twin Cities, creating spaces where both seasoned players and newcomers can shuffle up, grab a pint, and make lasting connections.
                Whether you're a hardcore Magic player who knows every card by heart, a craft beer aficionado who can tell their IPAs from their sours, or someone who's just curious about either, you'll find a warm welcome here. Our events range from casual game nights to competitive tournaments, all while supporting local businesses and raising funds for worthy causes.
                What sets us apart isn't just our unique combination of interests – it's our commitment to fostering an inclusive, friendly environment where everyone can feel comfortable joining in. We believe that "luxury cardboard" (as we affectionately call Magic cards) and craft beer are just the catalysts for something much more meaningful: building genuine connections and giving back to our community.
                Join us at our next event to experience the perfect blend of gaming, craft beer appreciation, and charitable giving. Whether you're here to perfect your deck strategy, discover your new favorite brew, or simply meet some fantastic people, there's a seat at our table for you.
            </div>
        </div>
    )
};

export default AboutPage;
