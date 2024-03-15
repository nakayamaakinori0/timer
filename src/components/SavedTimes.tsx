import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/Home.module.css";

export default function SavedTimes({
  savedTimes,
  loadHandler,
  isActive,
}: {
  savedTimes: any;
  loadHandler: any;
  isActive: boolean;
}) {
  return (
    <div className={styles.slider}>
      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          clickable: true,
        }}
      >
        {savedTimes?.map((obj: any, key: any) => {
          return (
            <SwiperSlide key={key}>
              <button
                key={key}
                className={styles.savedTime}
                onClick={() => {
                  loadHandler(key);
                }}
                disabled={isActive}
              >{`${obj.hour}:${obj.minute}:${obj.second}`}</button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
