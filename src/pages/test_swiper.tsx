import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const dataArr: string[] = [
  "Slide 1",
  "Slide 2",
  "Slide 3",
  "Slide4",
  "Slide 5",
  "Slide 6",
  "Slide 7",
  "Slide 8",
  "Slide 9",
  "Slide 10",
];

export default function TestSwiper() {
  return (
    <>
      <h1>Test Swiper</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Pagination]}
        pagination={{
          type: "fraction",
        }}
      >
        {dataArr.map((data) => {
          return (
            <SwiperSlide>
              <div style={{ background: "gray", height: "300px" }}>{data}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
