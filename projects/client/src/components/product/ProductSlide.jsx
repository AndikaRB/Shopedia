// import { Box, Image } from "@chakra-ui/react";
// import React, { Component } from "react";
// import Slider from "react-slick";
// // import { baseUrl } from "./config";

// export default class ProductSlide extends Component {
//   render() {
//     const settings = {
//       customPaging: function (i) {
//         return (
//           <Box w={"348px"}>
//             <a>
//               <Image
//                 minW={"60px"}
//                 minH={"60px"}
//                 src={
//                   "https://images.tokopedia.net/img/cache/100-square/product-1/2019/5/28/15141361/15141361_5f1c89d8-26bc-4b2a-8197-a6f78ac31ad2_600_600.webp?ect=4g"
//                 }
//                 mr={"15px"}
//               />
//             </a>
//           </Box>
//         );
//       },
//       dots: true,
//       dotsClass: "slick-dots slick-thumb",
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//     };
//     return (
//       <Box mt={"90px"} w={"348px"} h={"348px"}>
//         {/* <h2>Custom Paging</h2> */}
//         <Slider {...settings}>
//           <div>
//             <img
//               src={
//                 "https://d1n6dbtoa2690v.cloudfront.net/article/56cbeda3150ba0dd7aa318ab/56cbeda3150ba0dd7aa318ab_1458121209.jpg"
//               }
//             />
//           </div>
//           <div>
//             <img
//               src={
//                 "https://signal.avg.com/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/How%20to%20Upgrade%20and%20Install%20RAM%20on%20PC/How_to_upgrade_RAM_memory_in_your_PC-Thumb.jpg"
//               }
//             />
//           </div>
//           <div>
//             <img
//               src={
//                 "https://d1n6dbtoa2690v.cloudfront.net/article/5beea1dab92c2e4a738b4602/5beea1dab92c2e4a738b4602_1557382502.jpg"
//               }
//             />
//           </div>
//           <div>
//             <img
//               src={
//                 "https://www.shutterstock.com/image-photo/installation-ram-on-computer-600w-182981177.jpg"
//               }
//             />
//           </div>
//         </Slider>
//       </Box>
//     );
//   }
// }

import { Box, Image } from "@chakra-ui/react";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ProductSlide.css";
// import ram1 from "../../assets/ProductSlider/ram1.jpg";

const ProductSlide = () => {
  return (
    <Box mt={"100px"}>
      <Carousel infiniteLoop autoPlay>
        <div className="image">
          <img src="https://www.it-jurnal.com/wp-content/uploads/2015/03/Pengertian-RAM-Random-Acces-Memory.jpg" />
        </div>
        <div className="image">
          <img src="https://d1n6dbtoa2690v.cloudfront.net/article/56cbeda3150ba0dd7aa318ab/56cbeda3150ba0dd7aa318ab_1458121209.jpg" />
        </div>
        <div className="image">
          <img src="https://cdn0-production-images-kly.akamaized.net/GcoWl4vV2dsVmlWF0FrCp3SkQ7k=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3987815/original/015285100_1649307653-pexels-sergei-starostin-6636474.jpg" />
        </div>
        <div className="image">
          <img src="https://www.integralmemory.com/wp-content/uploads/2022/04/RAM-advantages-article_1200x675.jpg" />
        </div>
      </Carousel>
    </Box>
  );
};

export default ProductSlide;
