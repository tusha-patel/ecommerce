import Image from "next/image"

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 " >
            <div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly gap-2 " >
                <div className="mb-8 md:mb-0 text-center " >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" >Summer Sale !</h1>
                    <p className="text-lg  md:text-xl mb-2 text-white ">Enjoy discount on selected items</p>
                    <span className="text-2xl  md:text-5xl text-yellow-400 font-bold " >Get 50% off</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 h-full relative aspect-video " >
                    <Image
                        src="/banner-image.png"
                        fill
                        alt="Banner image"
                        className="object-contain"
                        priority
                        sizes="100"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner