import React from 'react';
import Logo from '/images/tc4c-one.svg';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FaUser } from 'react-icons/fa';
import ImageCarousel from '../components/ImageCarousel';
import { motion, AnimatePresence } from 'motion/react';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';
import { defaultMotion } from '../constants';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    const heroImages = import.meta.env.VITE_HERO_IMG_URLS.split(',');

    const localizer = momentLocalizer(moment)

    const MotionProductCard = motion.create(ProductCard);
    const MotionSkeleton = motion.create(SkeletonLoader);

    const productCardVariants = {
        initial: {
            opacity: 0, transition: {
                ease: ['easeIn', 'easeOut'],
                duration: 0.5,
            },
        },
        open: {
            opacity: 1,
            transition: {
                ease: ['easeIn', 'easeOut'],
                duration: 0.5,
            },
        },
        closed: {
            opacity: 0,
            transition: {
                ease: ['easeIn', 'easeOut'],
                duration: 0.5,
            },
        },
    };

    return (
        error ? error : (
            <motion.div variants={
                defaultMotion
            }
                initial="initial"
                animate="open"
                exit="closed"
                className="flex flex-col items-center h-full my-10 space-y-10 grow bg-newsletter-black">
                <div className="flex flex-row justify-center w-full px-6 place-items-center md:px-16 lg:space-x-6">
                    <img
                        src="/images/logo/TCBC_Simple.svg"
                        alt=""
                        className="hidden w-52 lg:block"
                    />
                    <ImageCarousel imageUrls={heroImages} />
                </div>
                <AnimatePresence>
                    {isLoading ? (<MotionSkeleton />) : (<Calendar
                        localizer={localizer}
                        events={products.map(product => ({
                            title: product.name,
                            start: new Date(product.startTime),
                            end: new Date(product.endTime)
                        }))}
                        startAccessor="start"
                        endAccessor="end"
                        className='h-[50rem] w-4/6 bg-hops-green text-ipa-beige'
                    />)}
                </AnimatePresence>
                <div className="mx-auto grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3 md:min-h-[70dvh]">
                    <AnimatePresence>
                        {!isLoading
                            ? products.map(
                                (product, index = product._id) => {
                                    const startTime = new Date(
                                        product.startTime
                                    );

                                    return (
                                        <MotionProductCard
                                            product={product}
                                            key={index}
                                            variants={
                                                productCardVariants
                                            }
                                            initial="initial"
                                            animate="open"
                                            exit="closed"
                                        >
                                            <div className="flex justify-between w-full">
                                                <div className="flex h-12 p-3 mt-auto font-bold text-center rounded-full text-hops-green">
                                                    <FaUser className="m-0.5 my-auto" />
                                                    <span className="">
                                                        {
                                                            product.countInStock
                                                        }
                                                        /
                                                        {
                                                            product.originalStockCount
                                                        }
                                                    </span>
                                                </div>
                                                <button className="flex p-2 font-bold text-center rounded-lg bg-hops-green text-draft-yellow">
                                                    <span className="p-2">
                                                        RSVP
                                                    </span>
                                                </button>
                                            </div>
                                        </MotionProductCard>
                                    );
                                }
                            ) : (
                                [...Array(4)].map((_, i) => (<MotionSkeleton
                                    variants={
                                        productCardVariants
                                    }
                                    initial="initial"
                                    animate="open"
                                    exit="closed"
                                    key={i} classNames={'h-full bg-pale-ale-green rounded-xl'}></MotionSkeleton>)))}
                    </AnimatePresence>
                </div>
            </motion.div>
        )
    );
};

export default HomePage;
