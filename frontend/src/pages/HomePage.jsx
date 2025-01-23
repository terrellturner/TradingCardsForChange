import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FaUser, FaArrowRight } from 'react-icons/fa';
import ImageCarousel from '../components/ImageCarousel';
import { motion, AnimatePresence } from 'motion/react';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';
import { defaultMotion } from '../constants';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const HomePage = () => {
    const { data, isLoading, error } = useGetProductsQuery();
    const products = data?.products;

    const heroImages = import.meta.env.VITE_HERO_IMG_URLS.split(',');

    const [isCalendarEventOpen, setIsCalendarEventOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const localizer = momentLocalizer(moment);

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

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsCalendarEventOpen(true);
    };

    const handleCloseModal = () => {
        setIsCalendarEventOpen(false);
        setSelectedEvent(null);
    };

    return (
        error ? error : (
            <motion.div variants={
                defaultMotion
            }
                initial="initial"
                animate="open"
                exit="closed"
                className="flex flex-col items-center h-full my-10 space-y-10 md:space-y-40 grow bg-newsletter-black">
                <div className="flex flex-row justify-center w-full px-6 place-items-center md:px-16 lg:space-x-6">
                    <img
                        src="https://pmv1txxicxtao8iw.public.blob.vercel-storage.com/TCBC_Simple-r6cEbuoDVCCu3R6efh1z7i0k5l24BL.svg"
                        alt=""
                        className="hidden w-52 lg:block"
                    />
                    <ImageCarousel imageUrls={heroImages} />
                </div>
                <motion.div className='flex flex-col justify-center text-center w-8/12 space-y-8'>
                    <h2 className='text-7xl font-elfreth'><a className='text-ipa-beige'>Brew who? </a><a className='text-draft-yellow'>Brew Crew!</a></h2>
                    <p className='text-2xl text-off-white'>We bring good people, fun games, and craft beer together to create positive change for the world. Take a look at our events below, and create an account to place and track orders.</p>
                    <Link to='/about' className='flex flex-row justify-center items-center space-x-2 text-xl text-ipa-beige font-bold my-5'><span>Our Story</span> <FaArrowRight className='-mb-1' /></Link>
                </motion.div>
                <AnimatePresence>
                    <div className='w-full flex flex-col items-center space-y-5'>
                        <h3 className='text-ipa-beige text-7xl font-elfreth'>Scheduled Events</h3>
                        {isLoading ? (<MotionSkeleton />) : window.innerWidth > 800 ? (
                            <div className='relative w-full flex justify-center'>
                                <Calendar
                                    localizer={localizer}
                                    events={products.map(product => ({
                                        title: product.name,
                                        start: new Date(product.startTime),
                                        end: new Date(product.endTime),
                                        id: product._id,
                                        image: product.image,
                                        description: product.description,
                                    }))}
                                    startAccessor="start"
                                    endAccessor="end"
                                    className='h-[50rem] w-5/6 relative text-ipa-beige max-w-[1200px]'
                                    style={{ height: '50rem' }}
                                    onSelectEvent={(e) => { handleEventClick(e) }}
                                />
                                {isCalendarEventOpen && selectedEvent && (
                                    <motion.div className='absolute z-50 top-1/4 w-1/4 min-w-[30rem]'>
                                        <MotionProductCard
                                            product={{
                                                startTime: selectedEvent.start,
                                                endTime: selectedEvent.end,
                                                name: selectedEvent.title,
                                                description: selectedEvent.description,
                                                image: selectedEvent.image,
                                                _id: selectedEvent.id,
                                            }}
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
                                                            selectedEvent.countInStock
                                                        }
                                                        {
                                                            selectedEvent.originalStockCount
                                                        }
                                                    </span>
                                                </div>
                                                <div className=' flex flex-row space-x-4'>
                                                    <button onClick={handleCloseModal} className="flex p-2 font-bold text-center rounded-lg bg-hops-green text-draft-yellow">
                                                        <span className="p-2">
                                                            Close
                                                        </span>
                                                    </button>
                                                    <Link to={`/product/${selectedEvent.id}`}>
                                                        <button className="flex p-2 font-bold text-center rounded-lg bg-hops-green text-draft-yellow">
                                                            <span className="p-2">
                                                                RSVP
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </MotionProductCard></motion.div>
                                )}
                            </div>
                        ) : (<></>)}</div>
                </AnimatePresence>
                <div className="mx-auto grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3 md:min-h-[70dvh] md:hidden">
                    <AnimatePresence>
                        {window.innerWidth < 800 ?
                            (
                                !isLoading
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
                                    ) : ([...Array(4)].map((_, i) => (<MotionSkeleton
                                        variants={
                                            productCardVariants
                                        }
                                        initial="initial"
                                        animate="open"
                                        exit="closed"
                                        key={i} classNames={'h-full bg-pale-ale-green rounded-xl'}></MotionSkeleton>)))) : (<></>)}
                    </AnimatePresence>
                </div>
            </motion.div>
        )
    );
};

export default HomePage;
